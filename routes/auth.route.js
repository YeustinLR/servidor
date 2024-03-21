//	./routes/auth.routes.js
import { Router } from "express";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import {
    register,
    login,
    getUserById,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
//REGISTER
router.post(
    "/register",
    [
        body("email", "Correo electrónico inválido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body(
            "password",
            "La contraseña debe tener al menos 6 caracteres"
        ).isLength({ min: 6 }),
        body("pin", "El PIN debe tener 6 dígitos")
            .isLength({ min: 6, max: 6 })
            .isNumeric(),
        body("nombre", "El nombre es requerido").not().isEmpty(),
        body("apellidos", "Los apellidos son requeridos").not().isEmpty(),
        body("pais", "El país es requerido").not().isEmpty(),
        body("fechaNacimiento", "La fecha de nacimiento es requerida")
            .not()
            .isEmpty(),
    ],
    validationResultExpress,
    register
);

router.get("/register/users/:id", getUserById);

//LOGIN
router.post(
    "/login",
    [
        body("email", "Correo electrónico inválido").isEmail(),
        body("password", "La contraseña es requerida").exists(),
    ],
    validationResultExpress,
    login
);
//PRUEBA LOGIN
router.get("/users/me", authMiddleware, (req, res) => {
    // En este punto, el token ya ha sido verificado y el usuario está autenticado
    const user = req.user;
    res.json({ user });
});

export default router;
