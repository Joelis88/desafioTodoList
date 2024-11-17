// Seleccionamos los elementos y definimos las constantes
const miListaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const botonAgregar = document.querySelector("#agregarTarea");
const cuentaTareas = document.querySelector("#cuenta-tareas");
const cuentaTareasRealizadas = document.querySelector("#realizadas");

const tareas = [
    { id: 123, nombreTarea: "Crear archivo html", completada: false },
    { id: 245, nombreTarea: "Seleccionar elementos", completada: false },
    { id: 387, nombreTarea: "Definir variables", completada: false },
    { id: 463, nombreTarea: "Actualizar DOM", completada: false }
];

// Función que se ejecuta al hacer click
botonAgregar.addEventListener("click", () => {
    const nombre = tareaInput.value.trim();
    if (nombre === "") {
        alert("Debe agregar una tarea");
        return;
    }
    const nuevaTarea = {
        id: Date.now(),
        nombreTarea: tareaInput.value,
        completada: false
    };
    tareas.push(nuevaTarea);
    tareaInput.value = "";
    actualizarHtml();
});

// Función para actualizar el HTML
function actualizarHtml() {
    let html = "";
    for (let tarea of tareas) {
        html += `<li id="tarea-${tarea.id}"> ${tarea.id}
                    ${tarea.nombreTarea}
                    <input type="checkbox" onclick="completarTarea(${tarea.id})" ${tarea.completada ? "checked" : ""}>
                    <button class="borrar" onclick="borrarTarea(${tarea.id})"><i class="fas fa-trash-alt"></i></button>
                 </li>`;
    }
    miListaDeTareas.innerHTML = html;
    cuentaTareas.textContent = `Total: ${tareas.length}`         
    const tareasRealizadas = tareas.filter((tarea) => tarea.completada).length
    cuentaTareasRealizadas.textContent = `Realizadas: ${tareasRealizadas}`
}

// Función para borrar tarea
function borrarTarea(id) {
    const index = tareas.findIndex((ele) => ele.id == id);
    tareas.splice(index, 1);
    actualizarHtml();
}

// Función para completar tarea
function completarTarea(id) {
    const index = tareas.findIndex((tarea) => tarea.id === id)
    if (index !== -1) {
        tareas[index].completada = !tareas[index].completada
        actualizarHtml()
    }
}
