const { Router } = require("express");

const leagueController = require('../controllers/LeagueController');
const betController = require('../controllers/BetController');

const router = Router();

router.get("/healthy", (req, res) => res.send("Everything is okay"));

router.get("/league/list", leagueController.list);

router.get("/bet/list", betController.list);
router.post("/bet/create", betController.create);
router.put("/bet/update", betController.update);
router.delete("/bet/remove", betController.remove);

module.exports = router;
