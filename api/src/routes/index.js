const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/dogs", require("./dogs.js"));
router.use("/dog", require("./dog.js"));

module.exports = router;
