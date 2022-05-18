const { Router } = require("express");

const router = Router();

router.get("/healthy", (req, res) => res.send("Everything is okay"));

module.exports = router;
