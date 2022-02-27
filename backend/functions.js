const { Order, OrderItems, Product, Category, User, Settings, Invoice, InvoiceItems, Shift, CashboxTransactions, OrderReturn, OrderReturnItems, Customer, sequelize } = require("./models/index");
const axios = require("axios");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

function formatDate(date) {
  function pad(number) {
    return ("00" + number).slice(-2);
  }

  const dateObject = new Date(date);
  return (
      dateObject.getUTCFullYear() +
      "-" +
      pad((dateObject.getUTCMonth() + 1).toString()) +
      "-" +
      pad(dateObject.getUTCDate().toString())
  );
}

module.exports = {
  getSortQuery(sortField, sortOrder) {
    if (typeof sortField !== "undefined") {
      return [
        [sortField, sortOrder === "1" ? "ASC" : "DESC"]
      ];
    }
  },

  getFilterQuery(filters) {
    let whereQuery = [];

    for (const [key, filter] of Object.entries(JSON.parse(filters))) {
      if (filter.value !== "" && filter.value !== null) {
        switch (filter.matchMode) {
          case "contains":
            whereQuery.push({[key]: {[Op.like]: `%${filter.value}%`}});
            break;
          case "notContains":
            whereQuery.push({[key]: {[Op.notLike]: `%${filter.value}%`}});
            break;
          case "startsWith":
            whereQuery.push({[key]: {[Op.startsWith]: filter.value}});
            break;
          case "endsWith":
            whereQuery.push({[key]: {[Op.endsWith]: filter.value}});
            break;
          case "equals":
            whereQuery.push({[key]: {[Op.eq]: filter.value}});
            break;
          case "notEquals":
            whereQuery.push({[key]: {[Op.ne]: filter.value}});
            break;
          case "dateIs":
            whereQuery.push({[key]: {[Op.between]: filter.value}});
            break;
          case "dateIsNot":
            whereQuery.push({[key]: {[Op.notBetween]: filter.value}});
            break;
          case "dateBefore":
            whereQuery.push({[key]: {[Op.lt]: filter.value[0]}});
            break;
          case "dateAfter":
            whereQuery.push({[key]: {[Op.gt]: filter.value[1]}});
            break;
          case "in":
            whereQuery.push({[key]: {[Op.in]: [...filter.value]}});
            break;
        }
      }
    }

    return whereQuery;
  },

  getPagination: (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  },

  getPagingData: (data, page, limit) => {
    const { count: totalItems, rows: invoice } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const records = invoice;

    return { totalItems, records, totalPages, currentPage };
  },

  async getPasswordHash(password) {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
  },

  async getApiConfig() {
    let token;
    await Settings.findOne({ where: { name: 'token' } })
      .then(data => {
      if (!data) {
        throw 'Token is not found!';
      }

      token = data.value;
    });

    return {
      headers: { Authorization: `Bearer ${token}`}
    };
  }
};