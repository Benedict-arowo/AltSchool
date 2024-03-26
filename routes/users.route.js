const express = require("express");
const { createUser, getUsers } = require("../controllers/user.controller");
const userRouter = express.Router();
const wrapper = require("../middlewear/wrapper");

userRouter.route("/").get(wrapper(getUsers)).post(wrapper(createUser));

module.exports = userRouter;
