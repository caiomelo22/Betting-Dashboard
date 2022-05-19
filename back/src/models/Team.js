const database = require("../database/db");
const League = require('./League').League;

const Team = database.sequelize.define("teams", {
  leagueId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'leagues', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  name: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
});

Team.belongsTo(League);

module.exports = {
  Team
};