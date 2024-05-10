

// Clase DE LOS DATOS INGRESADOS
class DatosIngresados {

  constructor(numeroingresado,plazoingresado,ingresomensual)
  { 
    this.montocredito = numeroingresado;
    this.plazocredito = plazoingresado;
    this.ingresomensual = ingresomensual;
 }
 
  controlarDatosIngresados(plazoingresado,ingresomensual) {
    
                //control ingresomensual
            if (ingresomensual <= 0 || ingresomensual === 0) { 
            return  alert("El ingreso neto mensual tipeado es incorrecto");
            }

            //control plazo ingresado
            if ( plazoingresado <= 0 || plazoingresado === 0 || plazoingresado < 12) {
            return  alert("El plazo ingresado es incorrecto. Debe ser un valor mayor a 0 y minimo 12 meses");
            }

 }

    

}





//funcion abstracta para calcular Datos Prestamo
 function calcularDatosPrestamo(plazoingresadocalculointeres) {

        //declaro variable interes global para usar en la funcion final
        let interescalculo = 0;

        //switch para controlar los meses y porcentaje de interes
        switch (plazoingresadocalculointeres > 0) {
            case plazoingresadocalculointeres <= 12:
                interescalculo = 79;
                break;

                case plazoingresadocalculointeres >= 13 && plazoingresadocalculointeres <= 24:
                    interescalculo = 110;
                    break;

                    case plazoingresadocalculointeres >= 25 && plazoingresadocalculointeres <=45:
                    interescalculo = 138;
                    break;   

            default:
                interescalculo = 178;
                break;
        }

    return interescalculo;

}



//funcion para calcular el monto de aprobacion
function calcularaprobaacionmonto(ingresomensualcalcular) {

let montoprestamo = 0;

switch (ingresomensualcalcular > 0) {
    case ingresomensualcalcular <= 300000:
      return montoprestamo = 0;
        break;

        case ingresomensualcalcular > 300000 && ingresomensualcalcular <= 500000:
      return  montoprestamo =  350000;
            break;

            case ingresomensualcalcular > 500000 && ingresomensualcalcular <=750000:
            return    montoprestamo = 600000;
            break;   

    default:
      return  montoprestamo = 1500000;
        break;

     
}


}



//function para calcular las cuotas del prestamo
function calculacuotasprestamos (monto,plazo,interes) {

//controlo monto = 0 en base a la funcion de calculo
if (monto === 0) {

    let parrafo = document.createElement("p")
    parrafo.innerHTML = "<h2> En base a los calculos no posee una capacidad crediticia confiable </h2>"; 
    document.body.append(parrafo);

  //alert("En base a los calculos no posee una capacidad crediticia confiable");
return;
}

//inicializo variables

let salirwhile = 1;
let montocapital = 0;
let montoiva = 0;
let totalcuota=0;
let interesxcuota=0;
let iva = 21;

//calculo interes por cuota y el monto capital
interesxcuota = interes / plazo;
montocapital = monto / plazo;

// imprimo el monto que se aprueb en base a los ingresos mensules.


 // (` <br> El monto solicitado no cumple los requisitos. Para el ingreso mensual el monto del prestamos es: ${monto}  </br>` );

//arranca el bucle para imprimir el detalle de las cuotas
for (let i = plazo; i >= salirwhile ; salirwhile++) {

    // extraer los datos para la fecha arrancando del dia que hacemos el calculo

    //esto no me funciona bien. No me corta los meses y demas.
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + salirwhile
    let year = date.getFullYear()

    let FechaVencimiento = (`${day}-0${month}-${year}`);

     
    //calculo el total de iva y de cuota
    totaliva =  (montocapital*iva)/100; 
    totalcuota = (montocapital + ((montocapital*interesxcuota)/100))+totaliva;

    

    //imprimo detalle
    function imprimirDetalle() {
      // Creamos un nuevo elemento div
      var nuevoDiv = document.createElement("p");
      
      // Agregamos algún contenido al nuevo div
      nuevoDiv.innerHTML = (` <br> Cuota ${salirwhile}: | Monto Capital: ${montocapital} || Iva: ${totaliva} || Monto Total Cuota: ${totalcuota} || Fecha Vencimiento Cuota: ${FechaVencimiento}  </br>` );;
      nuevoDiv.id = "divNuevo";
     // Obtenemos el contenedor donde queremos agregar el nuevo párrafo
      const contenedor = document.getElementById("imprimeDetalle");
      contenedor.appendChild(nuevoDiv);

  
    }
    imprimirDetalle();
    
   
}

return;    

}



//obtengo el id del boton para ejecutar el evento
const botonProcesarCredito = document.getElementById("botonProcesar");

botonProcesarCredito.onclick = () => {
  
  let numeroingresado = document.getElementById("monto").value;
  let plazoingresado = document.getElementById("plazoIngresado").value;
  let ingresomensual = document.getElementById("ingresoFamiliar").value;
  
  

  //creo un array con los datos ingresados
  let datosIngresaPersona = []

  datosIngresaPersona.push(plazoingresado,ingresomensual);


  const instanciaobjetodatosingresados = new DatosIngresados(numeroingresado, plazoingresado,ingresomensual);
  //console.log(instanciaobjetodatosingresados);

  // Convertimos el objeto a una cadena JSON
let datosIngresadoJSON = JSON.stringify(instanciaobjetodatosingresados);

// Guardamos la cadena JSON en sessionStorage
sessionStorage.setItem('datosingresados', datosIngresadoJSON);

//controlo el array si los datos ingresados son correctos.
for (let i=0; i<=datosIngresaPersona.length-1; i++) {
   
  const controlaDatosIngresados = new DatosIngresados();
  
  //obtengo el json de la session storage
  let sessionStorageRecuperada = sessionStorage.getItem('datosingresados');
  

//parseo de json a objeto
  let jsonSessionStorage = JSON.parse(sessionStorageRecuperada);



  //aisgno a variables los datos del objeto de memoria
  let plazo = jsonSessionStorage.plazocredito;
  let ingreso = jsonSessionStorage.ingresomensual;
  
  //paso valores desestructurados
  controlaDatosIngresados.controlarDatosIngresados(plazo,ingreso);
  
  
  //controlaDatosIngresados.controlarDatosIngresados(datosIngresaPersona[0],datosIngresaPersona[1]);
 
}


//calculo interes. creo objeto de clase simular credito y paso objeto de datos ingresados.
const interescalculo = calcularDatosPrestamo(instanciaobjetodatosingresados.plazocredito);
console.log(interescalculo)

//constante que almacena los datos procesados por dicha funcion con abstraccion y uso de objetos.
const   montoprobacion = calcularaprobaacionmonto(instanciaobjetodatosingresados.ingresomensual);
console.log(montoprobacion)


//llamada a la funcion principal con obstraccion y uso de objetos.

calculacuotasprestamos(montoprobacion,instanciaobjetodatosingresados.plazocredito,interescalculo);

};





