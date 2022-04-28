const router = require("express").Router();

router.get("/", (req, res) => {
  req.send("This is Users!");
});

module.exports = router;
