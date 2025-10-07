import jwt from "jsonwebtoken";

const JWT_SECRET = "ZJuLinWlYYc9YXKEUnWk5U"

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ success: false, message: "Acceso denegado. No se proporciono token." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Error de verificacion de token:", err.message);
            return res.status(403).json({ success: false, message: "Token invalido o expirado." });
        }
        req.user = user;
        next();
    })
}