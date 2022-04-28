const router = require("express").Router();
const { User, Page } = require("../models");
const { userList, userPages } = require("../views");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: { authorId: req.params.id },
    });
    res.send(userPages(user, pages));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
