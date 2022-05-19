'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leagues", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sports', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.bulkInsert('leagues', [
      {name: 'NBA', sportId: 2},
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leagues');
  }
};
