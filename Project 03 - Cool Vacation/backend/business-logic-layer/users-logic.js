const dal = require("../data-access-layer/dal");


// -------- GET All Users --------
async function getAllUsersAsync() {
    const sql = "SELECT * FROM users";
    const users = await dal.executeAsync(sql);
    return users;
}


module.exports = {
    getAllUsersAsync
};
