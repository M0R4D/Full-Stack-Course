const express = require("express");
const path = require("path");
const router = express.Router();
const imagesLogic = require("../business-logic-layer/images-logic")

router.get("/:imageName", async (request, response) => {
    const imageName = request.params.imageName;
    imagesLogic(response, imageName);
    // response.sendFile(path.join(__dirname + '/../' + "/images/") + imageName);
});

module.exports = router;