
import { client } from "../index.js";
const DATABASE_NAME = 'final-project';
const COLLECTION_NAME = 'users';
export const getUserInfo = async (req, res) => {
    // llamo al usuario
    try {
        const user = await retrieveUserInfoByEmail(req.email); // ¿Esto sale de una cosa que se llama Middleware?
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export const createUser = async (user) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(user);
    } catch (err) {
        console.error(err);
    } 
}
// devuelve el usuario sin tener en cuenta el status o null si no existe
export const getUserByEmailNoStatus = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.findOne({ email });
    } catch (err) {
        console.error(err);
    } 
}
// actualiza el usuario cambiando su estaso a success
export const validateUser = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            },
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}
// devuelve el usuario de BBDDD que esté en estado succes y además coincida
// con el email y con password que me mandan. 
export const retrieveSuccessUserByEmailAndPassword = async (email, password) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}
export const retrieveUserInfoByEmail = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email };
        const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await users.findOne(query, options);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}


export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db(DATABASE_NAME); 
    const col = db.collection(COLLECTION_NAME); 
    if(id.length === 12 || id.length === 24){
        const o_id = ObjectId(id)
        const r = await col.deleteOne({_id : o_id}); 
            res.status(200).json(r) 
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
    }
}





// import { ObjectId } from "mongodb";

// // GET ALL 
// export const getAllUsersCtrl = async (req, res) => {
//     // ir a BBDD y devolver TODOS los users
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     const users = await col.find().toArray(); // busco TODOS y lo paso a array
//     res.json(users); // devuelvo el resultado al cliente
// }

// // =================================

// export const createUsersCtrl = async (req, res) => {
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     const r = await col.insertOne(req.body); // aqui falta VALIDAR el body
//     res.json({ id: r.insertedId }); // devuelvo el ID insertado para que el cliente sepa
// }

// // ================================= 

// export const getUserByIdCtrl = async (req, res) => {
//     const { id } = req.params;
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     if (id.length === 12 || id.length === 24 ) {
//         const o_id = ObjectId(id); // genero un ObjectId de MongoDB. Controlar el pete del ID
//         const user = await col.findOne(o_id);
//         if (user === null) {
//             res.status(404).json({ error: 'No existe ese usuario' });
//         } else {
//             res.json(user);
//         }
//     }else{
//         res.status(400).json({ error: 'El ID no tiene el formato correcto'});
//     }

// }

// // =================================

// export const updateUserByIdCtrl = async (req, res) => {
//     const { id } = req.params;
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     if (id.length === 12 || id.length === 24 ) {
//         const o_id = ObjectId(id); // Se transforma en un objeto para poder buscarlo y se guarda en una variable, que es o_id
//         const newUser = await col.updatedOne(o_id,{ $set: req.body}); //devuelve el objeto ya transformado.
//         if (User === null) {
//             res.status(404).json({ error: 'No existe ese usuario' });
//         } else {
//             res.json(user);
//         }
//     }else{
//         res.status(400).json({ error: 'El ID no tiene el formato correcto'});
//     }
// }


// export const deleteUserById = async (req, res) => {
//     const { id } = req.params;
//     const db = req.app.locals.ddbbClient.db('final-project-users'); 
//     const col = db.collection('users'); 
//     if(id.length === 12 || id.length === 24){
//         const o_id = ObjectId(id)
//         const r = await col.deleteOne({_id : o_id}); 
//             res.status(200).json(r) 
//     }
//     else {
//         res.status(400).json({ error: 'Invalid ID' });
//     }
// }



// // import { ObjectId } from "mongodb";
// // // 
// // // GET ALL
// // export const getAllUsersCtrl = async (req, res) => {
// //     // ir a BBDD y devolver TODOS los estudiantes
// //     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
// //     const col = db.collection('users'); // cojo la collection
// //     const users = await col.find().toArray(); // busco TODOS y lo paso a array
// //     res.json(users); // devuelvo el resultado al cliente
// // }

// // export const createUsersCtrl = async (req, res) => {
// //     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
// //     const col = db.collection('users'); // cojo la collection
// //     const r = await col.insertOne(req.body); // aqui falta VALIDAR el body
// //     res.json({ id: r.insertedId }); // devuelvo el ID insertado para que el cliente sepa
// // }

// // export const getUsersByIdCtrl = async (req, res) => {
// //     const { id } = req.params;
// //     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
// //     const col = db.collection('users'); // cojo la collection
// //     if (id.length === 12 || id.length === 24 ) {
// //         const o_id = ObjectId(id); // genero un ObjectId de MongoDB. Controlar el pete del ID
// //         const users = await col.findOne(o_id);
// //         if (users === null) {
// //             res.status(404).json({ error: 'No existe ese usuario' });
// //         } else {
// //             res.json(users);
// //         }
// //     }else{
// //         res.status(400).json({ error: 'El ID no tiene el formato correcto'});
// //     }

// // }
