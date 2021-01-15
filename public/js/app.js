import './modulos/proyectos';
import './modulos/tareas';
import { actualizarAvance } from './functions/avance';

document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
});