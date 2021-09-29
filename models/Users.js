// import { Sequelize, Model, DataTypes } from "sequelize";// const { Sequelize, Model, DataTypes } = require("sequelize");
import pkg from "sequelize";

const sequelize = new pkg.Sequelize("jwt", "furqan_user", "furqan", {
  host: "localhost",
  dialect: "postgres",
});
const { DataTypes } = pkg;
const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_name: DataTypes.TEXT,
    user_email: DataTypes.TEXT,
    user_password: DataTypes.TEXT,
    access_token: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT
}, {timestamps: false});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  const list = await User.findAll({raw: true});
  console.log(list);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export { User };
// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
