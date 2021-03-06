global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const controller = require("./controllers/events-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", controller);

server.listen(3001, () => console.log("Listening..."));