"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			// Role.hasMany(models.User);
		}
	}
	Role.init(
		{
			name: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				/* Nếu mình không set primaryKey => sqlize tự động dùng field id làm PK */
			},
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
