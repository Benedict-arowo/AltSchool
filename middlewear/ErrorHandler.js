const { StatusCodes } = require("http-status-codes");
const ErrorWithStatus = require("./ErrorWithStatus");

const ErrorHandler = (err, req, res, next) => {
	process.env.NODE_ENV === "development" && console.log(err);
	if (err instanceof ErrorWithStatus) {
		return res.status(err.status).json({
			message: err.message,
			error: process.env.NODE_ENV === "development" ? err : undefined,
		});
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
};

module.exports = ErrorHandler;
