import "../../css/SeguroDe.css";

// Modal de confirmación
export default function SeguroDe({
  isOpen = true,
  onClose,
  mensaje,
  setRespuestaModal,
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
              setRespuestaModal(false);
              onClose(false);
            }}
          >
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
              onClick={() => {
                setRespuestaModal(false);
                onClose(false);
              }}
            >
              No
            </button>

            <button
              className="si_boton"
              onClick={() => {
                setRespuestaModal(true);
                onClose(false);
              }}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
