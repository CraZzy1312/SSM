import { User } from "../models/user.models.js";


export const loginUser = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        
        const isMatch = await user.comparePassword(contraseña);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }
        
        const resultUser = { nombre: user.nombre, correo: user.correo, isAdmin: user.isAdmin };

        res.json({ success: true, message: "Inicio de sesión exitoso", data: resultUser });
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
    const { correo } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await User.findOne({ correo });
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

