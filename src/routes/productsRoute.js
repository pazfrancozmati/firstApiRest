/* Requerimos Express */
const express = require("express");
/*Guardamos la ejecucion de Router en una constante */
const router = express.Router();
/*Requiero multer para gestionar archivos */
const multer = require("multer");
/*Requiero modula path para obtener la ruta donde voy
 a almacenar el archivo(en destination del storage)*/
const path = require("path");
/*requiero modulo  fs para poder leer o escribir archivos */
const fs = require("fs");


/* Creo constante de archivo que quiero guardar */
const nameStorage = multer.diskStorage({
    /* Esto es un objeto con dos funciones que le paso al multer, contiene: */
    /* Donde va a guardar el archivo */
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../../public/images/products"));
    },
    /* Como se va a llamar el archivo */
    filename: (req, file, cb) => {
        /*en extension del archivo guardo el formato del archivo */
        const extensionDeArchivo = path.extname(file.originalname);
        /*Valido el formato de la imagen que ingresa */
        if (extensionDeArchivo == ".jpg" || extensionDeArchivo == ".png" || extensionDeArchivo == ".jpeg") {
            /*En el parametro null deberian venir errores de validacion, el segundo parametro es 
            el nombre, compuesto por DOC+ FECHA DE HOY + extension del archivo ej PDF jpg etc. */
            cb(null, "DOC" + Date.now() + extensionDeArchivo);
            /*cb(null, "aca viene el nombre del front(file.fieldname)" + "-" + Date.now());*/
        } else {
            /*Levanto error de formato y se pone en servidor, no es la idea pero queda asi provisiorio */
            fs.appendFileSync(path.resolve(__dirname, "../logs/logs.txt"), "Se intento almacenar una imagen NO compatible en formato :" + extensionDeArchivo + "\n");
            throw Error("Formato de imagen invalido");
        }
    }
});

/*Ejecuto  en una variable (que se almacena) el guardado del archivo declarado en el modulo de arriba, este lo voy a usar como midleware en el post que va al control mas abajo */
const upload = multer({ storage: nameStorage });

/*Importo el midleware que guarda  en archivo logs.txt las 
rutas a las que accedo con el servidor levantado */
const midlewareLogs = require("../middlewares/log.js");

/*Requiero los controladores del producto para armar las respectivas rutas */
const productsController = require("../controllers/productsControllers");

router.get("/listProducts", midlewareLogs, productsController.list);
router.get("/productById/:id", midlewareLogs, productsController.searchById);
router.get("/productByName/:name", midlewareLogs, productsController.searchByName);
/*Metodo post para crear producto, con upload.single(aca va el 
nombre de la entrada de la imagen del formulario), es midleware */
router.post("/createProduct", upload.single("image"), productsController.createProduct);

/*Exporto rutas creadas */
module.exports = router;
