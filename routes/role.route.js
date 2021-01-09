const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();
const roleService = require("../services/role.service");
const validationMiddleware = require("../routes/validator.middleware");
const { param, body, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
	try {
		const roles = await roleService.findAll();
		res.render("role", {
			roles,
		});
	} catch (err) {
		next(err);
	}
});

router.get("/update/:name", async (req, res, next) => {
	try {
		const role = await roleService.findByName(req.params.name);
		const permissions = require("../security/permissions");
		res.render("role-form", {
			role,
			permissions,
			helpers: {
				contains: helpers.contains,
			},
		});
	} catch (err) {
		next(err);
	}
});

router.post(
	"/process",
	[
		body("permissions").custom((arrPermissions) => {
			if (!arrPermissions) return true;
			const permissions = require("../security/permissions");

			if (typeof arrPermissions === "string") {
				if (Object.values(permissions).indexOf(arrPermissions) < 0)
					throw new Error("không hợp lệ! Mày đừng có chơi tao :((");
			} else {
				for (let index = 0; index < arrPermissions.length; index++) {
					const per = arrPermissions[index];
					if (Object.values(permissions).indexOf(per) < 0)
						throw new Error("không hợp lệ! Mày đừng có chơi tao :((");
				}
			}

			return true;
		}),
	],
	validationMiddleware,
	async (req, res, next) => {
		if (req.formErrors) {
			res.render("404", {
				layout: false,
				error: {
					message: req.formErrors.permissions,
				},
			});
			return;
		}

		try {
			await roleService.save(req.body);
			res.redirect(URL.ROLE);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
