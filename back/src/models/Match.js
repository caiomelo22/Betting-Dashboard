const database = require("../database/db");
const Team = require('./Team').Team;

const Match = database.sequelize.define("teams", {
  leagueId: {
    type: database.Sequelize.STRING,
    allowNull: false,
    references: { model: 'leagues', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  scoreHomeTeam: {
    type: database.Sequelize.INTEGER,
    allowNull: true,
  },
  scoreAwayTeam: {
    type: database.Sequelize.INTEGER,
    allowNull: true,
  },
  matchDate: {
    type: database.Sequelize.DATE,
    allowNull: false,
  },
});

Match.belongsTo(Team, { as: 'homeTeam' });
Match.belongsTo(Team, { as: 'awayTeam' });

module.exports = {
  Match
};