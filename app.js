const express = require("express");
const morgan = require("morgan");
const { db } = require("./models");
const app = express();

const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

const port = 3000;

const init = async () => {
  await db.sync();
  app.listen(port, () => {
    console.log(`you are listening on localhost:${port}`);
  });
};

init();
