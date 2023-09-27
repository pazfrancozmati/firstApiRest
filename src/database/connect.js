/*Requiero mongoose luego de instalarlo -- npm i mongoose */
const mongoose = require('mongoose');

/*Se usa try y catch porque si de la consulta a mi base de dato sale un error es necesario que yo me entere, entonces se escrine en consola */
module.exports = async () => {
    /*Intento conectarme a la base */
    try {
        /*De manera ascincronica */
        await mongoose.connect('mongodb://127.0.0.1:27017/mesirve_tienda');
        /*Si lo logro informo mi correcta conexion */
        console.log("Conectado correctamente")
    }
    /*Si hay errores los capto e imprimo */
    catch (error) {
        console.log(error)
    }


    /*OTRA MANERA DE CONECTARSE: Conecto a la base de datos, si conecta manda mensaje OK y sino tira error */
    /* mongoose.connect('mongodb://127.0.0.1:27017/mesirve_tienda')
         .then(() => console.log('OK Conectado a la base de datos: mesirve_tienda'))
         .catch(e => console.log(e));*/
}