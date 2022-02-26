const express = require("express"),
  router = express.Router(),
  { User, Order, OrderItems } = require("../models/index"),
  {
    getPagination,
    getPagingData,
    getFilterQuery,
    getSortQuery,
  } = require("../functions"),
  { Op } = require("sequelize");
const { authenticateJWT } = require("../middleware");

router.get("/data-provider", authenticateJWT, (req, res) => {
  try {
    const { page, rows, sortField, sortOrder, filters } = req.query;
    const { limit, offset } = getPagination(page, rows);

    const sortQuery = getSortQuery(sortField, sortOrder);
    const whereQuery = getFilterQuery(filters);

    Order.findAndCountAll({
      limit,
      offset,
      include: [User, OrderItems],
      where: {
        [Op.and]: whereQuery,
      },
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
    console.log(err);
    res.status("500").send("error: " + err);
  }
});

router.get("/index", authenticateJWT, async (req, res) => {
  try {
    const { filters } = req.query;
    const whereQuery = getFilterQuery(filters);

    const models = await Order.findAll({
      include: [OrderItems],
      where: {
        [Op.and]: whereQuery,
      },
    });

    res.status("200").send(models);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/create", authenticateJWT, async (req, res) => {
  const dataForm = req.body;

  try {
    const order = await Order.create({
      ...dataForm,
    });

    for (item of dataForm.orderItems) {
      const orderItem = await order.createOrderItem(item);
      const product = await orderItem.getProduct();
      product.quantity -= orderItem.quantity;
      product.save();
    }

    if (order.customerId) {
      const customer = await order.getCustomer();
      customer.saleSum = parseFloat(customer.saleSum) + parseFloat(order.cost);

      if (order.isDebt) {
        customer.debtSum =
          parseFloat(customer.debtSum) + parseFloat(order.debtAmount);
      }

      await customer.save();
    }

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get", authenticateJWT, async (req, res) => {
  const { id } = req.query;

  Order.findOne({
    include: [User, OrderItems],
    where: {
      id: id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/last", authenticateJWT, async (req, res) => {
  const { id } = req.query;

  Order.findOne({
    include: [User, OrderItems],
    order: [["id", "DESC"]],
    limit: 1,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.put("/update?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const model = await Order.findOne({
      where: {
        id: id,
      },
    });

    await model.update(req.body.data);

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-by-date", authenticateJWT, async (req, res) => {
  const { startDate, endDate } = req.query;

  Order.findAll({
    include: [OrderItems],
    where: {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/get-by-number", authenticateJWT, async (req, res) => {
  const { number } = req.query;

  Order.findOne({
    where: {
      number: number,
    },
    include: [{ model: OrderItems }],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/esc-sign", authenticateJWT, async (req, res) => {
  const { toSign } = req.query;

  var key = "private-key.pem";
  var crypto = require("crypto");
  var fs = require("fs");
  var path = require("path");

  function strip(key) {
    if (key.indexOf("-----") !== -1) {
      return key.split("-----")[2].replace(/\r?\n|\r/g, "");
    }
  }

  fs.readFile(
    path.join(__dirname, "/file/" + key),
    "utf-8",
    function (err, privateKey) {
      // privateKey = strip(privateKey);

      var sign = crypto.createSign("SHA1"); // Use "SHA1" for QZ Tray 2.0 and older

      sign.update(toSign);
      var signature = sign.sign({ key: privateKey }, "base64");

      res.send(signature);
    }
  );
});

module.exports = router;
