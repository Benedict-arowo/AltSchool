const postRouter = require("./post.route");
const userRouter = require("./users.route");

const Router = (app) => {
	app.use("/api/v1/users", userRouter);
	app.use("/api/v1/posts", postRouter);
};

module.exports = Router;
