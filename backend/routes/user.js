const express = require("express"),
  router = express.Router(),
  { User } = require("../models/index"),
  {
    getFilterQuery,
    getSortQuery,
    getPagination,
    getPagingData,
    getPasswordHash,
  } = require("../functions");
const { authenticateJWT, userRoles } = require("../middleware");

const userResponseStatuses = {
  userExists: "user-exists",
};

router.get("/data-provider", authenticateJWT, (req, res) => {
  const { role, id } = req.user;

  try {
    const { page, rows, sortField, sortOrder, filters } = req.query;
    const { limit, offset } = getPagination(page, rows);

    const sortQuery = getSortQuery(sortField, sortOrder);
    const filterQuery = getFilterQuery(filters);

    if (role === userRoles.MANAGER) {
      filterQuery.push({
        managerId: id,
      });
    } else if (role === userRoles.DEALER) {
      filterQuery.push({
        dealerId: id,
      });
    }

    User.findAndCountAll({
      limit,
      offset,
      where: filterQuery,
      order: sortQuery,
    })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.status("200").send(response);
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/index", authenticateJWT, async (req, res) => {
  let where = null;

  if (req.query.type) {
    where = {
      type: req.query.type,
    };
  }

  try {
    const models = await User.findAll({
      where: where,
    });

    res.status("200").send(models);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get", authenticateJWT, async (req, res) => {
  const { id } = req.query;

  try {
    const model = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!model) {
      throw "User is not found";
    }

    res.status("200").send(model);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.put("/add-balance", authenticateJWT, async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    user.balance = user.balance + data.amount;
    await user.save();

    res.send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/create", authenticateJWT, async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (user) {
      res.status("400").send(userResponseStatuses.userExists);
      return;
    }

    const hash = await getPasswordHash(data.password);

    await User.create({
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      passwordHash: hash,
      role: data.role,
      status: data.status,
      balance: data.balance,
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.put("/update?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const data = req.body.data;

    const model = await User.findOne({
      where: {
        id: id,
      },
    });

    const isExistingUser = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (isExistingUser && model.id !== isExistingUser.id) {
      res.status("400").send(userResponseStatuses.userExists);
      return;
    }

    let hash = undefined;
    if (data.password) {
      hash = await getPasswordHash(data.password);
    }

    await model.update({
      ...data,
      passwordHash: hash,
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.delete("/delete?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const model = await User.findOne({
      where: {
        id: id,
      },
    });

    await model.destroy();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

module.exports = router;
