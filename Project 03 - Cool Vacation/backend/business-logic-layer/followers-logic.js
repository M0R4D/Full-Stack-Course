const dal = require("../data-access-layer/dal");

// ----------------- POST Followed Vacation -----------------
async function followNewVacationAsync(userID, vacationId) {
    const sqlIsFollowing = "SELECT * FROM followers where followers.userID = ? and followers.vacationID = ?"
    const isFollowed = await dal.executeAsync(sqlIsFollowing, [userID, vacationId]);
    console.log(isFollowed);
    if (isFollowed.length) {
        return isFollowed;
    }
    const sql = "INSERT INTO followers VALUES(?, ?)";
    const info = await dal.executeAsync(sql, [userID, vacationId]);
    return info;
}

// ---------------- DELETE Followed Vacation ----------------
async function unfollowVacationAsync(userID, vacationId) {
    const sql = "DELETE FROM followers WHERE userID = ? AND vacationId = ?";
    const info = await dal.executeAsync(sql, [userID, vacationId]);
    return info.affectedRows === 1;
}


module.exports = {
    followNewVacationAsync,
    unfollowVacationAsync
};