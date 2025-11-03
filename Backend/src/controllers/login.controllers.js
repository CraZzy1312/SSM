import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from 'nodemailer'

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

        const resultUser = { id_user: user._id, nombre: user.nombre, correo: user.correo, isAdmin: user.isAdmin };

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

export const forgetPassword = async(req, res) =>{
    const {correo} = req.body;
    try {
        const user = await User.findOne({correo: correo})
        if (!user){
           return res.status(200).json({success: false, message: "No existe un usuario registrado con ese correo"});
        }
        else{
            const newPassword = crypto.randomBytes(16).toString('base64').replace(/[/+=]/g, '').slice(0,12);
            user.contraseña = newPassword;
            await user.save();
            const transporter = nodemailer.createTransport({service: "gmail", auth: {user: process.env.CORREO, pass: process.env.PASSWORD }});
            const subject = "Recuperación de Contraseña";
            const message = 'Su nueva contraseña temporal es: ${newPassword}\n\n \
                Por seguridad, por favor cambioe esta contraseña después de iniciar sesión.';
            const html = `
                <h2>Recuperación de Contraseña</h2>
                <p>Su nueva contraseña temporal es: <strong>${newPassword}</strong></p>
                <p>Por seguridad, por favor cambie esta contraseña después de iniciar sesión.</p>
                <br>
                <p>Si usted no solicitó este cambio, por favor contacte al administrador inmediatamente.</p>
                <p>Atentamente,</p>
                <p>${process.env.NOMBRE_REMITENTE}</p> 
                <p>Equipo de Coordinación de Eventos</p>
            `;
            const mailOptions = {
            from: {
               name: process.env.NOMBRE_REMITENTE,
               address: process.env.CORREO
            },
                to: correo,
                subject,
                text: message,
                html: html
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({success: true, message: "Se realizo la recuperación de los datos."});
        };
    } catch(error){
        return res.status(400).json({success: false, message: error.message || "Ocurrió un error en la recuperación de los datos"})
    };
};

