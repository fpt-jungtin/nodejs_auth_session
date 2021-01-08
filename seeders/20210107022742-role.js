"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("roles", [
			{
				name: "ADMIN",
				permissions: `CREATE_POST, UPDATE_ANY_POST, UPDATE_OWN_POST, DELETE_ANY_POST, DELETE_OWN_POST, READ_ANY_POST, READ_OWN_POST`,
			},
			{
				name: "MANAGER",
				permissions: `CREATE_POST, UPDATE_OWN_POST, DELETE_OWN_POST, READ_ANY_POST, READ_OWN_POST`,
			},
			{
				name: "USER",
				permissions: `READ_ANY_POST, READ_OWN_POST`,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
