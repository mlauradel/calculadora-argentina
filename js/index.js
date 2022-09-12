const inputPrecio = document.getElementById("precio");
const boton = document.getElementById("calcular");
const boton2 = document.getElementById("mostrarHistorial");
const dropdown = document.getElementById("impuestos");
const div = document.getElementById("contenedor_tabla");
const tabla = document.getElementById("tabla_resultados");
const trImporte = document.getElementById("importe");
const tdInicial = document.getElementById("resultado_inicial");
const tdImporte = document.getElementById("resultado_importe");
const tdFinal = document.getElementById("resultado_final");
const div2 = document.getElementById("historial");
let precio;
let impuestoSelec;
let resultado;

let opcionesAgregar;


class Impuestos {
    constructor(nombre, importe) {
        this.nombre = nombre;
        this.importe = importe;
    }
}

const impuestoIva = new Impuestos("IVA", 21);
const impuestoIvaRed = new Impuestos("IVA Reducido", 10.5);
const nuevoImpuestoPais = new Impuestos("Nuevo Impuesto País", 30);
const gananciasDolarTarj = new Impuestos("Dólar Tarjeta", 45);
let nuevoImpuesto = '';

let impuestos = [impuestoIva, impuestoIvaRed, nuevoImpuestoPais, gananciasDolarTarj];

//crea desde que abrimos la página la lista de impuestos predefinidos
let opcion;
function crearLista() {
    for (const impuesto of impuestos) {
        opcion = document.createElement("option")
        opcion.value = impuesto.importe;
        opcion.innerText = `${impuesto.nombre} - ${impuesto.importe}`;
        dropdown.appendChild(opcion);
    }
}
crearLista();


// para evitar q ingresemos valores vacíos o NaN en el input
let enabled = false;
const intervaloEnabled = setInterval(enableBtn, 300)

function enableBtn() {
    if(enabled === true){
        boton.removeAttribute('disabled');
        clearInterval(intervaloEnabled);
        return;
    }
};


//escuchamos el input donde ingresamos el valor
inputPrecio.addEventListener("input", actualizarValor);
function actualizarValor(e){
    precio = (parseInt(e.srcElement.value) || 0);
    enabled = true;
}

//escuchamos el botón de Calcular y mostramos los resultados en pantalla + guardamos en session
let historial = [];

boton.addEventListener('click', e => {
    
    impuestoSelec = dropdown.value;
    
    tdInicial.innerText = precio.toFixed(2);
    trImporte.innerText = `Ìmporte del ${dropdown.value} %`;
    tdImporte.innerText = calcularImporte(precio, impuestoSelec).toFixed(2);
    tdFinal.innerText = calcularPrecioFin(precio, impuestoSelec).toFixed(2);

    tabla.classList.remove("hidden");

    let resulH = new Resultado(precio, calcularImporte(precio, impuestoSelec).toFixed(2), calcularPrecioFin(precio, impuestoSelec).toFixed(2));
    if (historial.length > 4) {
        historial.pop();
        historial.unshift(resulH);
        console.log(historial);
        sessionStorage.setItem("resultado", JSON.stringify(historial));
    } else {
        historial.unshift(resulH);
        console.log(historial);
        sessionStorage.setItem("resultado", JSON.stringify(historial));
    }

});

class Resultado {
    constructor(precio, importe, precioFinal) {
        this.precio = precio,
        this.importe = importe,
        this.precioFinal = precioFinal;
    }
}



const tablaHistorial = document.getElementById("tabla_historial");
const tbody = document.getElementById("tbody");

boton2.addEventListener('click', e => actualizarHistorial())



function actualizarHistorial() {
    if(tablaHistorial.classList.contains("hidden")) {
        tablaHistorial.classList.remove("hidden");
        const thH_importe = document.createElement("th");
        thH_importe.innerText = "Importe";
        const thH_precio = document.createElement("th");
        thH_precio.innerText = "Precio Inicial"
        const thH_precioFinal = document.createElement("th");
        thH_precioFinal.innerText = "Precio Final"

        const thRow = document.createElement("tr");
        thRow.appendChild(thH_precio)
        thRow.appendChild(thH_importe)
        thRow.appendChild(thH_precioFinal)

        tbody.appendChild(thRow);

        let storedResultados = JSON.parse(sessionStorage.getItem("resultado"));    
            for (const resultado of storedResultados) {
            console.log(resultado);

            const newRow = document.createElement("tr");     
            const td1 = document.createElement("td");
            td1.innerText = `${resultado.precio}`;
            const td2 = document.createElement("td");
            td2.innerText = `${resultado.importe}`;
            const td3 = document.createElement("td");
            td3.innerText = `${resultado.precioFinal}`;

            thH_precio.appendChild(td1);
            thH_importe.appendChild(td2);
            thH_precioFinal.appendChild(td3);

            newRow.appendChild(td1);
            newRow.appendChild(td2);
            newRow.appendChild(td3);

            tbody.appendChild(newRow);
        }
    } else {
        tablaHistorial.classList.add("hidden");

        tbody.innerHTML = '';
    }
}





//calcula los resultados
function calcularPrecioFin(precio, impuesto) {
    return ( calcularImporte(precio, impuesto) + parseInt(precio) );    
}

function calcularImporte(precio, impuesto){
    return precio * (impuesto * 0.01);
}