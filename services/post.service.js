const { StatusCodes } = require("http-status-codes");
const ErrorWithStatus = require("../middlewear/ErrorWithStatus");
const Posts = require("../models/post_schema");

const createPostService = async ({ title, body }, user) => {
	if (!title || !body)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Title and body are required"
		);
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
	const { limit = 10, page, order, orderBy } = params;
	const queryCriteria = {};
	const orderFields = ["createdat"];

	if (order && orderBy) {
		if (order !== "asc" && order !== "desc")
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				"Invalid sorting parameter."
			);

		if (!orderFields.includes(orderBy.toLowerCase()))
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				"Invalid sorting parameter."
			);
		queryCriteria.sort = {
			[orderBy]: order === "asc" ? 1 : -1,
		};
	}

	if (page) {
		if (isNaN(page))
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				"Page must be a number"
			);

		if (page < 1)
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				"Page must be greater than 0"
			);

		queryCriteria.skip = (page - 1) * limit;
	}

	const posts = await Posts.find({})
		.populate("user", "name email")
		.limit(limit)
		.skip(queryCriteria.skip)
		.sort(queryCriteria.sort);

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

const updatePostService = async ({ postId, body, user }) => {
	const { _id: userId } = user;
	if (!postId || !body)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Post ID and body are required"
		);

	const post = await Posts.findById(postId);
	if (!post)
		throw new ErrorWithStatus(StatusCodes.NOT_FOUND, "Post not found");

	if (post.user._id.toString() !== userId)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"You are not allowed to update this post."
		);

	const updatedPost = await Posts.findByIdAndUpdate(
		postId,
		{
			title: body.title ? body.title : undefined,
			body: body.body ? body.body : undefined,
		},
		{ new: true }
	);

	return updatedPost;
};

module.exports = {
	createPostService,
	getPostsService,
	getPostService,
	deletePostService,
	updatePostService,
};
