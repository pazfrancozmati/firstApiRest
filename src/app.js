/*Importo el modulo para captar ruta, lo voy a usar para gestionar las imagenes */
const path = require("path");
/* Requiero el modulo express */
const express = require('express');
/* Se ejecuta la funcion anterior y se guarda en la constante app*/
const app = express();

/*Importo el modulo de rutas de productos y lo guardo en una constante */
const productsRoute = require('./routes/productsRoute');


/*CONFIGURACIONES */


/*BASE DE DATOS */
/*SE MOVIO LA CONEXION AL ARCHIVO connect.js en la carpeta models */
/*Importo la conexion a la base de datos */
const connectDb = require('./database/connect.js');
/*Me conecto a la base de datos */
connectDb();


/*Midlewares para cargar imagenes */
app.use(express.static(path.resolve(__dirname, "../public")));
/*seteo middlewares globales del punto de entrada(Para los post)-- SETEO PARA QUE LAS COSAS ENTREN EN FORMATO JSON*/
/*Para que sepa que los datos que se toman se pasan a formato json*/
app.use(express.urlencoded({ extended: false }));
/*Si viene formato directamtente en formato json se toma para almacenatlo en request */
app.use(express.json());


/*Para el endponit MesirveTienda uso las rutas de la constante productsRoute*/
app.use("/MesirveTienda", productsRoute);

/*Middleware de aplicacion: - Ruta inexistente cod 404, siempre va ultima, si no entra a ninguna de las rutas de anteriores entra aca */
app.use(function (req, res, next) {
    return res.status(404).json({
        status: 404,
        error: "Resource not found",
        message: "Error, recurso solicitado inexistente"
    })
})

/*Levanto servidor en el puerto 3000 */
app.listen(3000, () => console.log("http://localhost:3000/"));