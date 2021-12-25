const path = require('path');

async function imagesLogic(response, imageName) {
    response.sendFile(path.join(__dirname + '/../' + "/images/") + imageName);
}

module.exports = imagesLogic;