"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderItems, {
        foreignKey: {
          name: "orderId",
          allowNull: false,
        },
      });
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        onUpdate: "NO ACTION",
        onDelete: "SET NULL",
      });
    }
  }
  Order.init(
    {
      number: DataTypes.STRING,
      cost: DataTypes.FLOAT,
      status: DataTypes.TINYINT(2),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
      freezeTableName: true,
    }
  );
  return Order;
};
