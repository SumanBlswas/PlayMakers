const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose.connect("mongodb://localhost:27017/chat");

module.exports = { connection };
