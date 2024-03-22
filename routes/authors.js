const express = require("express");
const authorsRouter = express.Router();
const {
	createAuthor,
	deleteAuthor,
	getAuthor,
	updateAuthor,
} = require("../controller/author.controller");

authorsRouter
	.route("/")
	.get(getAuthor)
	.post(createAuthor)
	.patch(updateAuthor)
	.delete(deleteAuthor);

module.exports = authorsRouter;
