const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email,password,name,gender } = req.body;
  try {
    bcrypt.hash(password, 5, async(err, secure_password) => {
      if (err) {
        console.log(err);
      }else{
        const user = new UserModel({email,password:secure_password,name,gender});
        await user.save();
        res.send("Registered successfully");
      }
    })
  } catch (err) {
    res.send("error in registration of user")
    console.log(err);
  }
});

userRouter.post("/login",async (req, res) => {
  const {email,password}=req.body;
  try {
    const user =await UserModel.find({email})
    const hashed_password=user[0].password
    if(user.length > 0) {
      bcrypt.compare(password,hashed_password, (err, result) => {
        if(result){
          const token = jwt.sign({userID:user[0]._id}, 'pwsd');
          res.send({"msg":"Successfully Logged In","token":token});
        }else{
          res.send("wrong credentials")
        }
      });
    }else{
      res.send("wrong credentials")
    }
  } catch (err) {
    res.send("Something Wrong while logging in")
    console.log(err)
  }
});
module.exports = {
  userRouter
}
