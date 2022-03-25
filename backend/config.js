const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

module.exports = {
  NODE_ENV : process.env.NODE_ENV || 'development',
  HOST : process.env.HOST || 'localhost',
  PORT : process.env.PORT || 4040,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY || "ims_cafe_db",
}