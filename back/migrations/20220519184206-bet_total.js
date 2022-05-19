'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("totalbets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      betId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'bets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      prediction: {
        type: Sequelize.ENUM('Over', 'Under'),
        allowNull: false,
      },
      line: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('totalbets');
  }
};
