const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = process.env;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const userRoles = {
  ADMIN: "admin",
  DIRECTOR: "director",
  MANAGER: "manager",
  DEALER: "dealer",
  ADMINISTRATOR: "administrator",
  WAITER: "waiter",
};

module.exports = {
  authenticateJWT,
  userRoles,
};
