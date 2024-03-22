const AuthorRouter = (req, res) => {
	if (req.method === "POST") {
		return res.end(
			JSON.stringify({ message: "success", route: "POST Authors" })
		);
	}
	// GET /books
	if (req.method === "GET") {
		return res.end(
			JSON.stringify({ message: "success", route: "GET Authors" })
		);
	}
	// GET /books/:id
	if (req.method === "GET") {
		return res.end(
			JSON.stringify({ message: "success", route: "GET Authors" })
		);
	}
	// PUT /books/:id
	if (req.method === "PUT") {
		return res.end(
			JSON.stringify({ message: "success", route: "PUT Authors" })
		);
	}
	// DELETE /books/:id
	if (req.method === "DELETE") {
		return res.end(
			JSON.stringify({ message: "success", route: "DELETE Authors" })
		);
	}
};

module.exports = AuthorRouter;
