const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

const erroMiddleware = require("../Middlewares/errorMiddleware");
const routes = require("../Routes");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("inicio")
  res.status(200).send("Aplicação rodando")
})
app.use("/", routes.productsRoutes);

app.use(erroMiddleware);
module.exports = app;