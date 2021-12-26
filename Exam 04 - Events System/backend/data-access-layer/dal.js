const mongoose = require("mongoose");

// Internal connection options: 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

// Connect once to MongoDB:
mongoose.connect(config.mongodb.connectionString)
    .then(db => console.log("We're connected to MongoDB"))
    .catch(error => console.log(error));
