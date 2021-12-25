
function verifyAdmin(request, response, next) {

    // Why "is-admin" not "isAdmin" ?
    // because http request headers isn't case sensitive, so Express converts them to lower case
    // and I am as developer should type request.headers.isadmin but this isn't a "correct typing"..
    if (request.headers["is-admin"] != "1") {
        response.status(401).send("You are not authorized.");
        return;
    }


    next(); // All is good.
}

module.exports = verifyAdmin;