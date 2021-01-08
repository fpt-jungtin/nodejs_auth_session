const express = require("express");
const router = express.Router();

const URL = require("../helpers/urls");
const helpers = require("handlebars-helpers")();

const userService = require("../services/user.service");
const { param, body, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
	try {
		const users = await userService.getAllForListing();
		res.render("user", {
			users,
			helpers: {
				date: require("helper-date"),
			},
		});
	} catch (err) {
		next(err);
	}
});

router.post("/delete/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		await userService.deleteById(req.params.id);
		res.redirect(URL.USER);
	} catch (err) {
		next(err);
	}
});

router.get("/update/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		const user = await userService.findById(req.params.id);
		const roles = require("../security/roles");

		res.render("user-form", {
			id: user.id,
			fullName: user.fullName,
			role: user.Role.name,

			roles,
			helpers: {
				eq: helpers.eq,
			},
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
