import express from 'express';
import fs from 'fs';
const routerBase = express.Router();

routerBase.get("/",(req,res)=>{
    const tareas = leerArchivo();
    if(!tareas) return res.status(505).send("Error leyendo archivo");
    res.send(tareas);
});
//CREAR UNA NUEVA TAREA
routerBase.post("/",(req,res)=>{
    try{
    const newData = req.body;
    const data = leerArchivo();
    const newId = data.tareas[data.tareas.length-1].id +1;
    newData.id = newId;
    newData.completada = false;
    data.tareas.push(newData);
    console.log(data);
    fs.writeFileSync("./db/tareas.json",JSON.stringify(data,null,2),"utf-8");
    res.send(leerArchivo());
    }catch(err){
        console.log("Error interno del servidor");
        res.status(500).send("Error creando nueva tarea");
    }
})
//OBTENER TAREA POR ID
routerBase.get("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const data = leerArchivo();
    let tarea = {};
    if(id>=0){
        data.tareas.forEach(t=> {
            if(t.id == id){
                tarea = t;
            };
        });
    }else{
       return res.status(505).send("Recurso no encontrado"); 
    }
    if (!tarea) res.send(tarea);
    return res.status(505).send("Recurso no encontrado");
})
//ACTUALIZAR TAREA EXISTENTE
routerBase.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const data = leerArchivo();
    const newData = req.body;
    const index = data.tareas.findIndex(t => t.id == id);
    Object.assign(data.tareas[index],newData);
    fs.writeFileSync("./db/tareas.json",JSON.stringify(data,null,2),"utf-8");
    res.send(data);
});
routerBase.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const data = leerArchivo();
    const index = data.tareas.findIndex(t => t.id == id);
    const idTareaEliminada = data.tareas[index].id;
    const dataFiltrada = data.tareas.filter(t => t.id != idTareaEliminada);
    console.log(dataFiltrada);
    fs.writeFileSync("./db/tareas.json",JSON.stringify(dataFiltrada,null,2),"utf-8");
    res.send(data);
})

export function leerArchivo(){
    try {
    const tareas = JSON.parse(fs.readFileSync("./db/tareas.json", "utf8")); // como el entry file es app.js se hace la ruta desde ahi
    return tareas;
}catch (error){
    return null;
}
}

export default routerBase;
