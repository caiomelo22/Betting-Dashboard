const database = require("../database/db");
const Match = require('./Match').Match;
const BetMoneyline = require('./BetMoneyline').BetMoneyline;
const BetTotal = require('./BetTotal').BetTotal;

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
    defaultValue: false,
    allowNull: false,
  },
  type: {
    type: database.Sequelize.ENUM('Moneyline', 'Total'),
    allowNull: false,
  },
});

Bet.belongsTo(Match, {as: 'match'});

BetMoneyline.belongsTo(Bet, {as: 'bet'});
Bet.hasOne(BetMoneyline, { as: 'moneyline' });

BetTotal.belongsTo(Bet, { as: 'bet' });
Bet.hasOne(BetTotal, { as: 'total' });

module.exports = {
  Bet
};