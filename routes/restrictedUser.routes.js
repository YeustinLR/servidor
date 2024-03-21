//	./routes/restrictedUser.routes.js
import express from 'express';
import authMiddleware from "../middlewares/authMiddleware.js";

import {
    crearRestrictedUser,
    obtenerRestrictedUsers,
    obtenerRestrictedUserPorId,
    actualizarRestrictedUser,
    eliminarRestrictedUser
} from '../controllers/restrictedUser.controller.js';

const router = express.Router();

// Ruta para crear un nuevo RestrictedUser
router.post('/created',authMiddleware, crearRestrictedUser);

// Ruta para obtener todos los RestrictedUsers
router.get('/get',authMiddleware, obtenerRestrictedUsers);

// Ruta para obtener un RestrictedUser por su ID
router.get('/get/:id',authMiddleware, obtenerRestrictedUserPorId);

// Ruta para actualizar un RestrictedUser por su ID
router.put('/update/:id',authMiddleware, actualizarRestrictedUser);

// Ruta para eliminar un RestrictedUser por su ID
router.delete('/delete/:id',authMiddleware, eliminarRestrictedUser);

export default router;
