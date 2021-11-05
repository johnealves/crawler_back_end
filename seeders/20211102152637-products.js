'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert("products", [
    {
      description: "Produto",
      price: 999.99,
      picture: "link da foto",
      link: "lindo post",
      storeId: 1,
      categoryId: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  ], {}),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("products", null, {})
};
