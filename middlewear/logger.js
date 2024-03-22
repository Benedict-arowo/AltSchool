const logger = (req, res, next) => {
	console.log("Request", {
		url: req.url,
		method: req.method,
		time: new Date(),
		query: req.query,
		params: req.params,
	});
	next();
};

module.exports = logger;
