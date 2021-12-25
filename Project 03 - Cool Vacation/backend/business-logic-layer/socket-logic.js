const io = require("socket.io");

function socketInit(listener) {
	const socketsManager = io(listener, { cors: { origin: "*" } });

	socketsManager.sockets.on("connection", (socket) => {

		// console.log(user + "someone connected");
		console.log("someone connected");

		socket.on("vacation-added-by-admin", (newVacation) => {
			socketsManager.sockets.emit("vacation-added-from-server", newVacation);
		});

		socket.on("vacation-updated-by-admin", (updatedVacation) => {
			socketsManager.sockets.emit(
				"vacation-updated-from-server",
				updatedVacation
			);
		});

		socket.on("vacation-deleted-by-admin", (deletedVacationId) => {
			socketsManager.sockets.emit(
				"vacation-deleted-from-server",
				deletedVacationId
			);
		});

		socket.on("disconnect", () =>
			// console.log(user.firstName + user.lastName + " disconnected")
			console.log("someone disconnected")
		);
	});
}

module.exports = {
	socketInit
}
