import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmacionModal from "./ConfirmacionModal.jsx";
import "../../css/PanelInformacion.css";

import { cambiarEstado } from "../../funciones.js";

/* Definición de funciones async para los botones */

// Funciones
// Aceptar solicitud
// Rechazar solicitud
// Pago Realizado
// Cancelar Reserva
// Funcion de volver

function formatearFechaISO(fechaISO) {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Convertimos el string ISO a Date
  const fecha = new Date(fechaISO);

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${diaSemana} ${dia} de ${mes} del ${anio}`;
}

// Funcion para el color del borde superior del cuadro y los tipos de boton

function PanelInformacion({
  estado = "Reservado",
  showModal,
  setModal,
  setRecargar,
  recargar,
}) {
  /*Logica para hacer que dependiendo del estado, cambien los botones de abajo y el color a mostrar */
  const [textoRojo, setTextoRojo] = useState("");
  const [textoVerde, setTextoVerde] = useState("");
  const [evento, setEvento] = useState({});
  const [color, setColor] = useState("");

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
    if (evento.estado == "Solicitud") {
      // #F3F364
      setColor("#F3F364");
      setTextoVerde("Aceptar");
      setTextoRojo("Rechazar");
    } else if (evento.estado == "pendiente") {
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
              <button
                style={{
                  backgroundColor: "red",
                  cursor: "pointer",
                  width: "40%",
                  height: "65%",
                }}
              >
                {textoRojo}
              </button>
            ) : null}
            {textoVerde ? (
              <button
                style={{
                  backgroundColor: "green",
                  cursor: "pointer",
                  height: "65%",
                  width: "40%",
                }}
                onClick={async () => {
                  alert(evento._id);
                  cambiarEstado(evento._id, "Solicitud");
                }}
              >
                {textoVerde}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelInformacion;
