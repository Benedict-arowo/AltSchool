const argon2 = require("argon2");
const ErrorWithStatus = require("../middlewear/ErrorWithStatus");
const { StatusCodes } = require("http-status-codes");
const { emailRegex, passwordRegex } = require("../utils");

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

	return { hashedPassword, email, name, password, confirm_password };
};

module.exports = {
	createUserService,
};
