const express = require("express");
const postRouter = express.Router();

postRouter.route("/").get((req, res) => {
	res.send("GET /");
});

module.exports = postRouter;
