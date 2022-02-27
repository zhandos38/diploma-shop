const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  {
    Product,
    Category,
    ProductComponent,
    Workshop,
    sequelize,
  } = require("../models/index"),
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

    Product.findAndCountAll({
      limit,
      offset,
      include: {
        model: Category,
        as: "Category",
      },
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
    res.status("500").send("error: " + err);
  }
});

router.get("/index", authenticateJWT, async (req, res) => {
  let whereQuery = [];
  let types = [];
  if (req.query.types) {
    for (const type of req.query.types) {
      types.push({ type: type });
    }

    whereQuery = {
      [Op.or]: types,
    };
  }

  try {
    const models = await Product.findAll({
      where: whereQuery,
    });

    res.status("200").send(models);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-by-id?:id", authenticateJWT, async (req, res) => {
  try {
    const model = await Product.findOne({
      include: {
        model: ProductComponent,
        as: "Component",
      },
      where: {
        id: req.query.id,
      },
    });

    res.status("200").send(model);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/create", authenticateJWT, async (req, res) => {
  const { productComponents } = req.body;

  try {
    await sequelize.transaction(async (t) => {
      const model = await Product.create(req.body, {
        transaction: t,
      });

      if (
        typeof productComponents !== "undefined" &&
        productComponents !== null
      ) {
        for (const item of productComponents) {
          await model.createComponent(item, { transaction: t });
        }
      }
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.put("/update?:id", authenticateJWT, async (req, res) => {
  const { productComponents } = req.body.data;
  const id = req.query.id;

  try {
    await sequelize.transaction(async (t) => {
      const model = await Product.findOne({
        where: {
          id: id,
        },
        transaction: t,
      });

      if (!model) {
        throw new Error("Product is not found!");
      }

      if (
        typeof productComponents !== "undefined" &&
        productComponents !== null
      ) {
        for (const item of productComponents) {
          const productComponent = await ProductComponent.findOne({
            where: {
              id: item.id,
            },
            transaction: t,
          });

          if (productComponent) {
            await productComponent.update(item, { transaction: t });
          } else {
            await model.createComponent(item, { transaction: t });
          }
        }
      }

      if (model.img && model.img !== req.body.data.img) {
        fs.unlinkSync(`${__dirname}/files/${model.img}`);
      }

      await model.update(req.body.data, { transaction: t });
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.delete("/delete?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const model = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (model.img) {
      fs.unlinkSync(`${__dirname}/files/${model.img}`);
    }

    await model.destroy();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.delete("/component-delete?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    await ProductComponent.destroy({
      where: {
        id: id,
      },
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/upload", async (req, res) => {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file = req.files.img;
  uploadPath = __dirname + "/files/" + file.name;

  await file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  res.status(200).send("Ok");
});

router.get("/download", authenticateJWT, function (req, res) {
  const { fileName } = req.query;
  const file = `${__dirname}/files/${fileName}`;
  res.download(file);
});

router.get("/get-by-category?:id", authenticateJWT, async (req, res) => {
  let whereQuery = [];
  let types = [];
  if (req.query.types) {
    for (const type of req.query.types) {
      types.push({ type: type });
    }

    whereQuery = {
      [Op.or]: types,
    };
  }

  let categoryId = req.query.id;
  let whereCategory = categoryId;
  if (categoryId === "null") {
    whereCategory = {
      [Op.is]: null,
    };
  }

  try {
    const products = await Product.findAll({
      include: {
        model: Workshop,
      },
      where: {
        categoryId: whereCategory,
        [Op.and]: whereQuery,
      },
    });

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("error: " + err);
  }
});

module.exports = router;
