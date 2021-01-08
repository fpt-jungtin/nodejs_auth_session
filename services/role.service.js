const { MODEL_NOT_FOUND_ERROR } = require("../error.custom");

const { Role } = require("../models");

const save = async function (body) {
	const role = await Role.findByPk(body.id);
	if (role === null) throw new MODEL_NOT_FOUND_ERROR("Role", body.id);

	try {
		if (!body.permissions) return;

		return await role.update({
			permissions: toStrPermissions(body.permissions),
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

const findById = async function (id) {
	let role = await Role.findByPk(id);
	if (role === null) throw new MODEL_NOT_FOUND_ERROR("Role", id);

	role.dataValues.permissions = toArrPermissions(role.dataValues.permissions);

	return role;
};

// const deleteById = async function (id) {
// 	const role = await Role.findByPk(id);
// 	if (role === null) throw new MODEL_NOT_FOUND_ERROR_API("Role", id);

// 	try {
// 		return await role.destroy();
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// const getRoleHtmlById = async (id) => {
// 	const customParsers = {
// 		code: function (data, config) {
// 			const html = `<pre><code class="${data.languageCode}">${data.code}</code></pre>`;
// 			return html;
// 		},
// 	};
// 	const parser = new edjsParser(
// 		{
// 			image: {
// 				use: "figure",
// 				// use figure or img tag for images (figcaption will be used for caption of figure)
// 				// if you use figure, caption will be visible
// 				imgClass: "img", // used class for img tags
// 				figureClass: "fig-img", // used class for figure tags
// 				figCapClass: "fig-cap", // used class for figcaption tags
// 				path: "absolute",
// 				// if absolute is passed, the url property which is the absolute path to the image will be used
// 				// otherwise pass a relative path with the filename property in <> like so: '/img/<fileName>'
// 			},
// 			paragraph: {
// 				pClass: "paragraph", // used class for paragraph tags
// 			},
// 			code: {
// 				codeBlockClass: "code-block", // used class for code blocks
// 			},
// 			embed: {
// 				useProvidedLength: false,
// 				// set to true if you want the returned width and height of editorjs to be applied
// 				// NOTE: sometimes source site overrides the lengths so it does not work 100%
// 			},
// 			quote: {
// 				applyAlignment: false,
// 				// if set to true blockquote element will have text-align css property set
// 			},
// 		},
// 		customParsers
// 	);

// 	const role = await Role.findByPk(id, {
// 		include: {
// 			model: Category,
// 			attributes: ["id", "title"],
// 		},
// 	});
// 	if (role === null) throw new MODEL_NOT_FOUND_ERROR("Role", id);

// 	role.dataValues.createdAt = dayjs(role.createdAt).format("MMM D, YYYY"); // not role.createdAt (phải có dataValues)
// 	role.dataValues.updatedAt = dayjs(role.updatedAt).format("MMM D, YYYY");
// 	role.dataValues.markup = parser.parse(JSON.parse(role.content));

// 	return role.dataValues;
// };

// var generateSlug = function (str) {
// 	str = str.replace(/^\s+|\s+$/g, ""); // trim
// 	str = str.toLowerCase();

// 	// remove accents, swap ñ for n, etc
// 	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
// 	var to = "aaaaaeeeeeiiiiooooouuuunc------";
// 	for (var i = 0, l = from.length; i < l; i++) {
// 		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
// 	}

// 	str = str
// 		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
// 		.replace(/\s+/g, "-") // collapse whitespace and replace by -
// 		.replace(/-+/g, "-"); // collapse dashes

// 	return str;
// };

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
	findById,
	// getRoleHtmlById,
	// deleteById,
};
