const boton = document.querySelector('#boton');

boton.onclick = (e) => {
    traerPokemon();
}

const boton2 = document.querySelector('#boton2');

boton2.onclick = (e) => {
    compararPesos();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//ES6
const listaPokemon = [];

function traerPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1,151)}`)
        .then(respuesta => respuesta.json())
        .then(pokemon => {
            listaPokemon.push(pokemon);
            console.log('Pokemon agregado a la lista');
        })
}

const body = document.querySelector('body');

function compararPesos() {
    listaPokemon.forEach(pokemon => {
        crearPaginaDePokemon(pokemon);
    });
    if (listaPokemon[0].weight > listaPokemon[1].weight) {
        console.log(`${listaPokemon[0].name} es más pesado que ${listaPokemon[1].name}`)
    } else {
        console.log(`${listaPokemon[1].name} es más pesado que ${listaPokemon[0].name}`)
    }
}

function crearPaginaDePokemon(pokemon) {
    const titulo = document.createElement('h1');
    titulo.textContent = pokemon.name;
    body.appendChild(titulo);

    const peso = document.createElement('h2');
    peso.textContent = pokemon.weight;
    body.appendChild(peso);

    const imagenFrente = document.createElement('img');
    imagenFrente.setAttribute('src', pokemon.sprites.front_default);
    body.appendChild(imagenFrente);

    const imagenEspalda = document.createElement('img');
    imagenEspalda.setAttribute('src', pokemon.sprites.back_default);
    body.appendChild(imagenEspalda);

    const listaTipos = document.createElement('ol');
    pokemon.types.forEach(tipo => {
        const tipoListaItem = document.createElement('li');
        tipoListaItem.textContent = tipo.type.name;
        listaTipos.appendChild(tipoListaItem);
    });
    body.appendChild(listaTipos);


}