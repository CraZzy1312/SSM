import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
    nombreSolicitante: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: {  type: String, required: true },
    fechaSolicitud: { type: Date, required: true },
    descripcionEvento: { type: String, required: true },
    fechaEvento: { type: Date, required: true },
    estado: { type: String, required: true, enum: ["pendiente", "pago pendiente", "aprobado", "cancelado", "rechazado"]
        , default: "pendiente" },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
});

export const Event = mongoose.model("Event", eventSchema);
