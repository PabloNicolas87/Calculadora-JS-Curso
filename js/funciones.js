import {operacion, num1, num2} from "./main.js";

var resultadoFinal = 0;

//Funciones
function borrar(){
document.getElementById('resultado').textContent = "";
}

function resetear(){
document.getElementById('resultado').textContent = "";
num1 = 0;
num2 = 0;
operacion = "";
}

function resolver(){
    switch(operacion){
        case "suma":
            resultadoFinal = parseInt(num1) + parseInt(num2);
            break;
        case "resta":
            resultadoFinal = parseInt(num1) - parseInt(num2);
            break;
        case "multiplicacion":
            resultadoFinal = parseInt(num1) * parseInt(num2);
            break;
        case "division":
            resultadoFinal = parseInt(num1) / parseInt(num2);
            break;
    }
    document.getElementById('resultado').textContent = resultadoFinal;
}


export {borrar, resetear, resolver};
export {resultadoFinal};