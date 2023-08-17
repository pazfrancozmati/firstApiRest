/*Modulo que uso para obtener la ruta*/
const path = require("path");
/*requiero modulo  fs para poder leer o escribir archivos */
const fs = require("fs");

/*Middleware para que me guarde las rutas a las que accedo */
const logs = (req, res, next) => {
    /*Obtengo la ruta de mi archivo txt, donde almaceno las rutas a las que accedo*/
    const rutaLogs = path.resolve(__dirname, "../logs/logs.txt");
    /*Escribo en el archivo a donde accedi */
    fs.appendFileSync(rutaLogs, "La ruta ingresada es:" + req.originalUrl + "\n");
    /*En next hace que siga la ejeccion y no se quede en este modulo */
    next();
}

module.exports = logs;