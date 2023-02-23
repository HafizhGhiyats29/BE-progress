import { DataTypes } from "sequelize";

import db from "../config/config.js";

const Order = db.define(
  "order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.STRING,
    },
    timeOrder: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTablename: true,
    timestamps: false,
  }
);
export default Order;
