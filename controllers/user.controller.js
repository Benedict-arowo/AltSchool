const { StatusCodes } = require("http-status-codes");
const { createUserService } = require("../services/user.service");

const createUser = async (req, res) => {
	const user = await createUserService(req.body);
	console.log(user);
	res.status(StatusCodes.CREATED).json(user);
};

module.exports = {
	createUser,
};
