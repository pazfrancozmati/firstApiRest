/*Modulo que uso para obtener la ruta*/
const path = require("path");
/*Obtengo la ruta de mi archivo JSON, la ruta es absoluta*/
const rutaProductsJSON = path.resolve(__dirname, "../data/products.json");
/*const RELATIVAdirProductsJSON = path.join(_dirname, "../data/products.json");  
aca la direccion es RELATIVA, respecto DONDE ESTOY AHORA
*/
/*------------------------------------------------------------------------ */
const fs = require("fs");
/* Leeo el archivo que esta en la ruta que tengo y luego lo guardo en una variable, 
todavia en su formato original, JSON. 
Primero la ruta y luego el encoding que es utf8 caracteres que usamos(ñ, tildes etc)*/
const productsJson = fs.readFileSync(rutaProductsJSON, { encoding: "utf-8" });
/* convierto archivo con productos json a un arreglo de JavaScript */
let productsJS = JSON.parse(productsJson);


const controller = {
    list: (req, res) => {
        res.send(productsJS);
    },
    searchById: (req, res) => {
        let id = +req.params.id; /*parseo el id(con el +), de un string se convierte en numero*/
        let productRequestedById = productsJS.find(product => product.id == id)
        res.send(productRequestedById);
    },
    searchByName: (req, res) => {
        let name = req.params.name;
        let productRequestedByName = productsJS.find(product => product.name == name)
        res.send(productRequestedByName);
    },
    createProduct: (req, res) => {
        /*Creo un producto vacio */
        let newProduct = {};
        /*Campo nombre obligatorio */
        /*Si el nombre del producto viene indefinido entra */
        /* !req.body.name  es lo mismo que (req.body.name = undefined) */
        if (!req.body.name) {
            return res.json({ msg: "El campo name es requerido" });
        }
        /*Guardo el atributo name que me viene en el body en el campo name de mi objeto vacio*/
        newProduct.name = req.body.name;
        newProduct.price = req.body.description;
        newProduct.image = req.body.image;
        /*Creo el numero del id que le corresponde, ya que no viene en mi req*/
        newProduct.id = productsJS.length + 1;
        /*Se agrega el nuevo producto al arreglo de JS */
        productsJS.push(newProduct);
        /* convierto el arreglo de JS A JSON */
        /* tiene 3 parametros en la ultima parte, null y 4, el ultimo 4 es para que el json no se almacene en una sola linea */
        let productsConNuevoProductJson = JSON.stringify(productsJS, null, 4);
        /*Sobre escribo mi archivo de base de datos con el nuevo archovo json */
        /* */
        fs.writeFileSync(rutaProductsJSON, productsConNuevoProductJson);
        /* Se devuelve el codigo 201 que indica que se creo un nuevo recurso, tambien retorno el nuevo producto */
        res.status(201).json(newProduct);
    }
}
module.exports = controller;