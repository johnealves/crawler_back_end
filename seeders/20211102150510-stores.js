'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert("stores",
  [
    { 
      name: "Mercado Livre",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    { 
      name: "Buscape",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("stores", null, {})
  }
};
