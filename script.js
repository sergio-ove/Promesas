//creamos un array de objetos
const datos = [

    { propietario: 'Sergio', teléfono: 653252141, matrícula: '1285-LLK', modelo: 'BMW', multas: 0 },
    { propietario: 'Francisco', teléfono: 683726192, matrícula: '1832-JKL', modelo: 'AUDI', multas: 8 },
    { propietario: 'Gonzalo', teléfono: 683992142, matrícula: '2550-BCD', modelo: 'SEAT', multas: 2 },
    { propietario: 'Sara', teléfono: 653283923, matrícula: '0082-KLK', modelo: 'HONDA', multas: 5 },
    { propietario: 'Carmen', teléfono: 683746243, matrícula: '1021-MSB', modelo: 'TOYOTA', multas: 0 },

];

//Creamos una variable para guardar los datos en el localStorage.
const datosLocal = JSON.parse(localStorage.getItem('multas')) || [];


//Evento que muestra resultados
document.addEventListener('click', (ev) => {

    ev.preventDefault();
    //utilizamos target.matches para verificar si el elemento coincide con el selector que le indicamos
    if (ev.target.matches('#comprobar')) {
        const matrícula = document.querySelector('#matrícula')
        const campoMatrícula = matrícula.value;
        console.log(campoMatrícula);
        buscar(campoMatrícula)
            .then((objeto) => { pintar(objeto) })
            .catch((error) => { alert(error) })
    }
});


// Validamos matrícula

const validar = (mat) => {

    const matReg = /[0-9]{4}-[A-Z]/gi

    if (matReg.test(mat)) {
        return mat;
    } else {
        throw 'La matrícula no es correcta'
    }
}

//Funcion para buscar si la matrícula tiene multas.
const buscar = async (mat) => {

    try {
        // const validacion = await validar(mat);
        const objetoMat = await getMatricula(mat);//esto debería ser el objeto
        console.log(objetoMat);
        const objetoConMultas = await validarMulta(objetoMat);
        datosLocal.push(objetoConMultas) // esto mira si tiene multas
        localStorage.setItem('multas', JSON.stringify(datosLocal))
        return objetoConMultas

    } catch (error) {
        throw error
    }

}

const getMatricula = (mat) => {

    let objetoPropietario;

    for (let key in datos) {
        if (datos[key].matrícula == mat) {
            objetoPropietario = datos[key]
        }
    }

    if (!objetoPropietario) {
        throw 'No existe esa matrícula en nuestra base de datos'
    } else {
        return objetoPropietario
    }


}

const validarMulta = (mat) => {
    console.log(mat.multas)
    if (mat.multas > 0) {
        return mat
    } else {
        throw 'El cliente no tiene multas'
    }
}


const pintar = (objeto) => {

    console.log(objeto)
    const tablaResultados = document.querySelector('#tablaresultados');
    const trDatosUsuario = document.createElement('TR');
    const tr = document.createElement('TR');
    const encabezados = ["Propietario", "Teléfono", "Matrícula", "Marca", "Multas"]

    encabezados.forEach(dato => {
        console.log(dato);
        const th = document.createElement('TH');
        th.textContent = dato;
        tr.append(th)

    });

    for (let key in objeto) {
        const td = document.createElement('TD');
        td.textContent = objeto[key]
        trDatosUsuario.append(td);
    }


    tablaResultados.append(tr)
    tablaResultados.append(trDatosUsuario)

}

const eliminarLocal = () => {

    const tablaGeneral = document.querySelector('#tablaresultados')

    localStorage.clear();

    tablaGeneral.textContent = " ";

    pintarAlIniciar()

}


const pintarAlIniciar = () => {

    if (localStorage.getItem('datosLocal')) {
        datosLocal.forEach((item) => {
            pintar(item)
        })
    }
}

pintarAlIniciar()