"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: 0,
      },
      shiftId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Shift"
          },
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Order");
  }
};
