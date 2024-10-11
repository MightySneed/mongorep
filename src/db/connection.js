const mongoose = require("mongoose");
//imports mongoose libraries
require("dotenv").config()
async function connection() {
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to the database");
}
 catch (error) {
    console.log(error);
}
}

connection();