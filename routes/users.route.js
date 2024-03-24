const express = require("express");
const { createUser } = require("../controllers/user.controller");
const userRouter = express.Router();
const wrapper = require("../middlewear/wrapper");

userRouter
	.route("/")
	.get((req, res) => {
		res.send("GET /");
	})
	.post(wrapper(createUser));

module.exports = userRouter;
