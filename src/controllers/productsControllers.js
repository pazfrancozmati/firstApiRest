/*Modulo que uso para obtener la ruta*/
const path = require("path");
//Guardo fileSistem para manejar archivos
const fs = require("fs");
/*------------------------------------------------------------------------ */

/*Requiero el modelo de Product */
const Product = require("../database/models/Product.js");
/*Importo validador de nombre del producto */
const productNameValidator = require("../utils/productNameValidator.js");
/*Importo validador de categoria del producto */
const productCategoryValidator = require("../utils/productCategoryValidator.js");
/*Importo modulo que elimina imagenes */
const delateImageByName = require("../utils/delateImageUploadedByMistake.js");


const controller = {
    /*creae producto es un metodo ascincronico */
    createProduct: async (req, res) => {
        /*Intento crear el producto*/
        try {
            /*Si el nombre del producto es definido */
            if (req.body.name !== undefined) {
                /*Si el nombre del producto es valido */
                if (productNameValidator(req.body.name)) {
                    /*Si la categoria del producto es definida */
                    if (req.body.category !== undefined) {
                        /*Si la categoria del producto es valida */
                        if (productCategoryValidator(req.body.category)) {
                            /*Si la imagen del producto esta definida */
                            if (req.file !== undefined) {
                                /*CARGO EL PRODUCTO */
                                let newProduct = {
                                    /*Guardo el atributo name que me viene en el body en el campo name de mi objeto vacio*/
                                    name: req.body.name,
                                    price: req.body.price,
                                    description: req.body.description,
                                    discount: req.body.discount,
                                    discountAmount: req.body.discountAmount,
                                    category: req.body.category,
                                    /*Agrego el nombre de la imagen, es un arreglo*/
                                    image: [req.file.filename]
                                }
                                /*Guardo en en una constante, una instancia del producto creado */
                                const newProductInDb = await Product.create(newProduct);
                                /*Envio un codigo 201 de respuesta como que se creeo el recurso y el producto creado */
                                res.status(201).json(newProductInDb);
                            } else {/*Si la imagen es indefinida: Genero Error por imagen*/
                                const miError = new Error('Errror generado por no estar cargada la imagen del producto.');
                                miError.errors = { image: 'Ingrese la imagen del producto.' };
                                throw miError;
                            }
                        } else {/*Si la caregoria de producto no cumple con los requisitos*/
                            /*Elimino la imagen que se cargo de manera indebida*/
                            delateImageByName(req.file.filename);
                            /*Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida. */
                            return res.status(400).json({ message: "Categoria de producto invalida, maximo 15 caracteres sin caracteres especiales ni numeros" });
                        }
                    } else {/*Si la categoria es indefinida*/
                        const miError = new Error('Errror generado por no estar completo el campo categoria de producto');
                        miError.errors = { category: 'Complete el campo categoria de producto' };
                        throw miError;
                    }
                } else {/*Si el nombre de producto no cumple con los requisitos*/
                    /*Elimino la imagen debido a que NO  se va a cargar el producto */
                    delateImageByName(req.file.filename);
                    /*Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida. */
                    return res.status(400).json({ message: "Nombre de producto invalido, maximo 40 caracteres sin caracteres especiales" });
                }
            } else {
                /*Genero error por nombre indefinido */
                const miError = new Error('Errror generado por no estar completo el campo nombre de producto');
                miError.errors = { name: 'Complete el campo nombre de producto' };
                throw miError;
            }

        }
        /*Si hay errores los capto*/
        catch (error) {
            if (error.errors.name)/*Si existe el error por falta de nombre */ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo nombre de producto es obligatorio, ingreselo" });
            }
            if (error.errors.category)/*Si existe el error por falta de categoria */ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo categoria de producto es obligatorio, ingreselo" });
            }
            if (error.errors.description)/*Si existe el error por falta de descripcion */ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo descripcion de producto es obligatorio, ingreselo" });
            }
            if (error.errors.discount)/*Si existe el error por falta de descuento */ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo descuento de producto es obligatorio, ingreselo" });
            }
            if (error.errors.discountAmount)/*Si existe el error por falta de monto de descuento*/ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo descuento de producto es obligatorio, ingreselo" });
            }
            if (error.errors.price)/*Si existe el error por falta de precio */ {
                /*Elimino la imagen que se cargo de manera indebida*/
                /*Ej de error cuando el usuario no paso el campo nombre que es obligatorio*/
                delateImageByName(req.file.filename);

                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "El campo precio de producto es obligatorio, ingreselo" });
            }
            if (error.errors.image)/*Si existe el error por falta de nombre */ {
                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "Cargar una imagen es obligatorio, ingresela" });
            }
            /*Internal server error -- Un error del servidor(si no es un error del llenado de campos)*/
            res.status(500).json({ message: "Error interno del servidor" });
        }
    },
    /*Controlador de listar productos */
    /*Metodo async, ascincronico */
    list: async (req, res) => {
        /* en la constante product almaceno  la respuesta a la consulta(con await espero) que realizo a la base de datos */
        const product = await Product.find({});
        /*Envio  a req la respuesta con mi constante de los productos */
        if (product.length === 0) {
            res.status(200).json({ message: "La lista de productos es vacia, cree productos para poder listarlos." });
        } else {
            res.status(200).json(product);
        }
    },

    searchByName: async (req, res) => {
        try { /* en la constante product almaceno  la respuesta a la consulta(con await espero) que realizo a la base de datos busco por nombre */
            const product = await Product.find({ name: req.params.name });
            /*Si no encontre el nombre del producto, error 400 del usuario el producto ingresado no existe*/
            if (product.length === 0) {
                res.status(400).json({ message: "El nombre de producto elegido es inexistente" });
            } else {
                /*Si el producto existe lo imprimo. */
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    },

    /*SIEMPRE QUE SE ACCEDA A LA BASE DE DATOS ES BUENO USAR ASYNC CON TRY Y CATCH */
    updateProduct: async (req, res) => {
        /*Si el nombre esta definido. */
        if (req.body.name !== undefined) {
            /*Chequeo que el nombre del producto sea de maximo 40 caracteres sin caracteres especiales ni numeros */
            if (!productNameValidator(req.body.name)) {
                return res.status(500).json({ message: "Nombre de producto invalido, maximo 40 caracteres sin caracteres especiales" });
            }
        }
        /*Si la categoria del producto esta definida. */
        if (req.body.category !== undefined) {
            /*Chequeo que la categoria del producto sea de maximo 15 caracteres sin caracteres especiales ni numeros */
            if (!productCategoryValidator(req.body.category)) {
                return res.status(500).json({ message: "Categoria de producto invalida, maximo 15 caracteres sin caracteres especiales ni numeros" });
            }
        }
        /*Busco por id si mi producto existe */
        const productoConsultado = await Product.findById(req.params.id);
        /*Si el producto buscado no existe */
        if (productoConsultado === null) {
            /* Elimino la imagen que se guardo en la base de datos */
            /*Me guardo el nombre de la imagen a la que voy a eliminar */
            let nombreDeLaImagen = req.file.filename;
            /*Creo la ruta donde esta la imagen a la que voy a borrar */
            const archivoAEliminar = path.join(__dirname, "../../public/images/products", nombreDeLaImagen);
            /*Elimino la imagen */
            fs.unlink(archivoAEliminar, (err) => {
                if (err) { "Se intento eliminar una imagen de manera fallida" } else { "se elimino la imagen correctamente" }
            });
            /*Identificador de producto invalido, con codigo 500 error del usuario */
            return res.status(400).json({ message: "El ID de producto ingresado es inexistente por lo tanto no se puede actulizar" });
        }

        /*Si mi producto si existe*/else {
            /*Si mi imagen ingresada es vacia, no elimino la actual */
            if (!req.file || req.file.size === 0) {
                /*Creo un producto sin la imagen */
                let product = {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    discount: req.body.discount,
                    discountAmount: req.body.discountAmount,
                    category: req.body.category
                }
                /*Reescribo en DB el producto con el id que viene por parametro(primer parametro) y mi producto creado sin la imagen(segundo parametro)*/
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
                /*Devuelvo el producto que recargue en la base de datos con un codigo 200 como que esta todo ok*/
                return res.status(200).json(updatedProduct);
            }
            /*Si me ingresan una imagen, elimino la imagen actual y creo un producto completo(con imagen) */
            else {
                /*Me guardo el nombre de la imagen a la que voy a eliminar */
                let nombreDeLaImagen = productoConsultado.image[0];
                /*Creo la ruta donde esta la imagen a la que voy a borrar */
                const archivoAEliminar = path.join(__dirname, "../../public/images/products", nombreDeLaImagen);
                /*Elimino la imagen */
                fs.unlink(archivoAEliminar, (err) => {
                    if (err) { "Se intento eliminar una imagen de manera fallida" } else { "se elimino la imagen correctamente" }
                });
                /*Creo el producto a actualizar(con la imagen), los campos que no se ingresan se mantienen igual */
                let product = {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    discount: req.body.discount,
                    discountAmount: req.body.discountAmount,
                    category: req.body.category,
                    /*Agrego el nombre de la imagen, es un arreglo*/
                    image: [req.file.filename]
                }
                /*Reescribo en DB el producto con el id que viene por parametro(primer parametro) y mi producto creado con la imagen(segundo parametro)*/
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
                /*Devuelvo el producto que recargue en la base de datos con un codigo 200 como que esta todo ok*/
                return res.status(200).json(updatedProduct);
            }
        }
    },
    /*Controlador de busca productos por Id*/
    /*Metodo async, ascincronico */
    searchById: async (req, res) => {
        try {
            /*Si el id que consulto tiene exactamente 24 caracteres*/
            if (req.params.id.length === 24) {
                /* en la constante product almaceno  la respuesta a la consulta(con await espero) que realizo a la base de datos, _id es el campo de la DB */
                const product = await Product.findById(req.params.id);
                /*Envio  a req la respuesta con mi constante del producto */
                if (!product) {
                    return res.status(404).json({ message: `El producto con ID ${req.params.id} no esta cargado en la Base de Datos` });
                } else {
                    return res.status(200).json(product);
                }
            } else {
                /*Genero error por nombre indefinido */
                const miError = new Error('Errror generado ya que el id ingresado tiene la cantidad de caracteres incompatibles');
                miError.errors = { numberOfIdCharacters: 'El campo id debe tener 12 caracteres' };
                throw miError;
            }
        } catch (error) {
            if (error.errors.numberOfIdCharacters)/*Si existe el error por falta de nombre */ {
                /*Usar return para que se corte la ejecicion y no mande el error 500 que esta abajo */
                /*envio codigo 400 que es error del usuario, con mensaje apropiado */
                return res.status(400).json({ message: "Ingrese un ID con 12 caracteres." });
            }
            /*Internal server error -- Un error del servidor(si no es un error del ID)*/
            res.status(500).json({ message: "Error interno del servidor" });
        }

    },

    /*Controlador que elimina productos por Id*/
    /*Metodo async, ascincronico */
    delateById: async (req, res) => {
        try {
            const id = req.query.id;
            /*Busco por id si mi producto existe */
            const productoConsultado = await Product.findById(id);
            if (productoConsultado == null) {
                return res.status(400).json({ message: "El ID de producto ingresado es inexistente" });
            } else {
                /*elimino la imagen */
                /*Me guardo el nombre de la imagen a la que voy a eliminar */
                let nombreDeLaImagen = productoConsultado.image[0];
                /*Creo la ruta donde esta la imagen a la que voy a borrar */
                const archivoAEliminar = path.join(__dirname, "../../public/images/products", nombreDeLaImagen);
                /*Elimino la imagen*/
                fs.unlink(archivoAEliminar, (err) => {
                    if (err) { "Se intento eliminar una imagen de manera fallida" } else { "se elimino la imagen correctamente" }
                });
                /*Fin de eliminar la imagen*/

                /*Elimino de la db el producto*/
                const del = await Product.findByIdAndDelete(id);
                return res.status(200).json(del);

            }

        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor, ID de producto ingresado con formato inadecuado y no existe" });
        }
    }
    ,
}
module.exports = controller;