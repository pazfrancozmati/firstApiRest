/*Esta funcion valida que un string sea menor de 40 caracteres y no tenga caracteres especiales*/
/*Retorna verdadero solo si cumple los requisitos */
const caracteresEspeciales = ['!', '"', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '¡', '+', '-', '*', '{', '}', '[', ']', '.', ',', ';', '<', '>', ':', '-', '_', '^'];
const fromZeroToTen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function nameValidator(str) {

    if (!str.length > 40) {
        return false;
    }

    for (const caracter of caracteresEspeciales) {
        if (str.includes(caracter)) {
            return false;
        }
    }
    return true;
}
module.exports = nameValidator;
