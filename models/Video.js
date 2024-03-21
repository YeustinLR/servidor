//	./models/Video.js
import { Schema, model } from "mongoose";

const videoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    urlYoutube: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // Otros campos necesarios para el video
});

export const Video = model("Video", videoSchema);
