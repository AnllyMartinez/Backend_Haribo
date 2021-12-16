const express = require ('express');
const config = require ('./config.json');
const app = express();
const port =  config.SERVER_PORT;
const reportes = require("./db").reportes;

app.get('/ModuloProduccionReportes', async(request,  response)=>{
    const page = request.query.page;
    const limit = request.query.limit;
    const datos = await reportes(parseInt(limit), page)
    response.json(datos)
});

app.listen (port, () =>{
    console.log(`Backend corriendo en puerto ${port}`);
})
