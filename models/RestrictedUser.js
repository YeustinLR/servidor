//	./models/RestrictedUser.js

import { Schema, model } from 'mongoose';

const restrictedUserSchema = new Schema({
    nombreCompleto: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    avatar: {
        type: String, // Puedes ajustar el tipo según dónde almacenes la imagen
    },
    edad: {
        type: Number,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const RestrictedUser = model('RestrictedUser', restrictedUserSchema);

export default RestrictedUser;
