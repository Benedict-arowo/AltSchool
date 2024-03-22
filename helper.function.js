const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns 0
 */

const findUser = (username) => {
	if (!username) return undefined;
	const rawData = fs.readFileSync(path.join(__dirname, "db.json"), {
		encoding: "utf8",
	});
	const users = JSON.parse(rawData);
	return users.find((user) => user.username === username);
};

const authenticate = (req, res, next) => {
	// Get username, and password from the header
	const header = req.headers["authorization"] || ""; // get the header
	let token = header.split(/\s+/).pop() || ""; // and the encoded auth token
	let auth = new Buffer.from(token, "base64").toString(); // convert from base64
	let parts = auth.split(/:/); // split on colon
	username = parts[0];
	password = parts[1];

	let user = findUser(username);

	if (user && user.password === password) {
		req.user = user;
		return next(req, res);
	}

	throw new Error("401");
};

module.exports = { authenticate };
