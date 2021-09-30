const express = require("express");
const app = express();

require("dotenv").config();

const router = require("./src/routes");

const port = 5000;

app.use(express.json());

app.use("/api/v1/", router);

app.listen(port, () => console.log(`Listening to port ${port}`));
