import { tasks } from "../models/taskModels.mjs";

export function getTasksController (request, response){
    response.json(tasks);
    console.log(tasks);
}

export function postTasksController (request, response){
        try {               
                class POST {
                    constructor ({id=100, description="Tarea enviada sin descripción", done=false}){
                        this.id = id;
                        this.description = description;
                        this.done = done;
                    }
                }
           
                const postTask = new POST(request.body);

                const listTasksIdx = tasks.findIndex(
                item => item.id === postTask.id
                );

            if (listTasksIdx >= 0){
                console.log(`La tarea con el ID: ${postTask.id} ya existe, ...modifique el ID o intente actualizar la tarea.`);
                response.status(400).send(`<b>Solicitud Incorrecta</b><br><br><b>La tarea con el ID: ${postTask.id} ya existe, ...modifique el ID o intente actualizar la tarea.</b>`);
            } else {
                tasks.push(postTask);
                console.log(`La tarea "${postTask.description}" se ha añadido correctamente con el ID: ${postTask.id}`);
                console.log(postTask);
                response.status(201).send(`<b>Solicitud Aceptada</b><br><br><b>La tarea "${postTask.description}" se ha añadido correctamente con el ID: ${postTask.id}</b>`);
            }
        } catch {
                console.log(`Error interno del Servidor.`);
                response.status(500).send(`<b>Error interno del Servidor.</b>`); 
        }    
  }

export function putTasksController (request, response){
        try {   const updatedTask = request.body;
                const oldTaskIdx = tasks.findIndex (
                item => item.id === updatedTask.id
            );

            if (oldTaskIdx < 0){
                console.log(`La tarea con el ID: ${updatedTask.id} no existe.`);
                response.status(400).send(`<b>Solicitud Incorrecta</b><br><br><b>La tarea con el ID: ${updatedTask.id} no existe.</b>`);
            } else {
                tasks[oldTaskIdx] = updatedTask
                console.log(`La Tarea con ID: ${updatedTask.id} ha sido actualizada correctamente con la descripción "${updatedTask.description}".`);
                response.status(200).send(`<b>Solicitud Aceptada</b><br><br><b>La tarea con ID: ${updatedTask.id} ha sido actualizada correctamente con la descripción "${updatedTask.description}".</p>`);
            }
        } catch {
                console.log(`Algo ha funcionado mal...`);
                response.status(500).send(`<b>Algo ha funcionado mal...</b>`); 
        }    
}

export function deleteTasksController (request, response){
        try {   const searchedTask = request.body;
                const deleteTaskIdx = tasks.findIndex (
                item => item.id === searchedTask.id
            );

            if (deleteTaskIdx < 0){
                console.log(`La tarea con el ID: ${searchedTask.id} no existe.`);
                response.status(400).send(`<b>Solicitud Incorrecta</b><br><br><b>La tarea con el ID: ${searchedTask.id} no existe.</b>`);
            } else {
                tasks.splice(deleteTaskIdx,1);
                console.log(`La tarea ID: ${searchedTask.id} con la descripción "${searchedTask.description}" ha sido eliminada correctamente`);
                response.status(200).send(`<b>Solicitud Aceptada</b><br><br><b>La tarea ID: ${searchedTask.id} con la descripción "${searchedTask.description}" ha sido eliminada correctamente</p>`);
            }
        } catch {
                console.log(`Error interno del Servidor.`);
                response.status(500).send(`<b>Error interno del Servidor.</b>`); 
        }   
}