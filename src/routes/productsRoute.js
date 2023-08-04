/* Requerimos Express */
const express = require("express");
/*Guardamos la ejecucion de Router en una constante */
const router = express.Router();

const productsController = require("../controllers/productsControllers")

router.get("/listProducts", productsController.list);
router.get("/productById/:id", productsController.searchById);
router.get("/productByName/:name", productsController.searchByName);
/*Metodo post para crear producto */
router.post("/createProduct", productsController.createProduct);

/*Exporto rutas creadas */
module.exports = router;
