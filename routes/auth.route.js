const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();
const flash = require("connect-flash");

const userService = require("../services/user.service");
const validationMiddleware = require("../routes/validator.middleware");
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
		if (req.formErrors) {
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
	const error = req.flash("error");
	res.render("login", {
		errMsg: error[0],
	});
});

router.post("/login", async (req, res, next) => {
	const user = await userService.login(req.body);
	if (user) {
		req.session.user = {
			id: user.id,
			email: user.email,
			fullName: user.fullName,
			role: user.role,
			isVerified: user.isVerified,
			permissions: user.Role.permissions,
		};
		res.redirect(URL.HOME);
	} else {
		req.flash("error", "Email hoặc Password không đúng");
		res.redirect(URL.LOGIN);
	}
});

const { isAuth, isRole, hasPermissions } = require("../routes/auth.middleware");
const ROLE = require("../security/roles");
const PERMISSION = require("../security/permissions");

router.get("/test", async (req, res, next) => {
	console.log(req.session.user);
	console.log(req.cookies);
	console.log(req.session.cookie);
	res.render("home");
});

router.get("/test-auth", isAuth, async (req, res, next) => {
	console.log("test auth thành công");
	res.render("home");
});

router.get("/test-admin", isRole(ROLE.ADMIN), async (req, res, next) => {
	console.log("test admin thành công");
	res.render("home");
});

router.get(
	"/test-create-post",
	hasPermissions([PERMISSION.CREATE_POST]),
	async (req, res, next) => {
		console.log("test create thành công");
		res.render("home");
	}
);

router.get("/logout", async (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user;
		res.clearCookie("SESSION_ID");
		req.session.destroy(() => {
			console.log(`Đã hủy session của ${user.email}`);
		});
	} else {
		console.log("Không có gì để destroy");
	}

	res.redirect(URL.HOME);
});

module.exports = router;
