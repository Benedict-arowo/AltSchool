const postRouter = require("./post.route");
const userRouter = require("./users.route");

const Router = (app) => {
	app.use("/", userRouter);
	app.use("/posts", postRouter);
};

module.exports = Router;
