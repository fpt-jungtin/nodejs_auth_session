const { validationResult } = require("express-validator");

const validationMiddleware = async (req, res, next) => {
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
		req.formErrors = errObj;
	}

	next();
};

module.exports = validationMiddleware;
