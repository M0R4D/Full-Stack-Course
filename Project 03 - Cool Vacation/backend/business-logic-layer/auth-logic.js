const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.uuid = uuid.v4(); // 36 chars

    const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [user.uuid, user.firstName, user.lastName, user.username, user.password, false]);
    user.userID = info.insertId;
    delete user.password; // Delete password before returning to frontend.
    user.token = cryptoHelper.getNewToken(user);
    user.isAdmin = false;
    return user;
}

async function loginAsync(credentials) {
    credentials.password = cryptoHelper.hash(credentials.password);

    // Without defending against SQL-Injection:
    // const sql = `SELECT uuid, firstName, lastName, username FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
    // const users = await dal.executeAsync(sql);

    // With defending against SQL-Injection: 
    const sql = "SELECT userID, uuid, firstName, lastName, username, isAdmin FROM users WHERE username = ? AND password = ?";
    const users = await dal.executeAsync(sql, [credentials.username, credentials.password]);

    if (users.length === 0) return null;
    const user = users[0];
    user.token = cryptoHelper.getNewToken(user);
    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};