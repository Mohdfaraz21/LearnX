const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  //TODO: Adding zod validation
  const { email, password, firstName, lastName } = req.body;
  //TODO: Hash the password with bcrypt so plain text password should not be in db

  try {
    await adminModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(201).json({
      message: " Admin Signup successful",
    });
  } catch (e) {
    console.error(" Signup error:", e.message);

    res.status(500).json({
      message: " Something went wrong during signup",
      error: e.message,
    });
  }
});
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  //TODO: ideally password should be hashed, hence you can't compare the user provided password and the db password.
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "content data updated",
  });
});

adminRouter.get("/course/all", function (req, res) {
  res.json({
    message: "admin course",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
