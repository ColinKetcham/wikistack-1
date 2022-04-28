const router = require("express").Router();
const { addPage } = require("../views");
const { Page } = require("../models");
const wikipage = require("../views/wikipage");

router.get("/", (req, res) => {
  res.send("This is wiki!");
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    res.json(page);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
