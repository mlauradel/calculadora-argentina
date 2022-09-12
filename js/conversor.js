
class Divisa{
    constructor(nombre, sigla) {
        this.nombre = nombre
        this.sigla = sigla     
    }
}

const pesoArgentino = new Divisa("Peso Argentino", "ARS");
const dolarUSA = new Divisa("Dólar Estadounidense", "USD");
const euro = new Divisa("Euro", "EUR");
const libra = new Divisa("Libra Esterlina", "GBP");
const yen = new Divisa("Yen", "JPY");
const yuan = new Divisa("Yuan Renminbi", "CNY");

let divisas = [pesoArgentino, dolarUSA, euro, libra, yen, yuan];


const dropdownDivisas = document.getElementById('dropdownDivisa1');
const dropdownDivisas2 = document.getElementById('dropdownDivisa2');

iniciarApp();

function iniciarApp(){
    crearListas()
}

function crearListas() {  // crear las 2 listas desplegables de divisas
    let opcionDivisas;
    let opcionDivisas2;

    for (const divisa of divisas) {
        opcionDivisas = document.createElement("option");
        opcionDivisas.setAttribute('value', divisa.sigla);

        opcionDivisas2 = document.createElement("option");
        opcionDivisas2.setAttribute('value', divisa.sigla);
        
        opcionDivisas.innerText = `${divisa.nombre}  -  ${divisa.sigla}`;
        opcionDivisas2.innerText = `${divisa.nombre}  -  ${divisa.sigla}`;

        dropdownDivisas.appendChild(opcionDivisas);
        dropdownDivisas2.appendChild(opcionDivisas2);

    }
}

// estas seran el value de las divisas seleccionadas
let divisa1;
let divisa2;
// estas seran el option tag de las divisas seleccionadas
let divisaSelec1;
let divisaSelec2;

// una especie de "verificacion" para habilitar el boton de calcular
// y evitar inputs vacios junto con el setInterval() de más abajo
let habilitarBtn1;
let habilitarBtn2;
let habilitarBtn3;

// guardamos el value del num q ingresemos
const inputNumero = document.getElementById("numero");
let numero;

inputNumero.addEventListener('input', actualizarNum)
function actualizarNum(e) {
    
    numero = (parseInt(e.target.value) || 0);;
    habilitarBtn3 = true;
}


// guardamos la divisa seleccionada en divisa1 y 2 

dropdownDivisas.addEventListener('input', divisaSeleccionada1)
function divisaSeleccionada1(e) {
    divisaSelec1 = e.target.options[e.target.selectedIndex];
    divisa1 = e.target.options[e.target.selectedIndex].value;
    habilitarBtn1 = true;
}

dropdownDivisas2.addEventListener('input', divisaSeleccionada2)
function divisaSeleccionada2(e) {
    divisaSelec2 = e.target.options[e.target.selectedIndex];
    divisa2 = e.target.options[e.target.selectedIndex].value;
    habilitarBtn2 = true;
}


/* para evitar ingresar valores vacios en los inputs la primera
vez q carga la página al hacer click en el botón, le añadí
la propiedad disabled la cual se la sacamos una vez se verifica
que todos los habilitarBtn1, 2 y 3 sean true. Luego detenemos el interval.
*/
const btnDivisas = document.getElementById("calcularMoneda");

const intervaloBtn = setInterval(habilitarBtn, 500)

function habilitarBtn() {
    if(habilitarBtn1 === true && habilitarBtn2 === true && habilitarBtn3 === true){
        btnDivisas.removeAttribute('disabled');
        clearInterval(intervaloBtn);
        return;
    }
};


// creamos el html para mostrar el resultado calculado
const resultadoDiv = document.getElementById("resultado-div")

const span = document.createElement("span");
const numeroTexto = document.createElement("p");
numeroTexto.classList.add("numeroDivisa");
const span2 = document.createElement("span");
const resultadoTexto = document.createElement("p");
resultadoTexto.classList.add("resultadoDivisa");

btnDivisas.addEventListener('click', e =>{
    fecthear(divisa1, divisa2); //calculamos la conversion

    
});


let converRate;
function fecthear(d1, d2){
    fetch(`https://v6.exchangerate-api.com/v6/d3da79e10c15e26d54869f32/latest/${d1}`)
    .then((res) => res.json())
    .then((data) => {
        converRate = data.conversion_rates[d2]
        calcular(numero, converRate);        
    })
    .catch((error) => console.log('Fetch Error', error));
}


function calcular(num, convR) {
    span.innerText = divisa1;
    span2.innerText = divisa2; //definimos los innerText de los elementos
    numeroTexto.innerText = `${numero} =`;
    resultadoTexto.innerText = (num * convR).toFixed(2);

    resultadoDiv.appendChild(span);
    resultadoDiv.appendChild(numeroTexto); //mostramos el resultado en el html
    resultadoDiv.appendChild(span2);
    resultadoDiv.appendChild(resultadoTexto);
}











