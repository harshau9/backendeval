const express = require("express")
require("dotenv").config();
const {connection} = require("./configs/db");
const {userRouter} = require("./routes/User.route");
const {postRouter} = require("./routes/Post.route");
const {authenticate} = require("./middlewares/authenticate.middleware");
const cors=require("cors");
const app = express();

app.use(cors({
  origin:"*"
}))
app.use(express.json());
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});


app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);
app.listen(8080, async()=>{
  try {
    await connection
    console.log("Connected to DB")
  } catch (err) {
    console.log("Error connecting to DB")
    console.log(err)
  }
  console.log("server is running on port 8080");
})

/*
{
  "name":"harsha",
  "email":"harsha@gmail.com",
  "gender":"male",
  "password":"harsha"
}

{
  "email":"harsha@gmail.com",
  "password":"harsha"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M1MTZkNjZlMzQ4ZjhkMmNjYTA4MjAiLCJpYXQiOjE2NzM4NjA4NzR9.FKHA4v4A6f3BwUM_twCb_av2y38RZw-ovcdc9xQw-mk
{
  "title":"s22",
  "body":"medium21",
  "device":"TABLET"
}

*/