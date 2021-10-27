const boton = document.querySelector('#boton');

boton.onclick = (e) => {
    esperoYEscriboPromise()
        .then(
            (mensaje) => {
                console.log(`Fuera de la función: ${mensaje}`)
            }
        )
    for (let index = 0; index < 20; index++) {
        console.log(index);
    }
}

// function escribir() {
//     return 'escribo';
// }

// function esperoYEscribo() {
//     setTimeout(
//         () => {
//             console.log('Dentro de la función: esperé y escribí');
//             return 'esperé y escribí'
//         },
//         2000
//     );
// }


async function esperoYEscriboPromise() {
    const fallo = true;
    return new Promise(
        (resolve, reject) => {
            if (!fallo) {
                setTimeout(
                    () => {
                        resolve('esperé y escribí');
                    },
                    2000
                );
            } else {
                reject('error error error');
            }

        }
    );
}