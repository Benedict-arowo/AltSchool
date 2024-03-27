const express = require("express");
const {
	createUser,
	getUsers,
	loginUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();
const wrapper = require("../middlewear/wrapper");

userRouter.route("/").get(wrapper(getUsers)).post(wrapper(createUser));
userRouter.route("/login").post(wrapper(loginUser));

module.exports = userRouter;
