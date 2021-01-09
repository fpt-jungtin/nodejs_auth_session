"use strict";

const ROLE = require("../security/roles");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", [
			{
				email: "admin@gmail.com",
				password: "admin",
				fullName: "John Doe",
				role: ROLE.USER,
				isVerified: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
