const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  //TODO: Adding zod validation
  const { email, password, firstName, lastName } = req.body;
  //TODO: Hash the password with bcrypt so plain text password should not be in db

  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(201).json({
      message: "✅ Signup successful",
    });
  } catch (e) {
    console.error("❌ Signup error:", e.message);

    res.status(500).json({
      message: "❌ Something went wrong during signup",
      error: e.message,
    });
  }
});
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  //TODO: ideally password should be hashed, hence you can't compare the user provided password and the db password.
  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }
});
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({
    message: "purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
