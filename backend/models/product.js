"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "Category",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      barcode: DataTypes.STRING,
      quantity: DataTypes.DOUBLE,
      categoryId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
      freezeTableName: true,
    }
  );
  return Product;
};
