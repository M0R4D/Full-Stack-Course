function internalServerError(response, err) {

    if(global.config.isDevelopment) {
        response.status(500).send(err.message);
        return;
    }

    response.status(500).send("Some error occurred, please try again later.");
}

module.exports = {
    internalServerError
};