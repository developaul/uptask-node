import axios from "axios";

const tareas = document.querySelector('.listado-pendientes');

if (tareas) tareas.addEventListener('click', ({ target }) => {

    if (target.classList.contains('fa-check-circle')) {

        const idTarea = target.parentElement.parentElement.dataset.tarea;

        const url = `${location.origin}/tareas/${idTarea}`;

        axios.patch(url, { idTarea })
            .then(res => {
                if (res.status === 200) target.classList.toggle('completo');
            });
    }

});

export default tareas;