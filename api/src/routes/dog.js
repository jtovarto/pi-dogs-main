const { Router } = require("express");
const dogsController = require("../controllers/dogs");
const router = Router();

router.post("/", dogsController.create);

module.exports = router;