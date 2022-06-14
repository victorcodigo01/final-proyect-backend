
import express from 'express';
import { getUserInfo } from './users.controller.js';
const router = express.Router();
router.route('/')
    .get(getUserInfo)
export default router;


// import express from 'express';
// import { getAllUsersCtrl , createUsersCtrl, getUserByIdCtrl, updateUserByIdCtrl, deleteUserById  } from './users.controller.js';

// const router = express.Router(); // asi creo un router en una variable

// // defino las rutas dentro del router

// router.route('/')
//     .get(getAllUsersCtrl) // Obtener TODOS los estudiantes (R)
//     .post(createUsersCtrl); // crear 1 estudiante (C)

// router.route('/:id')
//     .get(getUserByIdCtrl) // Obtener UN estudiante con un ID concreto (R)
//     .patch(updateUserByIdCtrl) // Actualizar UN estudiante (U)
//     .put(() => {}) // Actualizar UN estudiante (U)
//     .delete(deleteUserById) // Borrar UN estudiante (D)


// export default router; // y lo exporto para que lo use el app u otro router