const { Router } = require("express");
const temperController = require("../controllers/temperament");
const router = Router();

router.get("/", temperController.getAll);

module.exports = router;