const { query } = require("express");
const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/Post.model");

postRouter.get("/",async (req,res)=>{
  let query =req.query
  // let query={}
  // if(device) query.device=device;
  // if(title) query.title=title;
  // if(body) query.body=body;
  try {
    const posts = await PostModel.find(query)
    res.send(posts)
  } catch (err) {
    console.log(err)
    res.send({"err":"Something went wrong"})
  }
})

postRouter.post("/create",async (req,res)=>{
  const payload=req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send("created new post");
  } catch (err) {
    console.log(err)
    res.send({"msg":"Something went wrong"})
  }
});

postRouter.patch("/update/:id",async (req,res)=>{
  const payload=req.body;
  const id = req.params.id;
  const post = await PostModel.findOne({"_id":id});
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;
  try {
    if(userID_making_req!==userID_in_post){
      res.send({"msg": "You are not authorized"})
    }else{
      await PostModel.findByIdAndUpdate({"_id":id},payload);
      res.send("Updated post successfully")
    }
  } catch (err) {
    console.error(err)
    res.send({"msg":"Something went wrong"})
  }
})
postRouter.delete("/delete/:id",async (req,res)=>{
  const id = req.params.id;
  const post = await PostModel.findOne({"_id":id});
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;
  try {
    if(userID_making_req!==userID_in_post){
      res.send({"msg": "You are not authorized"})
    }else{
      await PostModel.findByIdAndDelete({"_id":id});
      res.send("Deleted post successfully")
    }
  } catch (err) {
    console.error(err)
    res.send({"msg":"Something went wrong"})
  }
})

module.exports = {
  postRouter
}
