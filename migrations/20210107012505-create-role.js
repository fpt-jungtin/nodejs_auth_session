"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("roles", {
			// id: {
			// 	allowNull: false,
			// 	autoIncrement: true,
			// 	primaryKey: true,
			// 	type: Sequelize.INTEGER,
			// },
			name: {
				type: Sequelize.STRING,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			permissions: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("roles");
	},
};
