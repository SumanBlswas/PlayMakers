const express = require("express")
const UserModel = require("../Models/userModel")
const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
})

userRouter.post("/add", async (req, res) => {
  const { nickname } = req.body
  try {
    if (nickname) {
      const newUser = new UserModel({ nickname })
      await newUser.save()
      res.status(200).send(newUser)
    } else {
      res.status(400).send({
        message: "Please Provide NickName to proceed"
      })
    }
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
})
module.exports = userRouter;
