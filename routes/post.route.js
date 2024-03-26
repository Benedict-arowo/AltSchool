const express = require("express");
const postRouter = express.Router();
const wrapper = require("../middlewear/wrapper");
const { createPost } = require("../controllers/post.controller");

postRouter
	.route("/")
	.get((req, res) => {
		res.send("GET /");
	})
	.post(wrapper(createPost));

module.exports = postRouter;
