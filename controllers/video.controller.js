// ./controllers/video.controller.js
import { Video } from "../models/Video.js";
import youtubeSearch from "youtube-api-v3-search";

export const agregarVideo = async (req, res) => {
    const { nombre, urlYoutube } = req.body;
    const usuarioId = req.user;

    try {
        // Extraer el ID del video de la URL
        const videoId = obtenerVideoIdDesdeUrl(urlYoutube);

        if (!videoId) {
            return res
                .status(400)
                .json({ errors: [{ msg: "URL de YouTube no válida" }] });
        }

        // Buscar el video en YouTube por el ID
        const apiKey = process.env.YOUTUBE_API_KEY;
        const result = await youtubeSearch(apiKey, {
            q: videoId,
            maxResults: 1,
        });

        if (!result || !result.items || result.items.length === 0) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Video de YouTube no encontrado" }] });
        }

        const video = new Video({
            nombre,
            urlYoutube: `https://www.youtube.com/watch?v=${videoId}`,
            usuario: usuarioId,
        });

        await video.save();

        res.json({ msg: "Video de YouTube agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el video:", error);
        res.status(500).send("Error del servidor");
    }
};

// Función para extraer el ID del video desde la URL
function obtenerVideoIdDesdeUrl(url) {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
}

// Resto de tu código para editar y eliminar videos...

export const editarVideo = async (req, res) => {
    const { id } = req.params;
    const { nombre, urlYoutube } = req.body;
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        let video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ msg: "Video no encontrado" });
        }
        if (video.usuario.toString() !== usuarioId.toString()) {
            return res
                .status(401)
                .json({ msg: "No tienes permisos para editar este video" });
        }

        video.nombre = nombre;
        video.urlYoutube = urlYoutube;

        await video.save();

        res.json({ msg: "Video editado correctamente" });
    } catch (error) {
        console.error("Error al editar el video:", error);
        res.status(500).send("Error del servidor");
    }
};

export const eliminarVideo = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        let video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ msg: "Video no encontrado" });
        }

        if (video.usuario.toString() !== usuarioId.toString()) {
            return res
                .status(401)
                .json({ msg: "No tienes permisos para editar este video" });
        }
        await video.remove();

        res.json({ msg: "Video eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el video:", error);
        res.status(500).send("Error del servidor");
    }
};
export const obtenerVideosPorUsuario = async (req, res) => {
    const usuarioId = req.user; // Obtener el ID del usuario que realiza la petición

    try {
        const videos = await Video.find({ usuario: usuarioId });
        res.json(videos);
    } catch (error) {
        console.error('Error al obtener los videos del usuario:', error);
        res.status(500).send('Error del servidor');
    }
};
