const { StatusCodes } = require("http-status-codes");
const ErrorWithStatus = require("../middlewear/ErrorWithStatus");
const Posts = require("../models/post_schema");

const createPostService = async ({ title, body }, user) => {
	if (!title || !body) throw new Error("Title and body are required");
	console.log(user._id);

	const post = await Posts.create({
		title: title,
		body: body,
		user: { _id: user._id },
	});

	return {
		_id: post._id,
		title: post.title,
		body: post.body,
		createdAt: post.createdAt,
	};
};

const getPostsService = async (params) => {
	const posts = await Posts.find(params).populate("user", "name email");

	return posts;
};

const getPostService = async (postId) => {
	if (!postId)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Post ID is required"
		);

	const post = await Posts.findById(postId).populate("user", "name email");

	if (!post)
		throw new ErrorWithStatus(StatusCodes.NOT_FOUND, "Post not found");

	return post;
};

const deletePostService = async (postId, user) => {
	const { _id: userId } = user;

	if (!postId)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Post ID is required"
		);
	const post = await Posts.findById(postId).populate("user", "name email");
	if (!post)
		throw new ErrorWithStatus(StatusCodes.NOT_FOUND, "Post not found");

	if (post.user._id.toString() !== userId)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"You are not allowed to delete this post."
		);

	await post.deleteOne();
	return;
};
module.exports = {
	createPostService,
	getPostsService,
	getPostService,
	deletePostService,
};
