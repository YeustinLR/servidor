<<<<<<< HEAD
//	./models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
=======
import { Schema, model } from "mongoose";

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },

>>>>>>> c2e687906a69f28a13c6570eeee13500ee836768
    },
    password: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true,
<<<<<<< HEAD
        minlength: 6,
        maxlength: 6,
=======
        minlength: 6, // El PIN debe tener al menos 6 dígitos
        maxlength: 6, // El PIN debe tener como máximo 6 dígitos
>>>>>>> c2e687906a69f28a13c6570eeee13500ee836768
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
<<<<<<< HEAD
});


export const User = model('User', userSchema);
=======

});

export const User = model('user', userSchema);


>>>>>>> c2e687906a69f28a13c6570eeee13500ee836768
