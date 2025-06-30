require ('dotenv').config()


const express = require("express");
const mongoose = require("mongoose");


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
// this is use when you have to send request with req.body
app.use(express.json());



app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    // TODO: MAKE IT IN DOTENV FILE
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000);
  console.log("Listening port 3000");
  console.log("DB connected");
}

main();
