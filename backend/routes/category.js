const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  { Category } = require("../models/index"),
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

    Category.findAndCountAll({
      limit,
      offset,
      include: {
        model: Category,
        as: "Parent",
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
  try {
    const models = await Category.findAll();

    res.status("200").send(models);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/:id", authenticateJWT, async (req, res) => {
  const id = req.params.id;

  try {
    const model = await Category.findOne({
      where: {
        id: id,
      },
    });

    res.status("200").send(model);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/create", authenticateJWT, async (req, res) => {
  try {
    await Category.create(req.body);

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.put("/update?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const model = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (model.img && model.img !== req.body.data.img) {
      fs.unlinkSync(`${__dirname}/file/${model.img}`);
    }

    await model.update(req.body.data);

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.delete("/delete?:id", authenticateJWT, async (req, res) => {
  const id = req.query.id;

  try {
    const model = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (model.img !== null) {
      fs.unlinkSync(`${__dirname}/file/${model.img}`);
    }

    await model.destroy();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/upload", authenticateJWT, async (req, res) => {
  let file;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file = req.files.img;
  uploadPath = __dirname + "/file/" + file.name;

  await file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  res.status(200).send("Ok");
});

router.get("/download", authenticateJWT, function (req, res) {
  const { fileName } = req.query;
  const file = `${__dirname}/file/${fileName}`;
  res.download(file);
});

module.exports = router;
