const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  nickname: String
}, {
  versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel;
