import mongoose from "mongoose";

async function conectDB() {
    try {
        await mongoose.connect(process.env.URI_MONGO);
        console.log("Conexión a la base de datos proyectDB📲🛡️");
    } catch (error) {
        console.log("Error de conexión a mongodb: " + error);
    }
}

export default conectDB;
