const router = require("express").Router();
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");
// const wikipage = require("../views/wikipage");

router.get("/", async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    console.log(err);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const user = await User.findByPk(page.authorId);
    res.send(wikiPage(page, user));
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

    const [user] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: { name: req.body.name, email: req.body.email },
    });

    page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
