import { Schema, model } from "mongoose";

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },

    },
    password: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true,
        minlength: 6, // El PIN debe tener al menos 6 dígitos
        maxlength: 6, // El PIN debe tener como máximo 6 dígitos
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },

});

export const User = model('user', userSchema);


