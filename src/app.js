/* Requiero el modulo express */
const express = require('express');
/* Se ejecuta la funcion anterior y se guarda en la constante app*/
const app = express();


/*Importo el modulo de rutas y lo guardo en una constante */
const productsRoute = require('./routes/productsRoute');

/*seteo middlewares globales del punto de entrada(Para los post)-- SETEO PARA QUE LAS COSAS ENTREN EN FORMATO JSON*/
/*Para que sepa que los datos que se toman se pasan a formato json*/
app.use(express.urlencoded({ extended: false }));
/*Si viene formato directamtente en formato json se toma para almacenatlo en request */
app.use(express.json());


/*Para el endponit MesirveTienda uso las rutas de la constante productsRoute*/
app.use("/MesirveTienda", productsRoute);

/*Levanto servidor en el puerto 3000 */
app.listen(3000, () => console.log("http://localhost:3000/"));