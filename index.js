const http = require("http");
const BooksRouter = require("./books");
const AuthorRouter = require("./authors");
const { authenticate } = require("./helper.function");
PORT = 8000;

const getBodyFromStream = (req) => {
	return new Promise((resolve, reject) => {
		const data = [];
		req.on("data", (chunk) => {
			data.push(chunk);
		});
		req.on("end", () => {
			const body = Buffer.concat(data).toString();
			if (body) {
				// assuming that the body is a json object
				resolve(JSON.parse(body));
				return;
			}
			resolve({});
		});

		req.on("error", (err) => {
			reject(err);
		});
	});
};

const handleRequest = async (req, res) => {
	try {
		const body = await getBodyFromStream(req);
		req.body = body;
		res.setHeader("Content-Type", "application/json");

		if (req.url === "/books") authenticate(req, res, BooksRouter);
		else if (req.url === "/authors") authenticate(req, res, AuthorRouter);
		else res.end("Invalid Route.");
	} catch (error) {
		if (error.message === "401") {
			res.statusCode = 401;
			return res.end("Unauthorized!");
		}
		res.statusCode = 500;
		res.end(error.message);
	}
};

const server = http.createServer(handleRequest);
server.listen(PORT, "localhost", () => {
	console.log(`Server running on PORT ${PORT}`);
});
