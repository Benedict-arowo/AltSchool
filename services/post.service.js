const Posts = require("../models/post_schema");

const createPostService = async ({ title, body }) => {
	if (!title || !body) throw new Error("Title and body are required");

	const post = await Posts.create({
		title: title,
		body: body,
		user: { _id: "66032002df4cb1a8d20453f6" },
	});

	return post;
};

// const deletePostService = (req, res) => {}
module.exports = {
	createPostService,
};
