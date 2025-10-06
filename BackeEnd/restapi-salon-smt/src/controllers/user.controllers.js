import { User } from "../models/user.models.js";

// Crea un usuario de la base de datos
export const createUser = (req, res) => {
   const user = new User(req.body);
   user.save() // Guardar el usuario en la base de datos
         .then(() => res.json({ // Envía una respuesta existosa.
            success: true,
            message: "Se creó el usuario correctamente"
         }))
         .catch ((error) => res.status(500).json({ // Envía una respuesta de error. Usa código 500 en errores del servidor.
            success: false,
            message: error.message || "Ocurrió un error al crear al usuario"
         }));
};

export const getUsers = (req, res) => {
   User
      .find() // Busca todos los usuarios en la base de datos
      .then((users) => res.json({ success: true, data: users })) // Devuelve los usuarios
      .catch((error) => res.json({ success: false, message: error.message || "Ocurrió un error al obtener los usuarios" })); // Devuelve un error si no se obtienen los usuarios.
};

export const getUserByEmail = (req, res) => {
   const { correo } = req.params; // Obtiene el correo de los parámetros de la solicitud
   User
      .findOne({ correo }) // Busca un usuario por su correo
      .then((user) => res.json({ success: true, data: user })) // Devuelve el usuario encontrado
      .catch((error) => res.json({ success: false, message: error.message || "Ocurrió un error al obtener el usuario" })); // Devuelve un error si no se obtiene el usuario.
};

export const updateUser = (req, res) => {
   const { correo } = req.params; // Obtiene el correo de los parámetros de la solicitud
   const updateData = req.body; // Obtiene los datos a actualizar del cuerpo de la solicitud

   User
      .findOneAndUpdate(
         { correo },  // Busca un usuario por su correo
         { $set: updateData },  // Actualiza los datos del usuario
         { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta validaciones
      ) .then((updatedUser) => {
         if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
         }
         res.json({ success: true, data: updatedUser, message: "Usuario actualizado" });
      }) .catch((error) => res.status(500).json({ success: false, message: error.message || "Ocurrió un error al actualizar el usuario" })); // Devuelve un error si no se actualiza el usuario.
};

export const deleteUser = (req, res) => {
   const { correo } =  req.params; // Obtiene el correo de los parámetros de la solicitud
   User
      .deleteOne({ correo: correo }) // Elimina un usuario por su correo
      .then((result) => res.json({ success: true, data: result, message: "Usuario eliminado" }))
      .catch((error) => res.json({ success: false, message: error.message || "Ocurrió un error al eliminar el usuario" })); // Devuelve un error si no se elimina el usuario.
};