
import { ObjectId } from "mongodb";

// GET ALL 
export const getAllUsersCtrl = async (req, res) => {
    // ir a BBDD y devolver TODOS los users
    const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    const users = await col.find().toArray(); // busco TODOS y lo paso a array
    res.json(users); // devuelvo el resultado al cliente
}

// =================================

export const createUsersCtrl = async (req, res) => {
    const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    const r = await col.insertOne(req.body); // aqui falta VALIDAR el body
    res.json({ id: r.insertedId }); // devuelvo el ID insertado para que el cliente sepa
}

// ================================= 

export const getUserByIdCtrl = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    if (id.length === 12 || id.length === 24 ) {
        const o_id = ObjectId(id); // genero un ObjectId de MongoDB. Controlar el pete del ID
        const user = await col.findOne(o_id);
        if (user === null) {
            res.status(404).json({ error: 'No existe ese usuario' });
        } else {
            res.json(user);
        }
    }else{
        res.status(400).json({ error: 'El ID no tiene el formato correcto'});
    }

}

// =================================

export const updateUserByIdCtrl = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
    const col = db.collection('users'); // cojo la collection
    if (id.length === 12 || id.length === 24 ) {
        const o_id = ObjectId(id); // Se transforma en un objeto para poder buscarlo y se guarda en una variable, que es o_id
        const newUser = await col.updatedOne(o_id,{ $set: req.body}); //devuelve el objeto ya transformado.
        if (User === null) {
            res.status(404).json({ error: 'No existe ese usuario' });
        } else {
            res.json(user);
        }
    }else{
        res.status(400).json({ error: 'El ID no tiene el formato correcto'});
    }
}


export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const db = req.app.locals.ddbbClient.db('final-project-users'); 
    const col = db.collection('users'); 
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
// // 
// // GET ALL
// export const getAllUsersCtrl = async (req, res) => {
//     // ir a BBDD y devolver TODOS los estudiantes
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     const users = await col.find().toArray(); // busco TODOS y lo paso a array
//     res.json(users); // devuelvo el resultado al cliente
// }

// export const createUsersCtrl = async (req, res) => {
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     const r = await col.insertOne(req.body); // aqui falta VALIDAR el body
//     res.json({ id: r.insertedId }); // devuelvo el ID insertado para que el cliente sepa
// }

// export const getUsersByIdCtrl = async (req, res) => {
//     const { id } = req.params;
//     const db = req.app.locals.ddbbClient.db('final-project-users'); // cojo la BBDD
//     const col = db.collection('users'); // cojo la collection
//     if (id.length === 12 || id.length === 24 ) {
//         const o_id = ObjectId(id); // genero un ObjectId de MongoDB. Controlar el pete del ID
//         const users = await col.findOne(o_id);
//         if (users === null) {
//             res.status(404).json({ error: 'No existe ese usuario' });
//         } else {
//             res.json(users);
//         }
//     }else{
//         res.status(400).json({ error: 'El ID no tiene el formato correcto'});
//     }

// }
