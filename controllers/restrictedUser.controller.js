// ./controllers/video.controller.js
import RestrictedUser from "../models/RestrictedUser.js";
// Función para crear un nuevo RestrictedUser
export const crearRestrictedUser = async (req, res) => {
    const { nombreCompleto, pin, avatar, edad, usuario } = req.body;
    const usuarioId = req.user;

    try {

        const restrictedUser = new RestrictedUser({
            nombreCompleto,
            pin,
            avatar,
            edad,
            usuario: usuarioId,
        });
        await restrictedUser.save();
        res.status(201).json(restrictedUser);
    } catch (error) {
        console.error("Error al crear el RestrictedUser:", error);
        res.status(500).send("Error del servidor");
    }
};
// Función para obtener todos los RestrictedUsers asociados al usuario actual
export const obtenerRestrictedUsers = async (req, res) => {
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        const restrictedUsers = await RestrictedUser.find({ usuario: usuarioId });
        res.json(restrictedUsers);
    } catch (error) {
        console.error('Error al obtener los RestrictedUsers:', error);
        res.status(500).send('Error del servidor');
    }
};

// Función para obtener un RestrictedUser por su ID
export const obtenerRestrictedUserPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        const restrictedUser = await RestrictedUser.findOne({ _id: id, usuario: usuarioId });
        if (!restrictedUser) {
            return res.status(404).json({ msg: 'RestrictedUser no encontrado' });
        }
        res.json(restrictedUser);
    } catch (error) {
        console.error('Error al obtener el RestrictedUser:', error);
        res.status(500).send('Error del servidor');
    }
};

// Función para actualizar un RestrictedUser por su ID
export const actualizarRestrictedUser = async (req, res) => {
    const { id } = req.params;
    const { nombreCompleto, pin, avatar, edad } = req.body;
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        let restrictedUser = await RestrictedUser.findOne({ _id: id, usuario: usuarioId });
        if (!restrictedUser) {
            return res.status(404).json({ msg: 'RestrictedUser no encontrado' });
        }

        restrictedUser.nombreCompleto = nombreCompleto;
        restrictedUser.pin = pin;
        restrictedUser.avatar = avatar;
        restrictedUser.edad = edad;

        await restrictedUser.save();

        res.json({ msg: 'RestrictedUser actualizado correctamente', restrictedUser });
    } catch (error) {
        console.error('Error al actualizar el RestrictedUser:', error);
        res.status(500).send('Error del servidor');
    }
};

// Función para eliminar un RestrictedUser por su ID
export const eliminarRestrictedUser = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        const restrictedUser = await RestrictedUser.findById(id);
        if (!restrictedUser) {
            return res.status(404).json({ msg: 'RestrictedUser no encontrado' });
        }

        // Verificar si el ID del usuario coincide con el usuario del RestrictedUser
        if (restrictedUser.usuario.toString() !== usuarioId.toString()) {
            return res.status(401).json({ msg: 'No tienes permisos para eliminar este RestrictedUser' });
        }

        // Si la condición se cumple, proceder con la eliminación
        const deletedUser = await RestrictedUser.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ msg: 'RestrictedUser no encontrado' });
        }

        res.json({ msg: 'RestrictedUser eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el RestrictedUser:', error);
        res.status(500).send('Error del servidor');
    }
};
