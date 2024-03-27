const express = require("express");
const postRouter = express.Router();
const wrapper = require("../middlewear/wrapper");
const {
	createPost,
	getPost,
	getPosts,
	deletePost,
} = require("../controllers/post.controller");
const Authenticate = require("../middlewear/authenticate");

postRouter
	.route("/")
	.get(wrapper(getPosts))
	.post(Authenticate, wrapper(createPost));

postRouter
	.route("/:id")
	.get(wrapper(getPost))
	.delete(Authenticate, wrapper(deletePost));

module.exports = postRouter;
