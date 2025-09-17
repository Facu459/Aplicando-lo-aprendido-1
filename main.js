import promptSync from 'prompt-sync';
import { suma, resta, multiplicacion, division } from './operaciones.js';

const prompt = promptSync();

let a = parseFloat(prompt("Ingrese el primer número: "));
let b = parseFloat(prompt("Ingrese el segundo número: "));

function main() {
    console.log("Seleccione la operación que desea realizar:");
    console.log("1. Suma");
    console.log("2. Resta");
    console.log("3. Multiplicación");
    console.log("4. División");
    let operacion = prompt("Ingrese el número de la operación (1-4): ");

    switch(operacion) {
        case '1': suma(a, b); break;
        case '2': resta(a, b); break;
        case '3': multiplicacion(a, b); break;
        case '4': division(a, b); break;
        default: console.log("Operación no válida.");
    }
}

main();

