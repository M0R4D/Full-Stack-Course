function verifyUser(userUuid) {

	return function (request, response, next) {
		// const headersUserUuid = request.headers.userUuid;
		// if (headersUserUuid && userUuid !== headersUserUuid) {
		if (userUuid !== request.headers["user-uuid"]) {
			response.status(401).send("You are not authorized.");
			return;
		}

		next(); // All is good.
	};
}
module.exports = verifyUser;
