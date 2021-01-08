const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();
const roleService = require("../services/role.service");
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

router.get("/update/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		const role = await roleService.findById(req.params.id);
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

			for (let index = 0; index < arrPermissions.length; index++) {
				const per = arrPermissions[index];
				if (Object.values(permissions).indexOf(per) < 0)
					throw new Error("không hợp lệ! Mày đừng có chơi tao :((");
			}

			return true;
		}),
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

			res.render("404", {
				layout: false,
				error: {
					message: errObj.permissions,
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
