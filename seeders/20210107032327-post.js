"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("posts", [
			{
				title: "Welcome to post number 1",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sit quos pariatur, labore enim consectetur",
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Welcome to post number 2",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sit quos pariatur, labore enim consectetur",
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
