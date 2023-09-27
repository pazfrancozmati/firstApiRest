/* Requerimos Express */
const express = require("express");

/*Importo el midleware que guarda  en archivo logs.txt las 
rutas a las que accedo con el servidor levantado */
const midlewareLogs = require("../middlewares/log.js");

/*Importo el midleware que almacena la imagen*/
const midlewareStorage = require("../middlewares/storage.js");

/*Requiero los controladores del producto para armar las respectivas rutas */
const productsController = require("../controllers/productsControllers");

/*Guardamos la ejecucion de Router en una constante */
const router = express.Router();

router.get("/listProducts", midlewareLogs, productsController.list);
router.get("/productById/:id", midlewareLogs, productsController.searchById);
router.get("/productByName/:name", midlewareLogs, productsController.searchByName);
/*Metodo post para crear producto, con upload.single(aca va el 
nombre de la entrada de la imagen del formulario), es midleware */
router.delete("/delateById/", midlewareLogs, productsController.delateById);
router.post("/createProduct", midlewareLogs, midlewareStorage.single("image"), productsController.createProduct);
/*Debo pasar el id por parametro para actualizar el producto*/
router.put("/updateProduct/:id", midlewareLogs, midlewareStorage.single("image"), productsController.updateProduct);

/*Exporto rutas creadas*/
module.exports = router;
