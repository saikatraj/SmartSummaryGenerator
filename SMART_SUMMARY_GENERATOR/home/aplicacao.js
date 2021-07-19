//SELECIONAR ELEMENTOS
const notificacaoE = document.querySelector(".notificacao");
const valorE = document.querySelector(".temperatura-valor p");
const descE = document.querySelector(".temperatura-descricao p");
const localizacaoE = document.querySelector(".localizacao p");
const iconeE = document.querySelector(".icone-temperatura");


//DADOS
const clima = {};

clima.temperatura = {
    unidade: "celsius"
}

//APP constantes
const KELVIN = 273;
// Api Key
const key = "bfc6ecc3fbbc7c660ce863f4a5db4c21";

//CHECAR SE O BROWSER SUPORTA GEOLOCALIZAÇAO

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition( definirPosicao, mostrarErro );
} else {
    notificacaoE.innerHTML = "<p>O browser não suporta Geolocalização.</p>";    
}

//DEFINIR POSIÇAO DO USUARIO

function definirPosicao(posicao){
    let latitude = posicao.coords.latitude;
    let longitude = posicao.coords.longitude;
    
    obterClima(latitude, longitude);
}

//MOSTRAR ERRO QUANDO OCORRER UM PROBLEMA COM O SERVIÇO DE GEOLOZALIZAÇAO

function mostrarErro(error){
    notificacaoE.innerHTML= `<p>${error.message}</p>`;
}

//OBTER CLIMA DO PROVEDOR DA API
function obterClima(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })

        .then(function(data){
            clima.temperatura.valor = Math.floor(data.main.temp - KELVIN);
            clima.descricao = data.weather[0].description;
            clima.iconeId = data.weather[0].icon;
            clima.cidade = data.name;
            clima.pais = data.sys.country;
        })

        .then(function(){
            mostrarTempo();
        });

}

//MOSTRAR CLIMA PARA USUARIO


function mostrarTempo(){

iconeE.innerHTML = `
<img src="icons/${clima.iconeId}.png"/>
`;

valorE.innerHTML = `
${clima.temperatura.valor}º <span>C</span>
`;

descE.innerHTML = clima.descricao;

localizacaoE.innerHTML = `
${clima.cidade}, ${clima.pais}`;

};

// C TO F CONVERSAO
function celsiusFahrenheit(temperatura){
   return (temperatura * 9/5) + 32;
}


//QUANDO O USUARIO CLICAR NA TEMPERATURA MUDAR PARA FAHRENHEIT
valorE.addEventListener("click", function(){
    if(clima.temperatura.valor === undefined) return;

    if (clima.temperatura.unidade === "celsius"){
        let fahrenheit = celsiusFahrenheit(clima.temperatura.valor);
        fahrenheit = Math.floor(fahrenheit);
        valorE.innerHTML = `${fahrenheit}º <span>F</span>`;
        clima.temperatura.unidade = "fahrenheit"


    } else {

        valorE.innerHTML = `${clima.temperatura.valor}º <span>C</span>`;
        clima.temperatura.unidade = "celsius";

    }
});








