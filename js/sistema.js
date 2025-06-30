// Sistema de turnos - Estudio de Arquitectura

// Elementos del DOM

const form = document.getElementById("form-turno");
const inputNombre = document.getElementById("nombre");
const inputDia = document.getElementById("dia");
const inputHora = document.getElementById("hora");
const listaTurnos = document.getElementById("lista-turnos");
const errorMensaje = document.getElementById("error-mensaje");

// Variables

let turnos = [];

const turnosGuardados = localStorage.getItem("turnos");
if(turnosGuardados){
    turnos = JSON.parse(turnosGuardados);
    mostrarTurnos();
}

const diasValidos = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

// Submit

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = inputNombre.value;
    const dia = inputDia.value;
    const hora = inputHora.value;

    const existeTurno = turnos.some(function(turnoExistente) {
        return(
            turnoExistente.nombre.toLowerCase() === nombre.toLowerCase() &&
            turnoExistente.dia === dia &&
            turnoExistente.hora === hora
        );
    });

    if(existeTurno){
        errorMensaje.textContent = "Turno no disponible, por favor elija otra opción.";
        return;
    }

    const turno = {
        nombre: nombre,
        dia: dia,
        hora: hora
    };

    turnos.push(turno);

    localStorage.setItem("turnos", JSON.stringify(turnos));

    mostrarTurnos();

    errorMensaje.textContent = "";

    form.reset();
});

// Todos los turnos registrados 

function mostrarTurnos() {
    listaTurnos.innerHTML = "";

    turnos.forEach(function(turno) {
        const li = document.createElement("li");
        li.textContent = turno.nombre + " - " + turno.dia + " a las " + turno.hora;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.style.marginLeft = "10px";

        botonEliminar.addEventListener("click", function() {
            li.remove();

            const indice = turnos.findIndex(function(t) {
                return(
                    t.nombre === turno.nombre &&
                    t.dia === turno.dia &&
                    t.hora === turno.hora
                );
            });

            if(indice !== -1){
                turnos.splice(indice, 1);
                localStorage.setItem("turnos", JSON.stringify(turnos));
                mostrarTurnos();
            }
        });

        li.appendChild(botonEliminar);
        listaTurnos.appendChild(li);
    });
}
