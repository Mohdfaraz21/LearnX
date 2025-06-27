const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "admin sign up",
  });
});
adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "admin sign in",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "admin course",
  });
});
adminRouter.put("/course", function (req, res) {
  res.json({
    message: "admin course",
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
