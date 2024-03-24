const mongoose = require("mongoose");

const connectDB = (url) => {
	if (!url) {
		console.log("Database URI missing.");
		return;
	}
	try {
		mongoose.connect(url, {});
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
	const dbConnection = mongoose.connection;
	dbConnection.once("open", (_) => {
		console.log(`Database connected: ${url}`);
	});

	dbConnection.on("error", (err) => {
		console.error(`connection error: ${err}`);
	});
	return;
};

module.exports = connectDB;
