"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {}
	}
	Role.init(
		{
			name: DataTypes.STRING,
			permissions: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Role",
			timestamps: false,
		}
	);
	return Role;
};
