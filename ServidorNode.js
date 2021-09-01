import express  from "express";
import fs from "file-system";

const app= express();
const PORT= 8080;
let visitas1=0;
let visitas2=0;

const server= app.listen (PORT, ()=>{
    console.log("Servidor HTTP corriendo en", server.address().port);
});
server.on('error', error=>console.log('Error en servidor',error));


const getProductos=()=>{
    return fs.readFileSync('productos.txt', 'utf-8');
}

app.get('/',(req,res)=>{
    res.send("<h1>Inicio Del Programa</h1>");
});

app.get('/items',(req,res)=>{
    const PRO=getProductos();
    const object={
        items: JSON.parse(PRO), cantidad: JSON.parse(PRO).length
    }
    visitas1++;
    res.json(object)
});

app.get('/items-random',(req,res)=>{
    const PRO=getProductos();
    let azar = Math.floor(Math.random() * (JSON.parse(PRO).length - 0) + 0);
    const object={
        items: JSON.parse(PRO)[azar]
    }
    visitas2++;
    res.json(object)
});

app.get('/visitas',(req,res)=>{
    const object={
        visitas: {
            items: visitas1,
            item: visitas2
        }
    }
    res.json(object)
});