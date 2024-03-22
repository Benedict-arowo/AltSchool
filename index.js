const express = require("express");
const authorsRouter = require("./routes/authors");
const logger = require("./middlewear/logger");

const app = express();
const PORT = 8000;

app.use(logger);
app.use("/authors", authorsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
