const express = require("express"),
  cors = require("cors"),
  path = require("path"),
  bodyParser = require("body-parser"),
  fileUpload = require("express-fileupload"),
  http = require("http"),
  config = require("./config");

// routers
const routeAuth = require("./routes/auth");
const routeUser = require("./routes/user");
const routeProduct = require("./routes/product");
const routeCategory = require("./routes/category");
const routeOrder = require("./routes/order");

const app = express();

// use the modules
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// use router
app.use("/auth", routeAuth);
app.use("/user", routeUser);
app.use("/product", routeProduct);
app.use("/category", routeCategory);
app.use("/order", routeOrder);
app.use(express.static(path.join(__dirname, "routes", "files")));

const server = http.createServer(app);

// starting the server
server.listen(config.PORT, config.HOST, async () => {
  console.log(`Server started, listening port: ${config.PORT} on ${config.HOST}`);
});
