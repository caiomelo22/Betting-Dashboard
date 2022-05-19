const database = require("../database/db");
const Bet = require('./Bet').Bet;

const BetMoneyline = database.sequelize.define("moneylinebets", {
  betId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'bets', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  prediction: {
    type: database.Sequelize.ENUM('Home', 'Away', 'Draw'),
    allowNull: false,
  },
});

BetMoneyline.belongsTo(Bet, {as: 'bet'});

module.exports = {
  BetMoneyline
};