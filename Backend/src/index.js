import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import loginRoutes from "./routes/login.routes.js";
import  eventRoutes  from "./routes/event.routes.js";
import cors from "cors";

dotenv.config(); // Se usa para cargar las variables de entorno.

const app = express(); // Se usa express para conectarse a internet.
app.use(cors({
  origin: "http://localhost:5173" // puerto de Vite
}));
const port = process.env.PORT || 9000; // Se usa para definir el puerto en el que se va a ejecutar el servidor.

app.use(express.json()); // Se usa para que el servidor pueda entender los datos en formato JSON.
app.use(userRoutes); // Se usan las rutas definidas en admin.routes.js
app.use(loginRoutes); // Se usan las rutas definidas en login.routes.js
app.use(eventRoutes); // Se usan las rutas definidas en login.routes.js
// Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

// Se inicia el servidor en el puerto designado.
app.listen(port, () => console.log('Server is running on port', port));