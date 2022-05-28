const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {title: 1})
  response.json(users)
})

userRouter.post("/", async (request, response) => {
  const {username, name, password} = request.body;

  const existingUser = await User.findOne({username})

  if(existingUser){
    return response.status(400).json({
      error: "username already exist"
    })
  } else {

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
        username,
        name,
        passwordHash
      })
    
      const newUser = await user.save();
      response.status(201).json(newUser)
  }

})

module.exports = userRouter;