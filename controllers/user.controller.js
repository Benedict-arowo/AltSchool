const { StatusCodes } = require("http-status-codes");
const {
	createUserService,
	getUserService,
	loginUserService,
} = require("../services/user.service");

const createUser = async (req, res) => {
	const user = await createUserService(req.body);
	res.status(StatusCodes.CREATED).json({
		message: "success",
		data: user,
	});
};

const getUsers = async (req, res) => {
	const user = await getUserService();
	res.status(StatusCodes.OK).json({
		message: "success",
		data: user,
	});
};

const loginUser = async (req, res) => {
	const user = await loginUserService(req.body);
	res.status(StatusCodes.OK).json({
		message: "success",
		data: user,
	});
};

module.exports = {
	createUser,
	getUsers,
	loginUser,
};
