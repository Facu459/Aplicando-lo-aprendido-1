import { preguntar, cerrar } from "./EntSal.js";

const listaTareas = [];

function crearTarea(titulo, descripcion, vencimiento, dificultad, estado) {
    return {
        id: listaTareas.length + 1,
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toLocaleDateString(),
        vencimiento: vencimiento, // puede ser cadena vacía
        dificultad: dificultad,
        estado: estado
    };
}

async function agregarTarea() {
    let titulo = await preguntar("1. Ingrese el titulo: ");
    while (titulo.trim().length === 0) {
        console.log("Por favor ingrese al menos un caracter.\n");
        titulo = await preguntar("1. Ingrese el titulo: ");
    }

    let descripcion = await preguntar("2. Ingrese la descripcion: ");
    while (descripcion.trim().length === 0) {
        console.log("Por favor ingrese al menos un caracter (puede ser un espacio si quiere dejarlo en blanco).\n");
        descripcion = await preguntar("2. Ingrese la descripcion: ");
    }

    const estado = "Pendiente";
    const dificultad = await seleccionarDificultad();

    // Vencimiento opcional
    let vencimiento = await preguntar("Fecha de vencimiento (DD MM AAAA) o Enter para omitir: ");
    if (vencimiento.trim() !== "") {
        while (!/^\d{2}\s\d{2}\s\d{4}$/.test(vencimiento)) {
            console.log("Ingrese una fecha válida (DD MM AAAA) o Enter para omitir.\n");
            vencimiento = await preguntar("Fecha de vencimiento (DD MM AAAA) o Enter para omitir: ");
            if (vencimiento.trim() === "") break;
        }
    } else {
        vencimiento = "";
    }

    listaTareas.push(crearTarea(titulo, descripcion, vencimiento, dificultad, estado));
    console.log("¡Tarea creada correctamente ✅!");
}

async function seleccionarDificultad() {
    let entrada = await preguntar("Dificultad [1] Fácil [2] Medio [3] Difícil (Enter = Fácil): ");
    if (entrada.trim() === "") return "⭐";

    let opcion = parseInt(entrada, 10);
    while (Number.isNaN(opcion) || opcion < 1 || opcion > 3) {
        console.log("Opción no válida. Intente de nuevo.\n");
        entrada = await preguntar("Dificultad [1] Fácil [2] Medio [3] Difícil (Enter = Fácil): ");
        if (entrada.trim() === "") return "⭐";
        opcion = parseInt(entrada, 10);
    }

    switch (opcion) {
        case 1: return "⭐";
        case 2: return "⭐⭐";
        case 3: return "⭐⭐⭐";
    }
}

async function seleccionarEstado() {
    let entrada = await preguntar("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada) (Enter = Pendiente): ");
    if (entrada.trim() === "") return "Pendiente";

    let opcion = parseInt(entrada, 10);
    while (Number.isNaN(opcion) || opcion < 1 || opcion > 4) {
        console.log("Opción incorrecta, vuelva a intentarlo:\n");
        entrada = await preguntar("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada) (Enter = Pendiente): ");
        if (entrada.trim() === "") return "Pendiente";
        opcion = parseInt(entrada, 10);
    }

    switch (opcion) {
        case 1: return "Pendiente";
        case 2: return "En curso";
        case 3: return "Terminada";
        case 4: return "Cancelada";
    }
}

async function mostrarTareas(filtro) {
    if (listaTareas.length === 0) {
        console.log("No hay tareas cargadas\n");
        return;
    }

    console.log("Mostrando Tareas:");
    for (let i = 0; i < listaTareas.length; i++) {
        const tarea = listaTareas[i];
        if (filtro === 1 || tarea.estado === filtro) {
            console.log(`[${tarea.id}] ${tarea.titulo}`);
        }
    }
    await verTareaEspecifica();
}

async function verTareaEspecifica() {
    console.log("Si desea ver una tarea en particular, ingrese su numero. O ingrese 0 para volver al menu principal.\n");

    let idIngresado = parseInt(await preguntar("Numero: "), 10);
    if (idIngresado === 0) return;

    let tareaElegida = null;
    for (let i = 0; i < listaTareas.length; i++) {
        if (listaTareas[i].id === idIngresado) {
            tareaElegida = listaTareas[i];
            break;
        }
    }

    while (!tareaElegida) {
        console.log("Tarea no encontrada, ingrese otro numero:\n");
        idIngresado = parseInt(await preguntar("Numero: "), 10);
        if (idIngresado === 0) return;
        for (let i = 0; i < listaTareas.length; i++) {
            if (listaTareas[i].id === idIngresado) {
                tareaElegida = listaTareas[i];
                break;
            }
        }
    }

    console.log('Tarea elegida.\n');
    console.log("Titulo:", tareaElegida.titulo);
    console.log("Descripcion:", tareaElegida.descripcion);
    console.log("Estado:", tareaElegida.estado);
    console.log("Dificultad:", tareaElegida.dificultad);
    console.log("Vencimiento:", tareaElegida.vencimiento || "(sin fecha)");
    console.log("Creacion:", tareaElegida.fecha, "\n");

    const opcion = parseInt(await preguntar("Si deseas editarla presiona 1, o presiona 0 para volver: "), 10);
    if (opcion === 1) await modificarTarea(idIngresado);
}

async function modificarTarea(idTarea) {
    let tareaEditada = null;
    for (let i = 0; i < listaTareas.length; i++) {
        if (listaTareas[i].id === idTarea) {
            tareaEditada = listaTareas[i];
            break;
        }
    }
    if (!tareaEditada) return;

    let op = 0;
    do {
        console.log(`Estas editando la tarea ${tareaEditada.titulo}
            ===================================
            ¿Qué deseas modificar?
            [1] Descripción.
            [2] Estado.
            [3] Dificultad.
            [4] Vencimiento.
            [0] Salir.
            ===================================`);

        op = parseInt(await preguntar("Ingrese una opción: "), 10);
        while (Number.isNaN(op) || op < 0 || op > 4) {
            console.log("ERROR. Opción incorrecta, vuelva a intentarlo:\n");
            op = parseInt(await preguntar("Ingrese una opción: "), 10);
        }

        switch (op) {
            case 1:
                tareaEditada.descripcion = await preguntar("Ingrese la descripcion: ");
                break;
            case 2:
                tareaEditada.estado = await seleccionarEstado();
                break;
            case 3:
                tareaEditada.dificultad = await seleccionarDificultad();
                break;
            case 4:
                let nuevaFecha = await preguntar("Ingrese el vencimiento (DD MM AAAA) o Enter para dejar sin fecha: ");
                if (nuevaFecha.trim() !== "") {
                    while (!/^\d{2}\s\d{2}\s\d{4}$/.test(nuevaFecha)) {
                        nuevaFecha = await preguntar("Ingrese el vencimiento (DD MM AAAA) o Enter para dejar sin fecha: ");
                        if (nuevaFecha.trim() === "") break;
                    }
                }
                tareaEditada.vencimiento = nuevaFecha.trim();
                break;
        }
        if (op !== 0) console.log("¡✅ Datos guardados!");
    } while (op !== 0);
}

async function buscarTarea() {
    if (listaTareas.length === 0) {
        console.log("No hay tareas cargadas\n");
        return;
    }

  
    let tituloBuscado = await preguntar("Introduce el título de la tarea: ");
    
    const tituloBuscadoMin = tituloBuscado.toLowerCase();

    const tareasCoinciden = [];
    for (let i = 0; i < listaTareas.length; i++) {
      
        const tituloTareaMin = String(listaTareas[i].titulo).toLowerCase();
        if (tituloTareaMin === tituloBuscadoMin) {
            tareasCoinciden[tareasCoinciden.length] = listaTareas[i];
        }
    }



    if (tareasCoinciden.length === 0) {
        console.log("No hay tareas que coincidan con la búsqueda.\n");
        return;
    }

    console.log("Tareas encontradas:");
    for (let i = 0; i < tareasCoinciden.length; i++) {
        console.log(`[${tareasCoinciden[i].id}] ${tareasCoinciden[i].titulo}`);
    }

    await verTareaEspecifica();
}

export { agregarTarea, mostrarTareas, buscarTarea };
