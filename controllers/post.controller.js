const { StatusCodes } = require("http-status-codes");
const { createPostService } = require("../services/post.service");

const createPost = async (req, res) => {
	const post = await createPostService(req.body);
	res.status(StatusCodes.CREATED).json({ message: "success", data: post });
};

module.exports = {
	createPost,
};
