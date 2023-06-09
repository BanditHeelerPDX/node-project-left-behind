const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error(
      "We're sorry, your connection to the database has failed, bro."
    );
  });

module.exports = sequelize;
