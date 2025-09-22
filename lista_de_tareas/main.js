import { agregarTarea, mostrarTareas, buscarTarea } from './listaTareas.js';
import { preguntar, cerrar } from './EntSal.js';

async function main() {
    let op = 0;
    let filtro, opcion;

    do {
        console.log(`
            ===================================
            ✍️📋 Bienvenid@ a la lista de tareas 📋✍️
            [1] Ver tareas.
            [2] Buscar una tarea.
            [3] Agregar una tarea.
            [0] Salir.
            ===================================
        `);

        op = parseInt(await preguntar("Ingrese la opción: "), 10);
        while (Number.isNaN(op) || op < 0 || op > 3) {
            console.log("ERROR. Debe ingresar un numero o una opcion. \n");
            op = parseInt(await preguntar("Ingrese la opción: "), 10);
        }

        switch (op) {
            case 1:
                console.log(`
                    ===================================
                    ¿Que tareas deseas ver?
                    [1] Todas.
                    [2] Pendientes.
                    [3] En curso.
                    [4] Terminadas.
                    [0] Salir.
                    ===================================
                `);

                opcion = parseInt(await preguntar("Ingrese la opción: "), 10);
                while (Number.isNaN(opcion) || opcion < 0 || opcion > 4) {
                    console.log("ERROR. Debe ingresar un numero o una opcion. \n");
                    opcion = parseInt(await preguntar("Ingrese la opción: "), 10);
                }

                switch (opcion) {
                    case 1:
                        filtro = 1;
                        await mostrarTareas(filtro);
                        break;
                    case 2:
                        filtro = "Pendiente";
                        await mostrarTareas(filtro);
                        break;
                    case 3:
                        filtro = "En curso";
                        await mostrarTareas(filtro);
                        break;
                    case 4:
                        filtro = "Terminada";
                        await mostrarTareas(filtro);
                        break;
                }
                break;

            case 2:
                await buscarTarea();
                break;

            case 3:
                await agregarTarea();
                break;
        }

    } while (op != 0);

    cerrar();
}

main();
