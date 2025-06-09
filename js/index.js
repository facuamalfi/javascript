// Array para almacenar los turnos

let turnos = [];

// Función para agendar un nuevo turno

function agendarTurno() {
    let nombre = prompt("Ingrese su nombre:");
    let dia = prompt("Ingrese el día en que desea agendar una consulta:");

    // Crear objeto turno

    let turno = {
        cliente: nombre,
        dia: dia
    };

    // Agregar al array

    turnos.push(turno);

    alert("Turno agendado con éxito para " + nombre + " el día " + dia + ".");
}

// Función para mostrar todos los turnos agendados

function verTurnos() {
    if (turnos.length === 0) {
        alert("No hay turnos agendados.");
        return;
    }

    let mensaje = "Turnos agendados:\n";

    // Iterador para recorrer el array de turnos

    for (let i = 0; i < turnos.length; i++) {
        mensaje += (i + 1) + ". " + turnos[i].cliente + " - " + turnos[i].dia + "\n";
    }

    alert(mensaje);
}

// Menú principal

function menu() {
    let opcion;

    do {
        opcion = prompt(
            "Bienvenido al Estudio de Arquitectura\n\n" +
            "Seleccione una opción:\n" +
            "1. Agendar un turno\n" +
            "2. Ver turnos agendados\n" +
            "3. Salir"
        );

        switch (opcion) {
            case "1":
                agendarTurno();
                break;
            case "2":
                verTurnos();
                break;
            case "3":
                alert("Gracias por usar nuestra agenda!");
                break;
            default:
                alert("Opción no válida. Intente de nuevo.");
        }
    } while (opcion !== "3");
}

// Iniciar el programa

menu();

