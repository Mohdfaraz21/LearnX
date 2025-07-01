const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(params) {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB CONNECTED");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect the DB", error);
  }
}

main();
