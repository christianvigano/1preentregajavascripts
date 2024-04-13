

//ingreso de valores para procesar

let numeroingresado = parseInt(prompt('Ingrese el monto que desea recibir')) ;
let plazoingresado = parseInt(prompt('Ingrese el plazo de devolucion del dinero'));
let ingresomensual = parseInt(prompt('Ingrese el ingreso mensual familiar'));


//control ingresomensual
 if (ingresomensual <= 0 || ingresomensual === 0) {
    alert("El ingreso neto mensual tipeado es incorrecto");
}

//control plazo ingresado
if ( plazoingresado <= 0 || plazoingresado === 0 || plazoingresado < 12) {
    alert("El plazo ingresado es incorrecto. Debe ser un valor mayor a 0 y minimo 12 meses");
}

//declaro variable interes global para usar en la funcion final
let interescalculo = 0;

//switch para controlar los meses y porcentaje de interes
switch (plazoingresado > 0) {
    case plazoingresado <= 12:
        interescalculo = 79;
        break;

        case plazoingresado >= 13 && plazoingresado <= 24:
            interescalculo = 110;
            break;

            case plazoingresado >= 25 && plazoingresado <=45:
            interescalculo = 138;
            break;   

    default:
        interescalculo = 178;
        break;
}

//document.write(`El interes de calculo es: ${interescalculo}`);


//funcion para calcular el monto de aprobacion
function calcularaprobaacionmonto(ingresomensual) {

let montoprestamo = 0;

    switch (ingresomensual > 0) {
        case ingresomensual <= 300000:
          return montoprestamo = 0;
            break;
    
            case ingresomensual > 300000 && ingresomensual <= 500000:
          return  montoprestamo =  350000;
                break;
    
                case ingresomensual > 500000 && ingresomensual <=750000:
                return    montoprestamo = 600000;
                break;   
    
        default:
          return  montoprestamo = 1500000;
            break;

         
    }

    
}

//constante que almacena los datos procesados por dicha funcion.
const   montoprobacion = calcularaprobaacionmonto(ingresomensual);




//document.write(  ` <br> Monto prestamos aprobado: ${montoprobacion} </br>` );

//funcion para calcular las cuotas del prestamo
function calculacuotasprestamos (monto,plazo,interes) {

    //controlo monto = 0 en base a la funcion de calculo
if (monto === 0) {
    alert("En base a los calculos no posee una capacidad crediticia confiable");
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
    document.write (` <br> El monto solicitado no cumple los requisitos. Para el ingreso mensual el monto del prestamos es: ${monto}  </br>` );

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
        document.write (` <br> Cuota ${salirwhile}: | Monto Capital: ${montocapital} || Iva: ${totaliva} || Monto Total Cuota: ${totalcuota} || Fecha Vencimiento Cuota: ${FechaVencimiento}  </br>` );
        
       
    }

    return;    

}

// llamada a la funcion para calcular las cuotas
calculacuotasprestamos(montoprobacion,plazoingresado,interescalculo);