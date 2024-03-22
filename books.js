const BooksRouter = (req, res) => {
	if (req.method === "POST") {
		return res.end(
			JSON.stringify({ message: "success", route: "POST Books" })
		);
	}
	// GET /books
	if (req.method === "GET") {
		return res.end(
			JSON.stringify({ message: "success", route: "GET Books" })
		);
	}
	// GET /books/:id
	if (req.method === "GET") {
		return res.end(
			JSON.stringify({ message: "success", route: "GET Books" })
		);
	}
	// PUT /books/:id
	if (req.method === "PUT") {
		return res.end(
			JSON.stringify({ message: "success", route: "PUT Books" })
		);
	}
	// DELETE /books/:id
	if (req.method === "DELETE") {
		return res.end(
			JSON.stringify({ message: "success", route: "DELETE Books" })
		);
	}
};

module.exports = BooksRouter;
