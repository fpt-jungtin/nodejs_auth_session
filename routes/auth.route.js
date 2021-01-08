const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();

const userService = require("../services/user.service");
const { param, body, validationResult } = require("express-validator");

// router.get("/", async (req, res, next) => {
// 	try {
// 		const users = await userService.findAll();
// 		res.render("user", {
// 			users,
// 			helpers: {
// 				date: require("helper-date"),
// 			},
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// });

router.get("/register", async (req, res, next) => {
	const errObj = req.flash("errors");
	const oldValues = req.flash("oldValues");

	res.render("register", {
		errors: errObj[0], // Vì bất giá trị nào truyền qua flash đều sẽ nằm bên trong []
		...oldValues[0],
	});
});

router.post(
	"/register",
	[
		body("email")
			.notEmpty()
			.withMessage("không được để trống")
			.isEmail()
			.withMessage("cần phải đúng cú pháp"),
		body("password")
			.notEmpty()
			.withMessage("không được để trống")
			.isLength({ min: 5 })
			.withMessage("có độ dài ít nhất 5 ký tự"),
		body("fullName")
			.notEmpty()
			.withMessage("không được để trống")
			.isString()
			.withMessage("khong được chứa số, chỉ chấp nhận ký tự"),
	],
	async (req, res, next) => {
		const rs = validationResult(req);

		if (rs.errors.length > 0) {
			/* Filter Errors for View */
			const errObj = {};
			rs.errors
				.filter((err) => {
					return err.location === "body";
				})
				.forEach((err) => {
					errObj[err.param] = `${err.param.charAt(0).toUpperCase() + err.param.slice(1)}
						${err.msg.toLowerCase()}`;
				});

			req.flash("errors", errObj);
			req.flash("oldValues", req.body);
			res.redirect(URL.REGISTER);
			return;
		}

		try {
			await userService.register(req.body);
			res.redirect(URL.LOGIN);
		} catch (err) {
			next(err);
		}
	}
);

router.get("/login", async (req, res, next) => {
	res.render("login");
});

module.exports = router;
