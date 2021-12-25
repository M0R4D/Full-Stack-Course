const dal = require("../data-access-layer/dal");

async function getAllGroupsAsync() {
    const sql = "SELECT * FROM groups";
    const groups = await dal.executeAsync(sql);
    return groups;
}

async function getMeetingsPerGroupAsync(groupId) {
    const sql = `SELECT m.*, g.groupName
                 FROM meetings AS m JOIN groups AS g
                 ON m.groupId = g.groupId
                 WHERE g.groupId = ${groupId}`;
    const meetings = await dal.executeAsync(sql);
    return meetings;
}

async function addMeetingAsync(meeting) {
    const sql = "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [meeting.groupId, meeting.startTime, meeting.endTime, meeting.description, meeting.meetingRoom]);
    meeting.meetingId = info.insertId;
    return meeting;
}


module.exports = {
    getAllGroupsAsync,
    getMeetingsPerGroupAsync,
    addMeetingAsync,
};

