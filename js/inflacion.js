const inputValor1 = document.getElementById("valor1");
const inputValor2 = document.getElementById("valor2");

const inputMes1 = document.getElementById("fecha1_mes");
const inputMes2 = document.getElementById("fecha2_mes");

const inputYear1 = document.getElementById("fecha1_year");
const inputYear2 = document.getElementById("fecha2_year");

const btnInfla = document.getElementById("calcularInflacion");
const fieldset = document.getElementById("fieldset");



let valor1;
inputValor1.addEventListener('input', e => valor1 = parseInt(e.target.value) || 0);
let mes1;
inputMes1.addEventListener('input', e => mes1 = e.target.value);
let year1;
inputYear1.addEventListener('input', e => year1 = e.target.value);
let mes2;
inputMes2.addEventListener('input', e => mes2 = e.target.value);
let year2;
inputYear2.addEventListener('input', e => year2 = e.target.value);



const intervaloBtn = setInterval(habilitarBtn, 500)
function habilitarBtn() {    
    if( (mes1 && year1 && mes2 && year2 && valor1) !== undefined ){
        btnInfla.removeAttribute("disabled");           
        clearInterval(intervaloBtn);
        return;
    }
};



let fecha1;
let fecha2;

btnInfla.addEventListener('click', function(e) {
    fecha1 = `${year1}-${mes1}-01`;
    fecha2 = `${year2}-${mes2}-01`;

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    if (mes2 > currentMonth && year2 == currentYear){
        console.log("aaaaaa")
        Toastify({
            text: "¡Aún no tenemos los datos para esos meses ;) !",
            duration: 5000,
            gravity: 'bottom',
            style: {
                background: 'linear-gradient(to right, #e31e1e, #d10434)'
            }
        }).showToast(); 
        return;
    }

    if (fecha1 < fecha2) {
        fetchear(fecha1, fecha2, valor1);    
    }else {
        Toastify({
            text: "¡La fecha final no puede ser anterior o igual a la inicial!",
            duration: 5000,
            gravity: 'bottom',
            style: {
                background: 'linear-gradient(to right, #e31e1e, #d10434)'
            }
        }).showToast();        
    }
});


// fetchear los datos de inflación
function fetchear(fecha1, fecha2, precio){
    fetch ('https://apis.datos.gob.ar/series/api/series/?ids=145.3_INGNACUAL_DICI_M_38')
    .then ((res) => res.json())
    .then ((data) => calcular(data, fecha1, fecha2, precio)) 
    .catch((error) => console.log('Fetch Error', error));
}

let ultimaFecha
function calcular(data, fecha1, fecha2, precio) {
    const inflacionData = data.data;

    let index1 = inflacionData.findIndex( i => i[0] === fecha1);
    let index2 = inflacionData.findIndex( i => i[0] === fecha2);


    let dataTemporal = inflacionData.slice((index1) , (index2 + 1));    
    for ( data of dataTemporal) {
        precio = precio * (data[1] + 1);
    }
    inputValor2.value = precio.toFixed(2);

    ultimaFecha = inflacionData.pop()
}




