/*Requiero mongoose luego de instalarlo -- npm i mongoose */
const mongoose = require('mongoose');

/*Creo mi  estructura schema (constructor de modelo)*/
const productSchema = new mongoose.Schema({
    /*type: tipo de dato, require: si es obligatorio o no */

    /*UN ARREGLO  DE COMENTARIOS ASI SE DEFINIRIA, muchos comentarios*/
    /*  comment: [{body: String, date: Date}] */
    /*fecha en la que se cargo el producto, o fecha de la ultima vez que se actualizo, SE CREA AUTOMATICAMENTE SIN PASARLO */
    updated: {
        type: Date,
        default: Date.now,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Boolean,
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    }

    /*Image es un arreglo de strings obligatorio */
    /*
    image: {
        type: [{ name: String }],
        required: true
    }
    */
}
    //,{timestamps:true,collation:"products" //en caso asociar el esquema a una DB de nombre distinto aca se pone el nombre de la db(reemplazando a "products")}

);
/*La constante Product es el modelo, primer parametro es un string con el nombre del modelo("Product"), el segundo parametro es el schema*/
const Product = mongoose.model("Product", productSchema);//conecta con la DB products(pasa a minuscula y agrega s automaticamente a "Product")

module.exports = Product;