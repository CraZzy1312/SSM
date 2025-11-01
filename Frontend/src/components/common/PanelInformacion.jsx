import { use, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmacionModal from "./ConfirmacionModal.jsx";
import SeguroDe from "./SeguroDe.jsx";
import "../../css/PanelInformacion.css";

import { cambiarEstado } from "../../funciones.js";
import RechazarSolicitud from "./RechazarSolicitud.jsx";

import { formatearFechaISO, rejectSolicitud } from "../../funciones.js";

/* Definición de funciones async para los botones */

// Funciones
// Aceptar solicitud
// Rechazar solicitud
// Pago Realizado
// Cancelar Reserva
// Funcion de volver

// Funcion para el color del borde superior del cuadro y los tipos de boton

function PanelInformacion({
  estado = "Reservado",
  showModal,
  setModal,
  adminAuthenticated,
  setRecargar,
  recargar,
}) {
  /*Logica para hacer que dependiendo del estado, cambien los botones de abajo y el color a mostrar */
  const [textoRojo, setTextoRojo] = useState("");
  const [textoVerde, setTextoVerde] = useState("");
  const [evento, setEvento] = useState({});
  const [color, setColor] = useState("");
  const [estadoNuevo, setEstadoNuevo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [motivo, setMotivo] = useState("");
  const [showMotivoRechazo, setShowMotivoRechazo] = useState(false);

  const handleClickVerde = () => {
    let nuevoEstado = "";
    let nuevoMensaje = "";

    if (textoVerde === "Aceptar") {
      nuevoEstado = "Pago pendiente";
      nuevoMensaje = "¿Está seguro de aceptar la solicitud?";
    } else if (textoVerde === "Pago realizado") {
      nuevoEstado = "Reservado";
      nuevoMensaje = "¿Está seguro que el pago se realizó?";
    }

    setEstadoNuevo(nuevoEstado);
    setMensaje(nuevoMensaje);
    setModal(true); // abre el modal
  };

  const handleClickRojo = () => {
    setMensaje("¿Está seguro de rechazar la reserva?");
    setEstadoNuevo("Rechazado");
    setShowMotivoRechazo(true);
  };

  const handleReject = async (motivo, respuesta) => {
    setShowMotivoRechazo(false);

    if (!respuesta) return;

    const ok = await rejectSolicitud(evento._id, estadoNuevo, motivo);
    if (ok) {
      alert("Cambio de estado exitoso");
      navigate("/admin");
    } else {
      alert("Hubo un error al cambiar el estado");
    }
  };

  const handleConfirm = async (respuesta) => {
    setModal(false);

    if (!respuesta) return; // si cancela, no hace nada

    const ok = await cambiarEstado(evento._id, estadoNuevo);
    if (ok) {
      alert("Cambio de estado exitoso");
      navigate("/admin");
    } else {
      alert("Hubo un error al cambiar el estado");
    }
  };

  const navigate = useNavigate();
  const volver = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const event = JSON.parse(localStorage.getItem("evento"));
    console.log(event);
    setEvento(event);
  }, []); // Se ejecuta solo al montar el componente

  useEffect(() => {
    if (!evento) return; // Si todavía no hay evento, salir
    if (!adminAuthenticated) {
      return;
    }
    if (evento.estado == "Solicitud") {
      // #F3F364
      setColor("#F3F364");
      setTextoVerde("Aceptar");
      setTextoRojo("Rechazar");
    } else if (evento.estado == "Pago pendiente") {
      // #78CAD2
      setColor("#78CAD2");
      setTextoVerde("Pago realizado");
      setTextoRojo("Rechazar");
    } else if (evento.estado == "Reservado") {
      // #5379AE
      setColor("#5379AE");
      setTextoVerde("");
      setTextoRojo("Cancelar Reserva");
    } else if (evento.estado == "Cancelado") {
      // #F58284
      setColor("#F58284");
      setTextoVerde("");
      setTextoRojo("");
    }
  }, [evento]);

  return (
    <div>
      <RechazarSolicitud
        isOpen={showMotivoRechazo}
        onClose={setShowMotivoRechazo}
        handleReject={handleReject}
      />
      <SeguroDe
        isOpen={showModal}
        onClose={setModal}
        mensaje={mensaje}
        setRespuestaModal={handleConfirm}
      />
      <h1 className="title_consulta">Información de la reserva</h1>
      <div className="main_contenedor">
        <div className="contenedor_informacion">
          <div className="borde_superior" style={{ backgroundColor: color }}>
            <b className="subtitulo">Estado de la solicitud: {evento.estado}</b>
          </div>
          <div className="cuerpo">
            <b className="subtitulo">Datos del solicitante</b>
            <div className="datos">
              <p>
                {" "}
                <b>Nombre: </b> {evento.nombreSolicitante}
              </p>
              <p>
                <b>Teléfono: </b> {evento.telefono}
              </p>
              <p>
                <b>Correo: </b> {evento.correo}
              </p>
              <p>
                <b>Fecha de la solicitud: </b>{" "}
                {formatearFechaISO(evento.fechaEvento)}
              </p>
            </div>
            <b className="subtitulo">Descripción del evento</b>
            <div className="datos">{evento.descripcionEvento}</div>
          </div>
        </div>
        <div className="contenedor_botones">
          <button
            className="volver"
            style={{ backgroundColor: "#757575", cursor: "pointer" }}
            onClick={volver}
          >
            Volver
          </button>
          <div className="par_botones">
            {textoRojo ? (
              <>
                <button
                  style={{
                    backgroundColor: "red",
                    cursor: "pointer",
                    width: "40%",
                    height: "65%",
                  }}
                  onClick={handleClickRojo}
                >
                  {textoRojo}
                </button>
              </>
            ) : null}
            {textoVerde ? (
              <>
                <button
                  style={{
                    backgroundColor: "green",
                    cursor: "pointer",
                    height: "65%",
                    width: "40%",
                  }}
                  onClick={handleClickVerde}
                >
                  {textoVerde}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelInformacion;
