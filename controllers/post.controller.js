const { StatusCodes } = require("http-status-codes");
const {
	createPostService,
	getPostsService,
	getPostService,
	deletePostService,
	updatePostService,
} = require("../services/post.service");

const createPost = async (req, res) => {
	const post = await createPostService(req.body, req.user);
	res.status(StatusCodes.CREATED).json({ message: "success", data: post });
};

const getPosts = async (req, res) => {
	const posts = await getPostsService(req.query);
	res.status(StatusCodes.OK).json({
		message: "success",
		length: posts.length,
		data: posts,
	});
};

const getPost = async (req, res) => {
	const { id: postId } = req.params;
	const post = await getPostService(postId);
	res.status(StatusCodes.OK).json({ message: "success", data: post });
};

const deletePost = async (req, res) => {
	const { id: postId } = req.params;
	await deletePostService(postId, req.user);
	res.status(StatusCodes.NO_CONTENT).json({ message: "success" });
};

const updatePost = async (req, res) => {
	const { id: postId } = req.params;
	const post = await updatePostService({
		body: req.body,
		postId,
		user: req.user,
	});
	res.status(StatusCodes.OK).json({ message: "success", data: post });
};

module.exports = {
	createPost,
	getPosts,
	getPost,
	deletePost,
	updatePost,
};
