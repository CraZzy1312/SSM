import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "ZJuLinWlYYc9YXKEUnWk5U"

export const loginUser = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        
        const user = await User.findOne({ correo }).select("+contraseña");
        const isMatch = await user.comparePassword(contraseña);

        if (!user || !isMatch) {
            return res.status(401).json({ success: false, message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.idAdmin },
            JWT_SECRET,
            { expiresIn: "1d" } // Duracion del token (ej. 1 dia)
        );

        const resultUser = { nombre: user.nombre, correo: user.correo, isAdmin: user.isAdmin };

        res.json({ 
            success: true, 
            message: "Inicio de sesión exitoso", 
            data: resultUser 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Ocurrió un error al iniciar sesión" });
    }
};

export const singupUser = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    try {
    
        const existingUser = await User.findOne({ correo });
    
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Este correo ya se encuentra registrado" });
        }
    
        const newUser = new User({ nombre, correo, contraseña, isAdmin: false });
    
        await newUser.save();
    
        res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Ocurrió un error al registrar el usuario" });
    }
};

export const changePassword = async (req, res) => {
    const userId = req.user.id;
    const { newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        user.contraseña = newPassword;
        await user.save();
        res.json({ success: true, message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Ocurrió un error al cambiar la contraseña" });
    }
};

