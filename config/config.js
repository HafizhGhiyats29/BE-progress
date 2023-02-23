import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.PASSWORD, {
  dialect: "mysql",
  host: process.env.HOST,
});
db.authenticate()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Failed to Connect Database");
  });

export default db;
