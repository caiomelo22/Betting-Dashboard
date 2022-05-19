const database = require("../database/db");
const Match = require('./Match').Match;

const Bet = database.sequelize.define("bets", {
  matchId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'matches', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: {
    type: database.Sequelize.FLOAT,
    allowNull: false,
  },
  odds: {
    type: database.Sequelize.FLOAT,
    allowNull: false,
  },
  won: {
    type: database.Sequelize.BOOLEAN,
    allowNull: false,
  },
  type: {
    type: database.Sequelize.ENUM('Moneyline', 'Total'),
    allowNull: false,
  },
});

Bet.belongsTo(Match, {as: 'match'});

module.exports = {
  Bet
};