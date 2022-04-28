const express = require("express");
const morgan = require("morgan");
const { db } = require("./models");
const app = express();

const wikiRouter = require("./routes/wiki");
// const userRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/wiki", wikiRouter);
// app.use("/users", userRouter);

const port = 3000;

const init = async () => {
  await db.sync({ force: true });
  app.listen(port, () => {
    console.log(`you are listening on localhost:${port}`);
  });
};

init();
