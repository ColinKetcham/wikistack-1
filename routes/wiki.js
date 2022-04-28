const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("it's working!");
});

router.post("/", (req, res) => {});

module.exports = router;
