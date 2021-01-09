const { MODEL_NOT_FOUND_ERROR } = require("../error.custom");

const { Role } = require("../models");

const save = async function (body) {
	const role = await Role.findByPk(body.name);
	if (role === null) throw new MODEL_NOT_FOUND_ERROR("Role", body.name);

	if (!body.permissions) throw new Error("Role's permissions must have at least 1");
	try {
		return await role.update({
			permissions:
				typeof body.permissions === "string"
					? body.permissions
					: toStrPermissions(body.permissions),
		});
	} catch (err) {
		console.error(err);
	}
};

const findAll = async function () {
	let roles = await Role.findAll({
		// attributes: ["id", "title", "description", "createdAt"],
		// include: {
		// 	model: Category,
		// 	attributes: ["id", "title"],
		// },
	});

	roles = roles.map((role) => {
		role.dataValues.permissions = toArrPermissions(role.dataValues.permissions);
		return role;
	});

	return roles;
};

const findByName = async function (name) {
	let role = await Role.findByPk(name);
	if (role === null) throw new MODEL_NOT_FOUND_ERROR("Role", name);

	role.dataValues.permissions = toArrPermissions(role.dataValues.permissions);

	return role;
};

/* 
    Tools
*/
const toArrPermissions = (permissionStr) => {
	return permissionStr.split(",").map((permission) => {
		return permission.trim();
	});
};

const toStrPermissions = (permissionArr) => {
	return permissionArr.join(",");
};

module.exports = {
	save,
	findAll,
	findByName,
	// getRoleHtmlById,
	// deleteById,

	toArrPermissions,
};
