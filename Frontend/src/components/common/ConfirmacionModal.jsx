import { useState } from "react";

import "../../css/ConfirmacionModal.css";

export default function ConfirmacionModal({
  isOpen = true,
  onClose,
  mensaje = "Mensaje de confirmación!",
}) {
  if (!isOpen) return null;
  return (
    <div className="main_container">
      <div className="parte_superior">
        Confirmacion
        <button className="salir_boton" onClick={() => onClose(false)}>
          <b>X</b>
        </button>
      </div>
      <div className="cuerpo_modal">
        {mensaje}{" "}
        <button className="aceptar_boton" onClick={() => onClose(false)}>
          {" "}
          Aceptar
        </button>
      </div>
    </div>
  );
}
