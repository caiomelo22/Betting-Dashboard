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

    const { count, rows } = await Bet.findAndCountAll({
      include: { model: Match, as: 'match', include: [{ model: Team, as: 'homeTeam' }, { model: Team, as: 'awayTeam' }] }, offset: page - 1, limit: pageSize, order: [
        [{ model: Match, as: 'match' }, 'matchDate', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    const returnObject = {
      totalPages,
      bets: rows
    }

    return { statusCode: 200, data: returnObject };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

const create = async (req, res) => {
  let { leagueId, homeTeamId, awayTeamId, matchDate, value, odds, won, type, prediction, line } = req.body;

  try {

    let match = null;

    matchDate = moment(matchDate);

    match = await Match.findOne({ where: { leagueId, homeTeamId, awayTeamId, matchDate } });

    if (!match) {
      match = await Match.create({ leagueId, homeTeamId, awayTeamId, matchDate });
    }

    const matchId = match.id;

    const newBet = await Bet.create({ matchId, value, odds, won, type });

    const betId = newBet.id;

    switch (type) {
      case 'Moneyline':
        newBet.moneyline = await BetMoneyline.create({ betId, prediction });
        break;
      case 'Total':
        newBet.total = await BetTotal.create({ betId, prediction, line });
        break;
    }

    return { statusCode: 200, data: newBet }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

const update = async (req, res) => {
  const { id, matchId, value, odds, won, type, prediction, line } = req.body;

  try {
    const findBet = await Bet.findOne({ where: { id: id }, include: { all: true } })

    if (findBet == null) {
      return { statusCode: 404, data: 'Bet not found.' }
    }

    await findBet.update({ matchId, value, odds, won, type });

    switch (type) {
      case 'Moneyline':
        await findBet.moneyline.update({ prediction });
        break;
      case 'Total':
        await findBet.total.update({ prediction, line });
        break;
    }

    return { statusCode: 200, data: 'Bet updated successfully.' }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    const findBet = await Bet.findOne({ where: { id: id } })

    if (findBet == null) {
      return { statusCode: 404, data: 'Bet not found.' }
    }

    await findBet.destroy();

    return { statusCode: 200, data: 'Bet removed successfully.' }
  } catch (error) {
    console.log(error);
    return { statusCode: 500, data: 'An error has occured', error: error }
  }
};

module.exports = {
  list,
  create,
  update,
  remove
}