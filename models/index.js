const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = require("./page");
const User = require("./user");

module.exports = {
  User,
  Page,
  db,
};
