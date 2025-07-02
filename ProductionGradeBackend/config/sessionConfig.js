require("dotenv").config();

const MongoStore = require("connect-mongo");
const { Cookie } = require("express-session");

const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_ADMIN_SECRET = process.env.SESSION_ADMIN_SECRET;
const SESSION_USER_SECRET = process.env.SESSION_USER_SECRET;

adminSessionConfig = {
  secret: SESSION_ADMIN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGODB_URL }),
};

userSessionConfig = {
  secret: SESSION_USER_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGODB_URL }),
};

module.exports = {
  adminSessionConfig,
  userSessionConfig,
};
