const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");
const userRouter = express.Router();
const wrapper = require("../middlewear/wrapper");

userRouter.route("/register").post(wrapper(createUser));
userRouter.route("/login").post(wrapper(loginUser));

module.exports = userRouter;
