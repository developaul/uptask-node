import axios from "axios";
import Swal from "sweetalert2";

import { actualizarAvance } from '../functions/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) tareas.addEventListener('click', ({ target }) => {

    if (target.classList.contains('fa-check-circle')) {

        const idTarea = target.parentElement.parentElement.dataset.tarea;

        const url = `${location.origin}/tareas/${idTarea}`;

        axios.patch(url, { idTarea })
            .then(res => {
                if (res.status === 200) {
                    target.classList.toggle('completo');
                    actualizarAvance();
                }
            });
    }

    if (target.classList.contains('fa-trash')) {
        const tareaHTML = target.parentElement.parentElement,
            idTarea = tareaHTML.dataset.tarea;

        Swal.fire({
            title: '¿Deseas borrar esta tarea?',
            text: "Un tarea eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                const url = `${location.origin}/tareas/${idTarea}`;

                // Enviar el Delete
                axios.delete(url, { params: { idTarea } })
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            //Eliminar el nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);

                            // Opcional una alerta
                            Swal.fire(
                                'Tarea Eliminada!',
                                res.data,
                                'success'
                            );

                            actualizarAvance();
                        }
                    });
            }
        });

    }
});

export default tareas;