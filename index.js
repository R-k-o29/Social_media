const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB CONNECTED: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
connectDB();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/",(req,res)=>{
//     res.send("Welcome to home page");
// })
// app.get("/users", (req, res) => {
//   res.send("Welcome to user page");
// });

//RESTAPI
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
  console.log("Backend server is running!Done");
});
