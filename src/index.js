 
import { app } from "./app.js";
import { MongoClient } from "mongodb";
import 'dotenv/config';

const MONGO_URI = 'mongodb+srv://victor427:R-idwUeCrUQH93w@cluster0.exmfrq9.mongodb.net/?retryWrites=true&w=majority';
export const client = new MongoClient(MONGO_URI);


async function start(){
    try{
        await client.connect(); // 1. conectamos el cliente
        app.locals.ddbbClient = client; // 2. lo guardamos en el locals para que se acceda desde las rutas
        app.listen(3001, () => console.log('Servidor del index levantado en el 3001'));
    }catch(err){
        console.log('Error en el servidor:');
    }
}


async function stop(){
    console.error('Estás cerrando el servidor');
    await client.close(); // cerramos al conexión con la BBDD
}

process.on('SIGINT', stop); // eventos del SO cuando hacemos ctrl+c
process.on('SIGTERM', stop);

start(); // lamamos a la función start que inicia todo (BBDD y Server de express)





// import { MongoClient } from 'mongodb';
// import { app } from "./app.js";

// const URI = 'mongodb+srv://victor427:R-idwUeCrUQH93w@cluster0.exmfrq9.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(URI);



// async function start(){
//     try{
//         await client.connect(); // 1. conectamos el cliente
//         app.locals.ddbbClient = client; // 2. lo guardamos en el locals para que se acceda desde las rutas
//         app.listen(3001, () => console.log('Servidor levantado en el 3001'));
//     }catch(err){
//         console.log('Error en el servidor: ', err);
//     }
// }


// async function stop(){
//     console.log('Cerrando el servidor');
//     await client.close(); // cerramos al conexión con la BBDD
// }

// process.on('SIGINT', stop); // eventos del SO cuando hacemos ctrl+c
// process.on('SIGTERM', stop);

// start(); // lamamos a la función start que inicia todo (BBDD y Server de express)
