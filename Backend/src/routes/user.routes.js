import { Router } from "express";

import {
    createUser,
    getUsers,
    getUserByEmail,
    updateUser,
    deleteUser
} from "../controllers/user.controllers.js";

const router = Router();

// Rutas para administrar usuarios
router.post("/user", createUser); // Crear un nuevo usuario
router.get("/user", getUsers); // Obtener todos los usuarios
router.get("/user/:correo", getUserByEmail); // Obtener un usuarios por correo
router.put("/user/:correo", updateUser); // Actualizar un usuarios por correo
router.delete("/user/:correo", deleteUser); // Eliminar un usuarios por correo

export default router;