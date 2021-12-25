global.config = require("./config-dev.json");
const express = require("express");
const expressFileUpload = require("express-fileupload"); // npm i express-fileupload
const cors = require("cors");
const vacationsController = require("./controllers-layer/vacations-controller");
const usersController = require("./controllers-layer/users-controller");
const followersController = require("./controllers-layer/followers-controller");
const imagesController = require("./controllers-layer/images-controller");
const authController = require("./controllers-layer/auth-controller");
const logic = require("./business-logic-layer/followers-logic");
const expressRateLimit = require("express-rate-limit");

const io = require("socket.io");
const socketLogic = require("./business-logic-layer/socket-logic")

const server = express();

// server.use("/api/", expressRateLimit({
// 	windowMs: 1000,
// 	max: 5,
// 	message: "you have exceeded your max requests per second"
// })); // DoS Attack 

server.use(cors());
server.use(express.json());
server.use(expressFileUpload()); // Insert the uploaded files into request.files object

server.use("/api/vacations", vacationsController); // GET, POST, PUT, DELETE Vacations
// server.use("/api/users", usersController); 
server.use("/api/followers", followersController); // POST, DELETE Following Vacation
server.use("/api/images", imagesController); // GET Vacation Images
server.use("/auth", authController); // Login, Register


// server.listen(3001, () => console.log("Listening..."));
const PORT = process.env.PORT || 3001;

const listener = server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

socketLogic.socketInit(listener);
