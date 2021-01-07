"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.User, {
				foreignKey: "userId",
				allowNull: true,
				onDelete: "SET NULL",
			});
		}
	}
	Post.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
