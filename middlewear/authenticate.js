const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ErrorWithStatus = require("./ErrorWithStatus");
const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
	process.env.NODE_ENV === "development" && console.log("Authenticating...");
	let token = req.headers.authorization;

	if (!token)
		throw new ErrorWithStatus(
			StatusCodes.UNAUTHORIZED,
			ReasonPhrases.UNAUTHORIZED
		);

	if (!token.startsWith("Bearer "))
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Invalid Bearer token."
		);

	token = token.split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		process.env.NODE_ENV === "development" && console.log(err);
		if (err) {
			throw new ErrorWithStatus(StatusCodes.UNAUTHORIZED, err.message);
		}
		req.user = decoded;
		process.env.NODE_ENV === "development" &&
			console.log("Authentication done...");
		next();
	});
};

module.exports = Authenticate;
