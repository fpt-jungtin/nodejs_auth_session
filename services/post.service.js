const { MODEL_ALREADY_EXISTED_ERROR } = require("../error.custom");

const { Post, User } = require("../models");

// const save = async function (body) {
// 	const post = await Post.findByPk(body.id);
// 	if (post === null) throw new MODEL_NOT_FOUND_ERROR("Post", body.id);

// 	try {
// 		return await post.update({
// 			fullName: body.fullName,
// 			role: body.role,
// 		});
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

const findAll = async function () {
	let posts = await Post.findAll({
		// attributes: ["id", "title", "description", "createdAt"],
		include: {
			model: User,
			// attributes: ["id", "title"],
		},
	});

	return posts;
};

const findOwnAll = async function (userId) {
	let posts = await Post.findAll({
		// attributes: ["id", "title", "description", "createdAt"],
		include: {
			model: User,
			// attributes: ["id", "title"],
		},
		where: {
			userId: userId,
		},
	});

	return posts;
};

// const findById = async function (id) {
// 	let post = await Post.findByPk(id, {
// 		include: {
// 			model: Role,
// 		},
// 	});
// 	if (post === null) throw new MODEL_NOT_FOUND_ERROR("Post", id);

// 	return post;
// };

// const deleteById = async function (id) {
// 	const post = await Post.findByPk(id);
// 	if (post === null) throw new MODEL_NOT_FOUND_ERROR_API("Post", id);

// 	try {
// 		return await post.destroy();
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

module.exports = {
	// save,
	findAll,
	findOwnAll,
	// getAllForListing,
	// findById,
	// deleteById,
};
