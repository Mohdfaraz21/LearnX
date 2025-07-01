const {Router} = require("express");


const userRouter = Router();


userRouter.post("/signup",);
userRouter.post("/signin",);
userRouter.post("/signout",);
userRouter.get("/purchases",);

module.exports = {
    userRouter,
}