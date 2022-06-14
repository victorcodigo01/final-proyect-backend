import { createUser, getUserByEmailNoStatus, retrieveSuccessUserByEmailAndPassword, validateUser } from '../users/users.controller.js';
import { generateValidationToken, encodePassword } from './auth.utils.js';
import { sendValidationEmail } from '../adapters/email.js';
import { jwt_secret } from './auth.secrets.js';
import { client } from "../index.js";
// importo la librería JWT para generar un token JWT
import jwt from 'jsonwebtoken';
const DATABASE_NAME = 'final-project';
const COLLECTION_NAME = 'validate-token';
/**
 * 1. Van a venir los datos de registro en el body. Habrá que validar el body
 * 2. Generar la entidad usuario y guardarla en BBDD
 * 3. Generar un token de validación y guardarlo en BBDD asociado al usuario
 * 4. Enviar un email con la URL de validación
 */
export const registerCtrl = async (req, res) => {
    try {
        const user = await getUserByEmailNoStatus(req.body.email);
        if (user === null) {
            req.body.password = encodePassword(req.body.password);
            await createUser({ ...req.body, status: 'PENDING_VALIDATION' }); // paso 2
            // paso 3
            const token = generateValidationToken();
            await createValidationToken(token, req.body.email);
            // paso 4
            //ojo que el host es el de nuestra aplicación de react
            sendValidationEmail(req.body.email, `http://localhost:3000/validate?token=${token}`)
            res.sendStatus(201);
        } else {
            // mando un 409(conflict) porque ya existe el usuario en BBDD
            res.sendStatus(409);
        }
    } catch (err) {
        console.err(err);
        res.sendStatus(500);
    }
}
/**
 * 1. Obtener el token
 * 2. Validar que existe en BBDD y obtener su usuario asociad
 * 3. Eliminar el token de la BBDD
 * 4. Actualizar el usuario cambiando el estado a SUCCESS
 */
export const validateEmailCtrl = async (req, res) => {
    const { token } = req.query; // paso 1
    const valToken = await retrieveValidationToken(token); // paso 2
    if (valToken !== null) {
        // existe token
        await deleteValidationToken(token); // paso 3
        await validateUser(valToken.user); // paso 4
        res.send(200);
    } else {
        res.sendStatus(404);
    }
}
/**
 * 1. verificar que existe el usuario con su pass y ademas tiene un estado
 *    SUCCESS
 *  a. encriptar la pass del body
 * 2. Generar un token JWT
 * 3. Devolverlo al usuario
 */
export const loginCtrl = async (req, res) => {
    const { email, password } = req.body;
    // paso 1
    const user = await retrieveSuccessUserByEmailAndPassword(email, encodePassword(password));
    if (user !== null) {
        // existe el usuario con esas condiciones
        const token = jwt.sign({ email: user.email, hola:'bootcamp' }, jwt_secret); // paso 2
        res.status(201).json({ access_token: token }); // paso 3
    } else {
        res.sendStatus(404);
    }
}
//FUNCIONES DEL MODEL.
export const createValidationToken = async (token, userName) => {
    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.insertOne({ // asociamos el token al usuario en la BBDD
            token,
            user: userName
        });
    }catch(err){
        console.error(err);
    }finally{
        client.close();
    }
}
// devuelve el token o null si no existe
export const retrieveValidationToken = async (token) => {
    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.findOne({token});
    }catch(err){
        console.error(err);
    }finally{
        client.close();
    }
}
// borra el token de la BBDD
export const deleteValidationToken = async (token) => {
    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.deleteOne({token});
    }catch(err){
        console.error(err);
    }finally{
        client.close();
    }
}










// // import { createUser, getUserByEmailNoStatus, retrieveSuccessUserByEmailAndPassword, validateUser } from '../users/users.model.js';
// // import { createValidationToken, retrieveValidationToken, deleteValidationToken } from './auth.model.js';
// import { generateValidationToken, encodePassword } from './auth.utils.js';
// import { sendValidationEmail } from '../adapters/email.js';
// import { jwt_secret } from './auth.secrets.js';
// import {MongoClient} from 'mongodb';
// // importo la librería JWT para generar un token JWT
// import jwt from 'jsonwebtoken';

// const DATABASE_NAME = "final-project-users";
// const COLLECTION_USERS = "users";
// const COLLECTION_TOKEN = "validate-token";

// /**
//  * 1. Van a venir los datos de registro en el body. Habrá que validar el body
//  * 2. Generar la entidad usuario y guardarla en BBDD
//  * 3. Generar un token de validación y guardarlo en BBDD asociado al usuario
//  * 4. Enviar un email con la URL de validación
//  */
// export const registerCtrl = async (req, res) => {
//     try {
         
//             const db = req.app.locals.ddbbClient.db(DATABASE_NAME);
//             const col = db.collection(COLLECTION_USERS);
//             const user = await col.findOne({ email: req.body.email });

//         if (user === null) {

//             req.body.password = encodePassword(req.body.password);
//             await col.insertOne({...req.body, status: 'PENDING_VALIDATION'}) //paso 2
            
//             // paso 3
//             const token = generateValidationToken();
//             const tokens = db.collection(COLLECTION_TOKEN);
//             await tokens.insertOne({ //asociamos el token a un usuario en la BBDD
//                 token,
//                 user: req.body.email
//             })

//             // // paso 4
//             // //ojo que el host es el de nuestra aplicación de react
//             sendValidationEmail(req.body.email, `http://localhost:3000/validate?token=${token}`)
//             res.sendStatus(201);
//         } else {
//             // mando un 409(conflict) porque ya existe el usuario en BBDD
//             res.sendStatus(409);
//         }
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// }

// /**
//  * 1. Obtener el token
//  * 2. Validar que existe en BBDD y obtener su usuario asociad
//  * 3. Eliminar el token de la BBDD
//  * 4. Actualizar el usuario cambiando el estado a SUCCESS
//  */
// export const validateEmailCtrl = async (req, res) => {
//     const { token } = req.query; // paso 1
//     const db = req.app.locals.ddbbClient.db(DATABASE_NAME);
//     const tokens = db.colletion(COLLECTION_TOKEN);
//     const tokenInfo = await tokens.findOne({token}) // paso 2
//     if (tokenInfo !== null) {
//         // existe token

//         // paso 3
//         await validateUser(valToken.user); // paso 4
//         res.send(200);
//     } else {
//         res.sendStatus(404);
//     }
// }

// /**
//  * 1. verificar que existe el usuario con su pass y ademas tiene un estado
//  *    SUCCESS
//  *  a. encriptar la pass del body
//  * 2. Generar un token JWT
//  * 3. Devolverlo al usuario
//  */
// export const loginCtrl = async (req, res) => {
//     const { email, password } = req.body;
//     // paso 1
//     const user = await retrieveSuccessUserByEmailAndPassword(email, encodePassword(password));
//     if (user !== null) {
//         // existe el usuario con esas condiciones
//         const token = jwt.sign({ email: user.email, hola:'bootcamp' }, jwt_secret); // paso 2
//         res.status(201).json({ access_token: token }); // paso 3
//     } else {
//         res.sendStatus(404);
//     }
// }




// const URI = 'mongodb+srv://demo_bootcamp:demo_bootcamp@learning.c7hty.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(URI);

// export const createValidationToken = async (token, userName) => {
//     try{
//         await client.connect();
//         const db = client.db(DATABASE_NAME);
//         const tokens = db.collection(COLLECTION_NAME);
//         return await tokens.insertOne({ // asociamos el token al usuario en la BBDD
//             token,
//             user: userName
//         });
//     }catch(err){
//         console.error(err);
//     }finally{
//         client.close();
//     }
// }

// // devuelve el token o null si no existe
// export const retrieveValidationToken = async (token) => {
//     try{
//         await client.connect();
//         const db = client.db(DATABASE_NAME);
//         const tokens = db.collection(COLLECTION_NAME);
//         return await tokens.findOne({token});
//     }catch(err){
//         console.error(err);
//     }finally{
//         client.close();
//     }
// }

// // borra el token de la BBDD
// export const deleteValidationToken = async (token) => {
//     try{
//         await client.connect();
//         const db = client.db(DATABASE_NAME);
//         const tokens = db.collection(COLLECTION_NAME);
//         return await tokens.deleteOne({token});
//     }catch(err){
//         console.error(err);
//     }finally{
//         client.close();
//     }
// }

// //AUTENTICATION ===========================
// export const createUser = async (user) => {
//     try  {
//         await client.connect();
//         const db = client.db(DATABASE_NAME);
//         const users = db.collection(COLLECTION_NAME);
//         return await users.insertOne(user);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
//     }
// }

// export const getUserByEmailNoStatus = async (email) => {
//     try {
//         //await.client.connect();
//         const db = req.app.locals.ddbbClient.db ('final-project-users'); //cojo la BBDD
//         const col = db.collection('users'); //cojo la collection
//             return await col.findOne({email})
//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
//     }
// }

// //actualiza al usuario cambiando su estado a success
// export const validateUser = async (email) => {
//     try {
//         //await.client.connect();
//         const db = req.app.locals.ddbbClient.db ('final-project-users'); //cojo la BBDD
//         const col = db.collection('users'); //cojo la collection
//           //create a document that sets the plot of the movie
//         const updateEmotions = {
//             $set: { 
//                 status: 'success' 
//             },
//         };

//     return await col.updateOne({email}, updateEmotions);

//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
//     }
// }

// //devuelve el usuario de BBDD que esté en estado success y además coincida
// // con el email y el password que me mandan.

// export const retrieveSuccessUserByEmailAndPassword = async (email, password) => {
//     try {
//         //await.client.connect();
//         const db = req.app.locals.ddbbClient.db ('final-project-users'); //cojo la BBDD
//         const col = db.collection('users'); //cojo la collection
//         const query = {
//            email,
//            password,
//            status: 'SUCCESS',
//         };
//         return await col.findOne(query);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
//     }
// }

// export const retrieveUserInfoByEmail = async (email) => {
//     try {
//         //await.client.connect();
//         const db = req.app.locals.ddbbClient.db ('final-project-users'); //cojo la BBDD
//         const col = db.collection('users'); //cojo la collection
//         const query = { email };
//         const options = { projection: { _id: 0, password: 0, status: 0 } };
//         return await col.findOne(query, options);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
        
//     }
// }


// export const getUserInfo = async (req, res) ; ()=> {
// // llamo al usuario
// try {
//     const user = await retrieveUserInfoByEmail(req.email); //¿esto sale de una cosa q se llama Middleware?
//     res.json(user); // devuelvo la info del usuario
// } catch (err) {
//     console.error(err);
//     res.sendStatus(500);

// }
// };
