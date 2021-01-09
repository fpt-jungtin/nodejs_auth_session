const { ROLE } = require("../helpers/urls");
const URL = require("../helpers/urls");

const isAuth = (req, res, next) => {
	if (req.session.user) next();
	else res.status(401).json("Chưa đang nhập");
	// res.redirect(URL.LOGIN);
};

const isRole = function (role) {
	return (req, res, next) => {
		if (req.session.user && req.session.user.role === role) next();
		else res.status(403).json("Không có quyền này");
	};
};

const hasPermissions = function (arrPermissions) {
	return (req, res, next) => {
		console.log(req.session.user);
		if (req.session.user && req.session.user.permissions.includes(...arrPermissions)) next();
		else res.status(403).json("Không có quyền này");
	};
};

module.exports = {
	isAuth,
	isRole,
	hasPermissions,
};
