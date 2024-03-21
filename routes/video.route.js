//	./routes/video.routes.js
import { Router } from "express";
import { body, param } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import {
    agregarVideo,
    editarVideo,
    eliminarVideo,
} from "../controllers/video.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post(
    "/agregar",
    [
        body("nombre", "El nombre del video es requerido").not().isEmpty(),
        body("urlYoutube", "La URL de YouTube es requerida").not().isEmpty(),
    ],
    validationResultExpress,
    agregarVideo
);

router.put(
    "/editar/:id",
    [
        param("id", "ID de video inválido").isMongoId(),
        body("nombre", "El nombre del video es requerido").not().isEmpty(),
        body("urlYoutube", "La URL de YouTube es requerida").not().isEmpty(),
    ],
    validationResultExpress,
    editarVideo
);

router.delete(
    "/eliminar/:id",
    param("id", "ID de video inválido").isMongoId(),
    eliminarVideo
);

export default router;
