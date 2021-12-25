global.config = require("./config-dev.json");
const express = require("express");
const cors = require("cors");
const hightechController = require("./controllers-layer/hightech-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/", hightechController);

server.listen(3001, () => console.log("Listening..."));
