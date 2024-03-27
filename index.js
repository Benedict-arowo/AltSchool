require("dotenv").config();
const express = require("express");
const Routes = require("./routes");
const connectDb = require("./connectDb");
const ErrorHandler = require("./middlewear/ErrorHandler");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

Routes(app);
connectDb(process.env.mongodbUri);

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
