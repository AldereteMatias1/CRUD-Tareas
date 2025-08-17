import express from 'express';
import routerBase from './routers/routerBase.js'
import {leerArchivo} from './routers/routerBase.js';
import fs from "fs";
const app = express();//Creamo la app expresse
const PORT = process.env.PORT  || 3000;
app.use(express.json());//Middleware
app.use("/api/tareas",routerBase);
app.listen(PORT,()=>{
    console.log(`Escuchando correctamente en el puerto ${PORT}`);
});
routerBase.get("/:id",(req,res)=>{

});



/*
GET /api/tareas → listado de tareas
GET /api/tareas/:id → una tarea por id
POST /api/tareas → crear una nueva tarea (recibe título y fecha)
PUT /api/tareas/:id → actualizar una tarea existente
DELETE /api/tareas/:id → eliminar una tarea
*/