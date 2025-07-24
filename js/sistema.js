// Sistema de turnos - Estudio de Arquitectura

// Elementos del DOM

const form = document.getElementById("form-turno");
const inputNombre = document.getElementById("nombre");
const inputDia = document.getElementById("dia");
const inputHora = document.getElementById("hora");
const listaTurnos = document.getElementById("lista-turnos");
const errorMensaje = document.getElementById("error-mensaje");
const listaServicios = document.getElementById("lista-servicios");


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

    const nombre = inputNombre.value.trim();
    const dia = inputDia.value.toLowerCase();
    const hora = inputHora.value;

    if (nombre.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre debe tener al menos 3 caracteres',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    if (!diasValidos.includes(dia)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Seleccione un día válido',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    if (hora < "08:00" || hora > "20:00") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El horario debe ser entre 08:00 y 20:00',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    const existeTurno = turnos.some(function(turnoExistente) {
        return (
            turnoExistente.nombre.toLowerCase() === nombre.toLowerCase() &&
            turnoExistente.dia === dia &&
            turnoExistente.hora === hora
        );
    });

    if (existeTurno) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Turno no disponible, por favor elija otra opción',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    const turno = { nombre, dia, hora };

    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    mostrarTurnos();
    form.reset();

    Swal.fire({
        icon: 'success',
        title: 'Turno agendado',
        text: 'Tu turno se registró correctamente',
        timer: 2000,
        showConfirmButton: false
    });
});


// Servicios 

function mostrarServicios(servicios) {
  listaServicios.innerHTML = "";

  servicios.forEach(function(servicio) {
    const li = document.createElement("li");
    li.textContent = servicio.nombre + ": " + servicio.descripcion;
    listaServicios.appendChild(li);
  });
}

// Todos los turnos registrados 

function mostrarTurnos() {
    listaTurnos.innerHTML = "";

    turnos.forEach(function(turno) {
        const li = document.createElement("li");
        li.textContent = turno.nombre + " - " + turno.dia + " a las " + turno.hora;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-eliminar");

        botonEliminar.addEventListener("click", function() {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "El turno será eliminado permanentemente.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    li.remove();

                    const indice = turnos.findIndex(function(t) {
                        return (
                            t.nombre === turno.nombre &&
                            t.dia === turno.dia &&
                            t.hora === turno.hora
                        );
                    });

                    if (indice !== -1) {
                        turnos.splice(indice, 1);
                        localStorage.setItem("turnos", JSON.stringify(turnos));
                        mostrarTurnos();

                        Toastify({
                            text: "Turno eliminado",
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "#dc3545",
                            close: true
                        }).showToast();
                    }
                }
            });
        });

        li.appendChild(botonEliminar);
        listaTurnos.appendChild(li);
    });
}

// Cargar servicios desde JSON local

fetch("data/servicios.json")
  .then((response) => response.json())
  .then((data) => {
    mostrarServicios(data);
  })
  .catch((error) => {
    console.error("Error al cargar los servicios:", error);
  });
