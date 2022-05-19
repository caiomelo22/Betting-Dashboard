'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("sports", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.bulkInsert('sports', [
      {name: 'Football'},
      {name: 'Basketball'},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sports');
  }
};
