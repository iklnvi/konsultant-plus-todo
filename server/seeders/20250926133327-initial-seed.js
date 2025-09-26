"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    "use strict";

    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          title: "Купить продукты",
          description: "Молоко, хлеб, яйца",
          status: "backlog",
          deadline: "2025-09-30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Сделать проект",
          description: "Закончить backend на express + sequelize",
          status: "inProgress",
          deadline: "2025-10-05",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Прочитать книгу",
          description: "Clean Code",
          status: "done",
          deadline: "2025-09-20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
