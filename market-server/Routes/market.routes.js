const express = require("express");
const marketStatsController = require("../Controllers/market.controllers");
const router = express.Router();

router.get("/statusById/:indexId", marketStatsController.getStatusById);

router.get("/allIndices", marketStatsController.getAllIndices);

module.exports = router;
