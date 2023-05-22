//Creamos un array de objetos
const arrayDatos = [

    { propietario: 'Sergio', teléfono: 653252141, matrícula: '1285-LLK', modelo: 'BMW', multas: 12 },
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
        const objetoMat = await compruebaMatricula(mat);//esto debería ser el objeto
        const objetoConMultas = await validarMulta(objetoMat);
        datosLocal.push(objetoConMultas) // esto mira si tiene multas
        localStorage.setItem('multas', JSON.stringify(datosLocal))
        return objetoConMultas

    } catch (error) {
        throw error
    }

}


//Función que comprueba si la matrícula que introduce el usuario está en nuestra "base de datos",que es nuestro array de multas.
const compruebaMatricula = (matricula) => {

    let objetoPropietario;

    //Recorremos nuestro array de datos y vemos si existe coincidencia.
    for (let key in arrayDatos) {
        if (arrayDatos[key].matrícula == matricula) {
            objetoPropietario = arrayDatos[key]
        }
    }

    //Si existe coincidencia devolvemos el objeto entero y si no lo sacamos por el throw
    if (!objetoPropietario) {
        throw 'No existe esa matrícula en nuestra base de datos'
    } else {
        return objetoPropietario
    }

}

//Función para comprobar si la matrícula que nos llega tiene multas.
const validarMulta = (mat) => {
    if (mat.multas > 0) {
        return mat
    } else {
        throw 'El cliente no tiene multas'
    }
}


//Función para pintar en pantalla una vez comprobado que tiene multas.
const pintar = (matricula) => {
    const tablaResultados = document.querySelector('#tablaresultados');
    const trDatosUsuario = document.createElement('TR');
    const tr = document.createElement('TR');
    const encabezados = ["Propietario", "Teléfono", "Matrícula", "Marca", "Multas"]

    //Pintamos los encabezados fijos de la tabla.
    encabezados.forEach(dato => {
        const th = document.createElement('TH');
        th.textContent = dato;
        tr.append(th)

    });

    //Recorremos el objeto que nos llega y pintamos los datos.
    for (let key in matricula) {
        const td = document.createElement('TD');
        td.textContent = matricula[key]
        trDatosUsuario.append(td);
    }


    tablaResultados.append(tr)
    tablaResultados.append(trDatosUsuario)

}


//Funciónalidad del botón "eliminar registro".Nos elimina los datos guardados en el localStorage y reiniciamos dejando vacío el registro.
const eliminarLocal = () => {

    const tablaGeneral = document.querySelector('#tablaresultados')

    localStorage.clear();

    tablaGeneral.textContent = " ";


}

