const http = require("http");

const PORT = 8900;
const server = http.createServer((req, res) => {
	// Handles Not Found Error
	const throwError = (res) => {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				success: false,
				data: "404 | NOT_FOUND",
			})
		);
	};

	// Books Route
	if (req.url === "/books") {
		if (req.method === "GET") {
			// GET books
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "GET /books",
				})
			);
		} else if (req.method === "PUT") {
			// PUT books
			res.writeHead(201, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "PUT /books",
				})
			);
		} else if (req.method === "DELETE") {
			// DELETE books
			res.writeHead(204, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "DELETE /books",
				})
			);
			// If method doesn't match, a 404 response is given.
		} else throwError(res);
		// books/author route
	} else if (req.url === "/books/author") {
		if (req.method === "GET") {
			// GET /books/author
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "GET /books/author",
				})
			);
		} else if (req.method === "POST") {
			// POST books/author
			res.writeHead(201, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "POST /books/author",
				})
			);
		} else if (req.method === "PUT") {
			// PUT books/author
			res.writeHead(201, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					success: true,
					data: "PUT /books/author",
				})
			);
			// If method doesn't match, a 404 response is given.
		} else throwError(res);
		// If url doesn't match, a 404 response is given.
	} else throwError(res);
});

server.listen(PORT);
console.log("Server listening on port", PORT);
