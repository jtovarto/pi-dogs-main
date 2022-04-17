const { Router } = require("express");
const dogsController = require("../controllers/dogs");
const router = Router();

// Configurar los routers
router.get("/:idRaza", dogsController.getById);
router.get("/", dogsController.getAll);


module.exports = router;
