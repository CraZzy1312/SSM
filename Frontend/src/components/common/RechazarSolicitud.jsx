import { useState } from "react";

import "../../css/RechazarSolicitud.css";

// Funcion para el manejo del boton aceptar

export default function RechazarSolicitud({ isOpen = true, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="main_container">
      <div className="parte_superior">
        Rechazar solicitud
        <button className="salir_boton" onClick={() => onClose(false)}>
          <b>X</b>
        </button>
      </div>
      <div className="cuerpo_modal_rechazo">
        <div
          style={{
            width: "80%",
            height: "60%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          Motivo del Rechazo:
          <textarea
            className="motivo_rechazo"
            type="text"
            placeholder="Escribe aquí..."
          />
        </div>
        <div className="conjunto_botones">
          <button
            style={{
              backgroundColor: "#757575",
              width: "40%",
              height: "100%",
              cursor: "pointer",
            }}
            onClick={() => onClose(false)}
          >
            Cancelar
          </button>
          <button className="enviar_boton"> Enviar</button>
        </div>
      </div>
    </div>
  );
}
