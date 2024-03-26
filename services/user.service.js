const argon2 = require("argon2");
const ErrorWithStatus = require("../middlewear/ErrorWithStatus");
const { StatusCodes } = require("http-status-codes");
const { emailRegex, passwordRegex } = require("../utils");
const User = require("../models/user_schema");

const checkDataExistance = (data) => {
	data.map((item) => {
		if (!item.value)
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				`${item.field} field is required`
			);
		if (item.testRegex) {
			if (item.field === "password" && !passwordRegex.test(item.value)) {
				throw new ErrorWithStatus(
					StatusCodes.BAD_REQUEST,
					"Password must contain at least 6 characters, including UPPER/lowercase and numbers"
				);
			}

			if (item.field === "email" && !emailRegex.test(item.value)) {
				throw new ErrorWithStatus(
					StatusCodes.BAD_REQUEST,
					"Invalid email format."
				);
			}
		}
	});
};

const createUserService = async (body) => {
	const { name, email, password, confirm_password } = body;

	checkDataExistance([
		{ field: "name", value: name },
		{ field: "email", value: email, testRegex: true },
		{ field: "password", value: password, testRegex: true },
		{ field: "confirm_password", value: confirm_password },
	]);

	if (password !== confirm_password)
		throw new ErrorWithStatus(
			StatusCodes.BAD_REQUEST,
			"Password and Confirm Password must be the same"
		);

	const hashedPassword = await argon2.hash(password);

	try {
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		return {
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			createdAt: newUser.createdAt,
		};
	} catch (error) {
		// Log error in development
		process.env.NODE_ENV === "development" && console.log(error);
		// Error code for duplicate unique fields which would usally mean the email already exists.
		if (error.code === 11000)
			throw new ErrorWithStatus(
				StatusCodes.BAD_REQUEST,
				"User with email already exists"
			);
		else {
			throw new ErrorWithStatus(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Internal Server Error"
			);
		}
	}
};

const getUserService = async () => {
	return await User.find();
};

module.exports = {
	createUserService,
	getUserService,
};
