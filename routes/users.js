const router = require("express").Router();

router.get("/", (req, res) => {
  req.send("it's working!");
});

module.exports = router;
