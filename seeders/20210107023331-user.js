"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", [
			{
				email: "admin@gmail.com",
				password: "admin",
				fullName: "John Doe",
				roleId: 1,
				isVerified: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
