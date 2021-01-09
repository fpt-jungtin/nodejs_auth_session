"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Post);
			User.belongsTo(models.Role, {
				foreignKey: "role",
				onDelete: "SET NULL",
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			isVerified: DataTypes.BOOLEAN,
			role: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			hooks: {
				beforeCreate: (user) => {
					const salt = bcrypt.genSaltSync();
					user.password = bcrypt.hashSync(user.password, salt);
				},
			},
			sequelize,
			modelName: "User",
		}
	);

	User.prototype.isValidPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	return User;
};
