const { Router } = require("express");

const router = Router();

router.use("/dog", require("./dog.js"));
router.use("/dogs", require("./dogs.js"));
router.use("/temperament", require("./temperament.js"));

module.exports = router;
