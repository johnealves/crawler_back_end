const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

const erroMiddleware = require("./Middlewares/errorMiddleware");
const routes = require("./Routes");
const port = process.env.PORT || 3001

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("inicio")
  res.status(200).send("Aplicação rodando")
})
app.use("/", routes.productsRoutes);

app.use(erroMiddleware);


app.listen(port, () => {
  console.log(`rodando na porta ${port}`)
})