const body = document.querySelector('body');
// const boton = document.querySelector('#boton');
// const resumen = document.querySelector('#Resumen');
// const input = document.querySelector('#inputNombre');
// const reiniciar = document.querySelector('#reiniciar');

const tipoPregunta = ['actor', 'name', 'house'];
const textoPregunta = ['Como se llama el actor?/la actriz?', 'Como se llama el personaje', 'A que casa pertenece?'];
const numeros=[0,0,0,0,0,0,0,0,0,0];
const respuestas = ['','','',''];

const contadorDePreguntas = 1;



const div1 = document.createElement('div');
div1.setAttribute('id', 'Resumen');
div1.setAttribute('style', 'display:none;');


const htres = document.createElement('h3');
htres.setAttribute('id', 'JugadorNombre');

const input1 = document.createElement('input');
input1.type = 'number';
input1.setAttribute('value', '0');
input1.setAttribute('id', 'puntaje');
input1.setAttribute('name', 'puntaje');

const input2 = document.createElement('input');
input2.type = 'number';
input2.setAttribute('value', '0');
input2.setAttribute('id', 'contestadas');
input2.setAttribute('name', 'contestasas');
input2.setAttribute('style', 'display:none;');

const boton1 = document.createElement('button');
boton1.textContent = 'Reiniciar Juego';
boton1.setAttribute('id', 'reiniciar');
boton1.setAttribute('style','display:none;');

const br = document.createElement('br');


div1.appendChild(htres);
div1.appendChild(input1);
div1.appendChild(input2);
div1.appendChild(br);
div1.appendChild(boton1);
body.appendChild(div1);

// Input para ingresar nombre //
const input = document.createElement('input');

input.type = 'text'

input.setAttribute('id', 'inputNombre');

body.appendChild(input);

document.querySelector('#inputNombre').placeholder = 'Ingrese su nombre';

// boton pata iniciar juego // 
const boton = document.createElement('button');

boton.innerText = 'Iniciar Juego';

boton.setAttribute('id', 'boton');

body.appendChild(boton)



boton.onclick = (e) => {
    if(input.value !== ""){
        boton.style.display = 'none';
        input.style.display = 'none';
        Resumen.style.display = 'revert'; 
        document.getElementById("JugadorNombre").innerHTML = 'Jugador: '+document.getElementById("inputNombre").value;
        iniciarJuego();
    }else{
        alert("Ingrese su nombre");
    }
}

reiniciar.onclick = (e) => {
    reiniciar = 'none'; 
    document.getElementById('preguntas').innerHTML='';
    document.getElementById('puntaje').value = 0;
    document.getElementById("inputNombre").value = '';
    boton.style.display = 'revert';
    input.style.display = 'revert';
    Resumen.style.display = 'none'; 

}

let infoCompleta;

function traerInformacion() {
    fetch('http://hp-api.herokuapp.com/api/characters')
        .then(respuesta => respuesta.json())
        .then(info => {
            infoCompleta = info.filter(elemento => elemento.name && elemento.image);
            // console.log('Información lista');
            // console.log(infoCompleta.length);
        });
}

traerInformacion();

function iniciarJuego(){
    console.log('Información lista');
    for (let e = 0; e < numeros.length; e++) {
        numeros[e]=0;
    }

    for(let i = 0; i < 10; i++){
        console.log('GENERANDO PREGUNTA#'+i);
        for (let ii = 0; ii < respuestas.length; ii++) {
            respuestas[ii]='';
        }
        crearPreguntas(i);
    }
}



function crearPreguntas(numero) {
    let personajeNumero = 0;
    const respuestaCorrecta = getRandomInt(0, 4); // respuesta correcta
    do{
        personajeNumero = getRandomInt(0, infoCompleta.length);
    }while(validarPersonaje(personajeNumero));
    numeros[numero] = personajeNumero;
    const personaje = infoCompleta[personajeNumero];


    //crear div contenedor principal
    const divPrincipal = document.createElement('div');
    divPrincipal.classList.add('contenedorPregunta'); //no olvidar hacer append

    
    const tituloPregunta = document.createElement('p');
    tituloPregunta.classList.add('tituloPregunta');
    tituloPregunta.textContent = 'PREGUNTA#'+(numero+1);
    divPrincipal.appendChild(tituloPregunta);

    let clasificacion=0;

    if(personaje.house === ""){
        clasificacion = getRandomInt(0, 2); 
    }else{
        clasificacion = getRandomInt(0, 3); 
    }

    const divisor1 = document.createElement('hr')
    divPrincipal.appendChild(divisor1);


    const imagenContainer = document.createElement('div');
    imagenContainer.classList.add('imagenContainer');

    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    imagenContainer.appendChild(imagen);

    divPrincipal.appendChild(imagenContainer);

    const texto = document.createElement('p');
    texto.classList.add('textoPregunta');
    texto.textContent = textoPregunta[clasificacion];
    texto.id = numero;

    divPrincipal.appendChild(texto);

    const opcionesContainer = document.createElement('div');
    opcionesContainer.classList.add('opcionesContainer'); //no olvidar hacer append

    for (let i = 0; i < 4; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `pregunta`+numero;
        input.id = numero+`pregunta`+'num'+i;

        input.onclick = function(){
            let preguntasContestadas = parseInt(document.getElementById('contestadas').value) + 1 ;
            let pregunta = this.id.substring(0,this.id.indexOf('p'));
            document.getElementById('contestadas').value = preguntasContestadas;
            if(this.value == 'true'){
                let variable = parseInt(document.getElementById('puntaje').value) + 10 ;
                document.getElementById('puntaje').value = variable;
                document.getElementById(pregunta).innerHTML = document.getElementById(pregunta).innerHTML+ ' (Correcto)';
            }else{
                document.getElementById(pregunta).innerHTML = document.getElementById(pregunta).innerHTML+ ' (Incorrecto)';
            }
            document.getElementById(pregunta+'preguntanum0').disabled = true;
            document.getElementById(pregunta+'preguntanum1').disabled = true;
            document.getElementById(pregunta+'preguntanum2').disabled = true;
            document.getElementById(pregunta+'preguntanum3').disabled = true;
            if(preguntasContestadas==10){
                reiniciar.style.display = 'revert'; 
            }
        }


        const label = document.createElement('label');

        if (i === respuestaCorrecta) {
            input.value = true;
            if(clasificacion === 0){
                label.textContent = personaje.actor;
            }else{
                if(clasificacion === 1){
                    label.textContent = personaje.name;
                }else{
                    label.textContent = personaje.house;
                }
            }
        } else {
            input.value = false;
            if(clasificacion === 0){
                    do {
                        label.textContent = infoCompleta[getRandomInt(0, infoCompleta.length)].actor;
                    }
                    while (validarRespuesta(label.textContent,personaje.actor));
            }else{
                if(clasificacion === 1){
                    do {
                        label.textContent = infoCompleta[getRandomInt(0, infoCompleta.length)].name;
                    }
                    while (validarRespuesta(label.textContent,personaje.name));
                }else{
                    do {
                        label.textContent = infoCompleta[getRandomInt(0, infoCompleta.length)].house;
                    }
                    while (validarRespuesta(label.textContent,personaje.house));
                }
            }
            
        }
        respuestas[i] = label.textContent;
        opcionesContainer.appendChild(input);
        opcionesContainer.appendChild(label);
        const espacio = document.createElement('br')
        opcionesContainer.appendChild(espacio)
        
    }

    divPrincipal.appendChild(opcionesContainer);

    const divisor2 = document.createElement('hr')
    divPrincipal.appendChild(divisor2);

    document.querySelector('#preguntas').appendChild(divPrincipal);

}

//helper
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function validarRespuesta(string,string2){
    //console.log(string+' validar respuesta '+string2);
    if(string === string2){
        return true;
    }

    if(string === ""){
        return true;
    }
    for (let i = 0; i < respuestas.length; i++) {
        if(string == respuestas[i]){
            return true;
        }
    }
    return false;
}

function validarPersonaje(num){
    for (let e = 0; e < numeros.length; e++) {
        if(num == numeros[e]){
            return true;
        }
    }
    return false;
}


