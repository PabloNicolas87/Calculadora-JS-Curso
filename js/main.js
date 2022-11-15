import {operaciones} from "./funcionConstructoraObjeto.js";
import {borrar, resetear, resolver} from "./funciones.js";
import {resultadoFinal} from "./funciones.js";

//Declaración de Variables
export var num1 = '';
export var num2 = '';
export var operacion = '';

//Declaracion de Array vacío
var historial = [];


//Capturo los eventos del DOM
window.onload = function eventos() {
  document.getElementById('uno').onclick = function(){
    document.getElementById('resultado').textContent = "1";
  }

  document.getElementById('dos').onclick = function(){
    document.getElementById('resultado').textContent = "2";
  }

  document.getElementById('tres').onclick = function(){
    document.getElementById('resultado').textContent = "3";
  }

  document.getElementById('cuatro').onclick = function(){
    document.getElementById('resultado').textContent = "4";
  }

  document.getElementById('cinco').onclick = function(){
    document.getElementById('resultado').textContent = "5";
  }

  document.getElementById('seis').onclick = function(){
    document.getElementById('resultado').textContent = "6";
  }

  document.getElementById('siete').onclick = function(){
    document.getElementById('resultado').textContent = "7";
  }

  document.getElementById('ocho').onclick = function(){
    document.getElementById('resultado').textContent = "8";
  }

  document.getElementById('nueve').onclick = function(){
    document.getElementById('resultado').textContent = "9";
  }

  document.getElementById('cero').onclick = function(){
    document.getElementById('resultado').textContent = "0";
  }

  document.getElementById('limpiar').onclick = function(){
    resetear();
  }

  document.getElementById('suma').onclick = function(){
    num1 = document.getElementById('resultado').textContent;
    operacion = "suma";
    borrar();
  }

  document.getElementById('resta').onclick = function(){
    num1 = document.getElementById('resultado').textContent;
    operacion = "resta";
    borrar();
  }

  document.getElementById('multiplicacion').onclick = function(){
    num1 = document.getElementById('resultado').textContent;
    operacion = "multiplicacion";
    borrar();
  }

  document.getElementById('division').onclick = function(){
    num1 = document.getElementById('resultado').textContent;
    operacion = "division";
    borrar();
  }

  document.getElementById('borrar').onclick = function(){
    borrar();
  }

  document.getElementById('igual').onclick = function(){
    num2 = document.getElementById('resultado').textContent;
    resolver();
    
    //creacion de un nuevo objeto
    var res = new operaciones(operacion, num1, num2, resultadoFinal);
    //coloco el objeto en el array
    historial.push(res);
    //Guardar en el localstorage
    localStorage.setItem('obj', JSON.stringify(historial));
  }

  //imprimo por html los objetos que guarde en el LocalStorage
  document.getElementById('verHistorial').onclick = function(){
    //Recupero el localstorage
    var nuevoObjeto = JSON.parse( localStorage.getItem('obj') );
    //Condicional y Sweet Alert
    if(nuevoObjeto === null) 
      Swal.fire("No hay operaciones recientes")
    else {
      let encabezado = '<tr><th>Tipo de Operación</th>&nbsp;<th>1er Número</th>&nbsp;<th>2do Número</th>&nbsp;<th>Resultado</th></tr>';
      var html="";
      nuevoObjeto.forEach( (item) => {
        html += '<tr><td>' + item["tipo"] + '</td><td>'+ item["primernumero"] +'</td><td>' + item["segundonumero"] + '</td><td>'  + item["resultado"] + '</td></td>';
        Swal.fire("<table style='width:100%'>" + encabezado + html  + "</table>");
      });
    }
  }

  //Borro el historial en el LocalStorage y vacío el Array
  document.getElementById('borrarHistorial').onclick = function(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro que deseas borrar el historial?',
      text: "Si borras el historial perderás los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar Historial!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //Vacío el array de objetos
        historial = [];
        //Borro el LocalStorage
        localStorage.clear();
        swalWithBootstrapButtons.fire(
          'Historial borrado!',
          'Su Historial ha sido borrado.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Acción cancelada',
          'El historial no será borrado :)',
          'error'
        )
      }
    })
  }

  //Utilizo una API propia que envía un mail con el contenido del historial
  document.getElementById('enviarHistorial').onclick = function(){
    if(localStorage.length > 0){
      Swal.fire({
        title: 'Desea enviar el Historial por correo?',
        html:
          '<input type="email" name="email" id="email" placeholder="ingrese su correo"> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<a id="enviar">Enviar</a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<a id="enviar">Cancelar</a>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    }
    else {
      Swal.fire('No se puede enviar el mail, porque no hay operaciones guardadas en el Historial')
    }

      //Utilizo Fetch al clickear en el botón ENVIAR
      document.getElementById('enviar').onclick = function(){      
        if(document.getElementById("email").value == '') {
          Swal.fire('Por Favor, ingrese su E-Mail!')
        }
        else {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          var raw = JSON.stringify({
          "data": JSON.parse( localStorage.getItem('obj') ),
          "email": document.getElementById('email').value
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch("https://dev.onlyescort.es/api/v2/contacto", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
      }
    
    
  }
}



