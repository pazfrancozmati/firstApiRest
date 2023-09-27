/*Esta funcion valida que un string sea menor de 15 caracteres, no tenga caracteres especiales ni tenga numeros*/
/*Retorna verdadero solo si cumple los requisitos */
const caracteresEspeciales = ['!', '"', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '¡', '+', '-', '*', '{', '}', '[', ']', '.', ',', ';', '<', '>', ':', '-', '_', '^'];
const fromZeroToTen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function categoryValidator(str) {

    if (!str.length > 15) {
        return false;
    }
    for (const caracter of caracteresEspeciales) {
        if (str.includes(caracter)) {
            return false;
        }
    }
    for (const numero of fromZeroToTen) {
        if (str.includes(numero)) {
            return false;
        }
    }
    return true;
}
module.exports = categoryValidator;