import { Router } from "express";

import { 
    loginUser,
    singupUser,
    changePassword
} from "../controllers/login.controllers.js";

const router = Router();

// Ruta para el inicio de sesión
router.post("/login", loginUser); // Iniciar sesión
router.post("/singup", singupUser); // Registrar usuario
router.post("/change-password/:correo", changePassword); // Cambiar contraseña
export default router;