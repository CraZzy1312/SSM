import { Event } from "../models/event.models.js";
import nodemailer from "nodemailer"
// Crea una solicitud de evento en la base de datos
export const createEvent = async (req, res) => {
   const { fechaEvento } = req.body;
   try{
      const existingEvent = await Event.findOne({ fechaEvento });
      if (existingEvent) {
         return res.status(400).json({ success: false, message: "Ya existe un evento programado para esta fecha" });
      }
      else {
         const event = new Event(req.body);
         event.save() // Guardar el evento en la base de datos
         .then(() => res.status(201).json({ success: true, message: "Solicitud de evento creada exitosamente" }))
         .catch((error) => res.status(500).json({ success: false, message: error.message || "Ocurrió un error al crear la solicitud de evento" }));
      }
   } catch (error) {
      res.status(500).json({ success: false, message: error.message || "Ocurrió un error al crear la solicitud de evento" });
   }
};

// Obtiene todas las solicitudes de eventos desde la base de datos
export const getAllEvents = async (req, res) => {
    try {
         const events = await Event.find({estado: {$in: ["Solicitud", "Pago pendiente", "Reservado"]}});
         res.json({ success: true, data: events });
    } catch (error) {
         res.status(500).json({ success: false, message: error.message || "Ocurrió un error al obtener las solicitudes de eventos" });
    }
};

export const getDataOfEvent = async (req, res) => {
      const { id } = req.params;
      try {
             const event = await Event.findById(id);
             if (!event){
                  return res.status(400).json({ success: false, message: "No se encontro el evento indicado"})
             }
             else{
               const result = {id: event._id, nombreSol: event.nombreSolicitante, telefono: event.telefono
                     , correo: event.correo, fechaSolicitud: event.fechaSolicitud, descripcion: event.descripcionEvento,
                     fechaEvento: event.fechaEvento
               };
               return res.status(200).json({success: true, message: "Evento encontrado" ,data: result });
             }
      }
      catch(error){
         res.status(400).json({ success: false, message: error.message || "Ocurrio un error al obtener un evento"});

      }
};
// Actualiza el estado del evento
export const updateStateEvent = async (req, res) => {
    const { id } = req.params;
    const { newState } = req.body;
    console.log(newState);
    try {
         const event = await Event.findByIdAndUpdate({_id: id}, { $set: {estado: newState }}, {new: true});
         if (!event) {
            return res.status(404).json({ success: false, message: "Solicitud de evento no encontrada" });
         }
         res.status(200).json({ success: true, message: "Estado de solicitud de evento actualizada exitosamente", data: event });
      } catch (error) {
         res.status(500).json({ success: false, message: error.message || "Ocurrió un error al actualizar la solicitud de evento" });
      }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
         const event = await Event.findByIdAndUpdate(id, req.body, {new: true});
         if (!event) {
            return res.status(404).json({ success: false, message: "Solicitud de evento no encontrada" });
         }
         res.status(200).json({ success: true, message: "Solicitud de evento actualizada exitosamente", data: event });
      } catch (error) {
         res.status(500).json({ success: false, message: error.message || "Ocurrió un error al actualizar la solicitud de evento" });
      }
};

// Al rechazar un evento y dar su motivo;
export const rejectEvent = async (req, res) =>{
   const { id } = req.params;
   const { reason, correo, fecha} = req.body;
   try {
      const event = await Event.findByIdAndUpdate(id, { $set: {estado: "rechazado"}}, {new: true});
      if (!event){
         return res.status(400).json({success: false, message: "No se encontro el evento ha rechazar"});
      }
      else{
         const transporter = nodemailer.createTransport({service: "gmail", auth: {user: process.env.CORREO, pass: process.env.PASSWORD }});
         const subject = "Actualización sobre su solicitud de evento";
         const message = `
         Estimado/a solicitante,

         Lamentamos informarle que su solicitud para la reserva del evento programado para el día ${fecha} ha sido rechazada.

         Motivo del rechazo:
         ${reason}

         Agradecemos su comprensión y le invitamos a comunicarse con nosotros si desea más información o desea realizar una nueva solicitud en otra fecha.

         Atentamente,
         ${process.env.NOMBRE_REMITENTE} 
         Equipo de Coordinación de Eventos
         `;

         const mailOptions = {
         from: {
            name: process.env.NOMBRE_REMITENTE,
            address: process.env.CORREO
         },
         to: correo,
         subject,
         text: message
         };
         await transporter.sendMail(mailOptions);
         return res.status(200).json({ success: true, message: "Rechazo del evento de la fecha " + fecha , data: event});
         //TODO  Envio de un dato con un correo.
      }
   }
   catch(error){
      console.log("Error: "+error.message)
      return res.status(402).json({ success: false, message: error.message || "Ocurrió un error al rechazar evento"});
   } 
};

