global.import = function (path) {
	return require(path);
};

/* Package */
const path = require("path");
const reload = require("reload");
const omitEmpty = require("omit-empty");
const camelcaseKeys = require("camelcase-keys");
const handlebars = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const express = require("express");

/* Imports */
const URL = require("./helpers/urls");

/* Error */
const { errHandlerMiddleware } = require("./error.custom");

/* Route */
const homeRoute = require("./routes/home.route");
const authRoute = require("./routes/auth.route");
const roleRoute = require("./routes/role.route");
const userRoute = require("./routes/user.route");

const app = express();
require("dotenv/config");

/* Set Static */
app.use(express.static(path.join(__dirname, "public")));

/* Set View Engine */
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		layoutsDir: __dirname + "/views/layouts",
		runtimeOptions: {
			allowProtoPropertiesByDefault: true,
			allowProtoMethodsByDefault: true,
		},
		/* Từ 4.6.0 Handlebars cấm access prototype prop & methods */
	})
);
app.set("view engine", "hbs");

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	})
);
app.use(flash()); // phải đặt sau session
const camelcase = () => {
	return function (req, res, next) {
		req.body = camelcaseKeys(req.body, { deep: true });
		req.params = camelcaseKeys(req.params);
		req.query = camelcaseKeys(req.query);
		next();
	};
};
app.use(camelcase());

const removeEmptyProperties = () => {
	return function (req, res, next) {
		req.body = omitEmpty(req.body);
		req.params = omitEmpty(req.params);
		req.query = omitEmpty(req.query);
		next();
	};
};
app.use(removeEmptyProperties());

app.use((req, res, next) => {
	res.locals.URL = URL;
	next();
}); // middleware của csrfToken phải đặt trước tất cả routes

/* Route */
app.use(homeRoute);
app.use(authRoute);
app.use("/roles", roleRoute);
app.use("/users", userRoute);

/* 
	Error Handling
	- Phải đặt ở cuối cùng sau tất cả các routes & middlewares khác 
*/
app.use(errHandlerMiddleware);

/* Server */
const PORT = process.env.PORT || 3000;
reload(app);

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});

/* 
	NOTE TRONG QUÁ TRÌNH PHÁT TRIỂN
	1. Những src: url(../fonts/open-iconic/open-iconic.eot) ở file CSS cần được đổi thành /fonts/... vì cái folder fonts mình để ngay /public
	2. Những URL về css, js, images trong view phải bắt đầu bằng / (nếu không thì nó sẽ là relative) mà từ đó sinh ra lỗi
*/
