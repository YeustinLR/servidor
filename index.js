//Imports se uso Type: module, para evitar el require
import "dotenv/config";
import express from "express";
import conectDB from "./database/conectdb.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

//Conexión del servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🛡️📲 http://localhost:" + PORT));

//Conexión de la base de datos, importando la función.
conectDB();

//Rutas
app.use(express.json()); //Habilita lectura json
app.use("/api/v1/auth", authRoutes);
