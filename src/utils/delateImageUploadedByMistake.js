/*Esta funcion sirve para eliminar las imagenes que carga storage en ocasiones donde no corresponden que se carguen
(Ej carga de productos con campos invalidos/ ausentes
Ej2 actualizacion de productos con campos invalidos)*/
/*Retorna un mensaje de que se elimino la imagen o otro mensaje donde no se pudo eliminar la imagen */

/*Modulo que uso para obtener la ruta*/
const path = require("path");
//Guardo fileSistem para manejar archivos
const fs = require("fs");

function delateImage(imageName) {

    /*Creo la ruta donde esta la imagen a la que voy a borrar */
    const archivoAEliminar = path.join(__dirname, "../../public/images/products", imageName);
    /*Elimino la imagen */
    fs.unlink(archivoAEliminar, (error) => {
        if (error) { return "Se intento eliminar una imagen de manera fallida" }
        else { return "se elimino la imagen correctamente" }
    });
}
module.exports = delateImage;