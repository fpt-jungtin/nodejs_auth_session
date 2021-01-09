const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();
const postService = require("../services/post.service");
const validationMiddleware = require("../routes/validator.middleware");
const { param, body, validationResult } = require("express-validator");
const authMiddleware = require("../routes/auth.middleware");
const PERMISSION = require("../security/permissions");

router.get("/", authMiddleware.isAuth, async (req, res, next) => {
	try {
		if (req.session.user.permissions.includes(PERMISSION.READ_ANY_POST)) {
			const posts = await postService.findAll();
			res.render("post-list", {
				posts,
			});
		} else if (req.session.user.permissions.includes(PERMISSION.READ_OWN_POST)) {
			const posts = await postService.findOwnAll(req.session.user.id);
			res.render("post-list", {
				posts,
			});
		} else {
			res.status(403).json("Tài khoản không có quyền truy cập phần này");
		}
	} catch (err) {
		next(err);
	}
});

// router.post(
// 	"/process",
// 	[
// 		body("permissions").custom((arrPermissions) => {
// 			if (!arrPermissions) return true;
// 			const permissions = require("../security/permissions");

// 			for (let index = 0; index < arrPermissions.length; index++) {
// 				const per = arrPermissions[index];
// 				if (Object.values(permissions).indexOf(per) < 0)
// 					throw new Error("không hợp lệ! Mày đừng có chơi tao :((");
// 			}

// 			return true;
// 		}),
// 	],
// 	validationMiddleware,
// 	async (req, res, next) => {
// 		if (req.formErrors) {
// 			res.render("404", {
// 				layout: false,
// 				error: {
// 					message: errObj.permissions,
// 				},
// 			});
// 			return;
// 		}

// 		try {
// 			await roleService.save(req.body);
// 			res.redirect(URL.ROLE);
// 		} catch (err) {
// 			next(err);
// 		}
// 	}
// );

module.exports = router;
