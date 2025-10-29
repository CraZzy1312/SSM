import "../../css/SeguroDe.css";

// Funcion para el manejo del boton aceptar

export default function ({
  isOpen = true,
  onClose,
  mensaje = "¿Está seguro?",
}) {
  if (!isOpen) return null;
  return (
    <div className="main_container">
      <div className="parte_superior">
        Rechazar solicitud
        <button className="salir_boton" onClick={() => onClose(false)}>
          <b>X</b>
        </button>
      </div>
      <div className="cuerpo_modal_seguro">
        {mensaje}
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
            No
          </button>
          <button className="si_boton"> Sí</button>
        </div>
      </div>
    </div>
  );
}
