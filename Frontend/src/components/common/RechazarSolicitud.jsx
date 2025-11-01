import { useState } from "react";
import "../../css/RechazarSolicitud.css";

export default function RechazarSolicitud({
  isOpen = true,
  onClose,
  handleReject,
}) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="main_container">
        <div className="parte_superior">
          Rechazar solicitud
          <button
            className="salir_boton"
            onClick={() => {
              handleReject("", false);

              onClose(false);
            }}
          >
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
              id="motivo_rechazo"
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
              onClick={() => {
                handleReject("", false);
                onClose(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="enviar_boton"
              onClick={() => {
                const motivo = document.getElementById("motivo_rechazo").value;

                if (motivo == "") {
                  alert("Escriba por favor el motivo del rechazo");
                  return;
                }

                handleReject(motivo, true);
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
