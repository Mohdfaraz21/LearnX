const { adminModel } = require("../models/adminModel");
const { courseModel } = require("../models/courseModel");

const bcrypt = require("bcrypt");
const zod = require("zod");

// Admin Signup
async function adminSignup(req, res) {
  const schema = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.json({ message: "Incorrect data format", error: result.error });
  }
}
