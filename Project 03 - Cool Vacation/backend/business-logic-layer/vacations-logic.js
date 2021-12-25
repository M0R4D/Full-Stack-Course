const dal = require("../data-access-layer/dal");


// ------- GET All Vacations --------
async function getAllVacationsAsync() {
    const sql = "SELECT * FROM vacations ORDER BY vacationID ASC";
    const allVacations = await dal.executeAsync(sql);
    return allVacations;
}


// -------- GET User Following Vacations Only --------
async function getFollowedVacationsPerUserAsync(userID) {
    const sql = `SELECT vacationID FROM followers WHERE userID = ? ORDER BY vacationID ASC`;
    const userVacations = await dal.executeAsync(sql, [userID]);
    return userVacations
}


// -------- GET User Followed Vacations --------
async function getVacationsPerUserAsync(userID) {
    // Case 1: GET only the followed vacations per user
    // const sql = `SELECT followers.userID , vacations.*
    //              FROM followers INNER JOIN vacations ON followers.vacationId = vacations.vacationId
    //              WHERE followers.userID = ?`;
    // const userVacations = await dal.executeAsync(sql, [userId]);

    // Case 2: GET all vacations ORDER BY user followed vacations
    const allVacations = await getAllVacationsAsync();
    const userVacations = await getFollowedVacationsPerUserAsync(userID);

    let userVacationsIndex = 0;
    for (let i = 0; i < allVacations.length; i++) {
        if (userVacationsIndex < userVacations.length && allVacations[i].vacationID === userVacations[userVacationsIndex].vacationID) {
            allVacations[i].following = true;
            userVacationsIndex++;
        }
        else {
            allVacations[i].following = false;
        }    
    }
    console.log(allVacations)
    return allVacations;
}


// ------- GET One Vacation -------
async function getOneVacationAsync(vacationId) {
    const sql = `SELECT * FROM vacations WHERE vacationId = ${vacationId}`;
    const vacations = await dal.executeAsync(sql);
    return vacations;
}


// ----------- POST Vacation -----------
async function addVacationAsync(vacation) {
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [vacation.description, vacation.destination, vacation.price, vacation.start, vacation.end, vacation.picFileName]);
    vacation.vacationId = info.insertId;
    return vacation;
}


// ------------- DELETE Vacation -------------
async function deleteVacationAsync(vacationId) {
    const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows;
}


// ------------ UPDATE Vacation ------------
async function updateVacationAsync(vacation) {
    const sql = `UPDATE vacations 
                 SET description = ? , 
                     destination = ? , 
                     price = ? , 
                     start = ? , 
                     end = ? 
                 WHERE vacationId = ? `;
    const info = await dal.executeAsync(sql, [vacation.description, vacation.destination, vacation.price, vacation.start, vacation.end, vacation.vacationId]);
    return info.affectedRows === 0 ? null : vacation;
}


module.exports = {
    getAllVacationsAsync,
    getOneVacationAsync,
    getVacationsPerUserAsync,
    addVacationAsync,
    deleteVacationAsync,
    updateVacationAsync
};
