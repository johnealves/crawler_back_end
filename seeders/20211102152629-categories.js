'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert("categories", [
    { 
      name: "celular",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    { 
      name: "geladeira",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    { 
      name: "tv",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("categories", null, {})
};
