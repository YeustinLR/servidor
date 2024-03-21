//	/server.js
import express from 'express';
import connectDB from './database/connectDB.js';
import authRoutes from './routes/auth.route.js';
import videoRoutes from './routes/video.route.js';
import restrictedUserRoutes from './routes/restrictedUser.routes.js';

import "dotenv/config";

const app = express();

// Middleware
app.use(express.json());
// Habilitar CORS
app.use(cors());

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/video', videoRoutes);
app.use('/api/v1/rUser', restrictedUserRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
