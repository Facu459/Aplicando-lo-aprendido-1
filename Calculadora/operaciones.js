let suma = (a, b) => console.log ("Resultado =", a + b); 
let resta = (a, b) => console.log ("Resultado =", a - b);
let multiplicacion = (a, b) => console.log ("Resultado =", a * b);
let division = (a, b) => {
    if (b === 0) {
        console.log("Error: División por cero no permitida.");  
    } else {
        console.log ("Resultado =", a / b);
    }
}
export {suma, resta, multiplicacion, division};
