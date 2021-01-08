"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Post);
			User.belongsTo(models.Role, {
				foreignKey: "roleId",
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
			roleId: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
