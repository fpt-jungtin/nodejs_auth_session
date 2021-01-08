const { MODEL_ALREADY_EXISTED_ERROR } = require("../error.custom");

const { User, Role } = require("../models");
const ROLE = require("../security/roles");

// const save = async function (body) {
// 	const user = await User.findByPk(body.id);
// 	if (user === null) throw new MODEL_NOT_FOUND_ERROR("User", body.id);

// 	try {
// 		if (!body.permissions) return;

// 		return await user.update({
// 			permissions: toStrPermissions(body.permissions),
// 		});
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

const getAllForListing = async () => {
	let users = await User.findAll({
		attributes: ["id", "email", "fullName", "isVerified", "createdAt"],
		include: {
			model: Role,
			attributes: ["name"],
		},
	});

	return users;
};

const findAll = async function () {
	let users = await User.findAll({
		// attributes: ["id", "title", "description", "createdAt"],
		include: {
			model: Role,
			// attributes: ["id", "title"],
		},
	});

	return users;
};

const register = async (body) => {
	console.log(body);
	const existed = await User.findOne({
		where: {
			email: body.email,
		},
	});
	if (existed) throw new MODEL_ALREADY_EXISTED_ERROR("User", `Email : ${body.email}`);

	try {
		await User.create({
			email: body.email,
			password: body.password,
			fullName: body.fullName,
			role: ROLE.USER,
			isVerified: false,
		});
	} catch (err) {
		console.error(err);
	}
};

const findById = async function (id) {
	let user = await User.findByPk(id, {
		include: {
			model: Role,
		},
	});
	if (user === null) throw new MODEL_NOT_FOUND_ERROR("User", id);

	return user;
};

const deleteById = async function (id) {
	const user = await User.findByPk(id);
	if (user === null) throw new MODEL_NOT_FOUND_ERROR_API("User", id);

	try {
		return await user.destroy();
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	register,
	// save,
	findAll,
	getAllForListing,

	findById,
	deleteById,
};
