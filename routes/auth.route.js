import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

router.post("/login", login);

router.post(
    "/register",
    [
        body("email", "Formato email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Formato de password incorrecta.")
            .trim()
            .isLength({ min: 6 }),
    ],
    validationResultExpress,
    register
);

export default router;
