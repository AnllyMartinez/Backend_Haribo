const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');


const connectionURL = config.CONNECTION_URL;

let mongoDBClient = null;

const connectToMongoDB = async() =>{
    try {
        console.log("Estableciendo la conexion.. ");
        mongoDBClient = new MongoClient(connectionURL);
        await mongoDBClient.connect();
        console.log("Conexion a MongoDB establecida");
    } catch (e) {
        console.log("Error al intentar conectarnos a MongoDB.");
        console.log(e);
    }
}

const closeMongoDB = async() => {
    try {
        console.log("Cerrando la conexion...");
        await mongoDBClient.close();
        console.log("Conexion con MongoDB cerrada ");
    } catch (error) {
        console.log("Error al intentar conectarnos a MongoDB.");
        console.log(e);   
    }
}

exports.reportes = async(limit, page) =>{
    if(!mongoDBClient){
        await connectToMongoDB();
    }
    try {
        const cursor = mongoDBClient.db("DBHAribo").collection("PedidosPorDespachar").find();
        return cursor.sort({nombre: 1})
                     .skip(page > 0 ? ((page-1) * limit) : 0)
                     .limit(limit)
                     .toArray();
        
    } catch (e) {
        console.log("Error extrayendo proyectos desde MongoDB. ");
        console.log(e);
        await closeMongoDB();
    }
}