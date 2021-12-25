const uuid = require('uuid');

function imageHelper (request) {
    if(!request.files) {
        return {status: 400, message: "No image sent"};
    }

    if(!request.files.image) {
        return {status: 400, message: "The image 'form data key' must be called image"};
    }

    const image = request.files.image; // The name of the image sent from the front.
    const extension = image.name.substr(image.name.lastIndexOf(".")); // ".jpg" or ".png" or ".gif" or...
    const newFileName = uuid.v4() + extension; // "d3388752-7a4f-44d5-992c-bc316c750f7f.jpg"
    image.mv("./images/" + newFileName); // Move the file into the hard-disk


    return {status: 200, message: newFileName};
}


module.exports = imageHelper;