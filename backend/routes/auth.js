const express = require("express"),
  router = express.Router(),
  { User, Facility } = require("../models/index"),
  bcrypt = require("bcrypt"),
  { getPasswordHash } = require("../functions");
const { TOKEN_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const userResponseStatuses = {
  userExists: "user-exists",
};

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    if (await checkUserNameIfExists(data.username)) {
      res.status("400").send(userResponseStatuses.userExists);
      return;
    }

    const hash = await getPasswordHash(data.password);

    const user = await User.create({
      fullName: data.fullName,
      username: data.username,
      passwordHash: hash,
      role: data.role,
      status: data.status,
    });

    res.status("200").send({ userId: user.id });
  } catch (err) {
    console.error(err);
    res.status("500").send("error: " + err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.status("400").send("User is not found");
    return;
  }

  bcrypt.compare(password, user.passwordHash, async (err, result) => {
    if (result) {
      const accessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        TOKEN_SECRET_KEY
      );

      res.json({
        user: user,
        token: accessToken,
      });
    } else {
      res.status("400").send("Incorrect username or password");
    }
  });
});

async function checkUserNameIfExists(username) {
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  return !!user;
}

module.exports = router;
