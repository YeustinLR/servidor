//./controllers/auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

//EndPoints USERS
//Register
export const register = async (req, res) => {
    const { email, password, pin, nombre, apellidos, pais, fechaNacimiento } =
        req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "El usuario ya existe" }] });
        }

        // Validar la edad del usuario
        const birthDate = new Date(fechaNacimiento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear(); // Cambio a let
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        if (age < 18) {
            return res.status(400).json({
                errors: [
                    { msg: "Debes ser mayor de 18 años para registrarte" },
                ],
            });
        }

        // Crear el nuevo usuario
        user = new User({
            email,
            password,
            pin,
            nombre,
            apellidos,
            pais,
            fechaNacimiento,
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send("Error del servidor");
    }
};

//Get Register
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ errors: [{ msg: "Usuario no encontrado" }] });
        }

        res.json(user);
    } catch (error) {
        console.error("Error al obtener el usuario por ID:", error);
        res.status(500).send("Error del servidor");
    }
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//EndPoints lOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el usuario en la base de datos por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Comparar la contraseña encriptada almacenada en la base de datos con la contraseña proporcionada
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Si las contraseñas coinciden, generar un token JWT y devolverlo al cliente
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
