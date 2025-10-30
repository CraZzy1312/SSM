import mongoose from "mongoose";

export const eventSchema = new mongoose.Schema({
    nombreSolicitante: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: {  type: String, required: true },
    fechaSolicitud: { type: Date, required: true },
    descripcionEvento: { type: String, required: true },
    fechaEvento: { type: Date, required: true },
    estado: { type: String, required: true, enum: ["Solicitud", "Pago pendiente", "Reservado", "Cancelada"]
        , default: "Solicitud" },
});

export const Event = mongoose.model("Event", eventSchema);
