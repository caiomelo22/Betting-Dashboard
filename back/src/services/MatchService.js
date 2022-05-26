const Bet = require('../models/Bet').Bet;
const Match = require('../models/Match').Match;
const Team = require('../models/Team').Team;
const BetMoneyline = require('../models/BetMoneyline').BetMoneyline;
const BetTotal = require('../models/BetTotal').BetTotal;
const moment = require('moment');

const list = async (req, res) => {
  try {
    const page = parseInt(req.query.page);

    const pageSize = 15

    const { count, rows } = await Match.findAndCountAll({
      where: { scoreHomeTeam: null, scoreAwayTeam: null },
      include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }], offset: page - 1, limit: pageSize, order: [
        ['matchDate', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    const returnObject = {
      totalPages,
      matches: rows
    }

    return { statusCode: 200, data: returnObject };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

const update = async (req, res) => {
  const { id, scoreHomeTeam, scoreAwayTeam } = req.body;

  try {
    const findMatch = await Match.findOne({ where: { id: id }, include: { model: Bet, as: 'bets' } })

    if (findMatch == null) {
      return { statusCode: 404, data: 'Match not found.' }
    }

    await findMatch.update({ scoreHomeTeam, scoreAwayTeam });

    let moneylineBets = findMatch.bets.filter(x => x.type == 'Moneyline')
    let totalBets = findMatch.bets.filter(x => x.type == 'Total')

    for (let i = 0; i < moneylineBets.length; i++) {
      if ((scoreHomeTeam > scoreAwayTeam && moneylineBets[i].prediction == 'Home') || (scoreHomeTeam < scoreAwayTeam && moneylineBets[i].prediction == 'Away') || (scoreHomeTeam == scoreAwayTeam && moneylineBets[i].prediction == 'Draw')) {
        moneylineBets[i].update({ won: true })
      }
    }

    for (let i = 0; i < totalBets.length; i++) {
      if ((scoreHomeTeam + scoreAwayTeam > totalBets[i].line && totalBets[i].prediction == 'Over') || (scoreHomeTeam + scoreAwayTeam < totalBets[i].line && totalBets[i].prediction == 'Under')) {
        moneylineBets[i].update({ won: true })
      }
    }

    return { statusCode: 200, data: 'Match updated successfully.' }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

module.exports = {
  list,
  update
}