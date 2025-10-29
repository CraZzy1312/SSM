import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmacionModal from "./ConfirmacionModal.jsx";
import "../../css/PanelInformacion.css";

/* Definición de funciones async para los botones */

// Funciones
// Aceptar solicitud
// Rechazar solicitud
// Pago Realizado
// Cancelar Reserva
// Funcion de volver

function PanelInformacion({ estado = "Reservado", showModal, setModal }) {
  /*Logica para hacer que dependiendo del estado, cambien los botones de abajo y el color a mostrar */
  const [textoRojo, setTextoRojo] = useState("");
  const [textoVerde, setTextoVerde] = useState("");

  const navigate = useNavigate();
  const volver = () => {
    navigate("/admin");
  };

  const funcion = async () => {};

  useEffect(() => {
    if (estado == "Pendiente") {
      setTextoVerde("Aceptar");
      setTextoRojo("Rechazar");
    } else if (estado == "Pago pendiente") {
      setTextoVerde("Pago realizado");
      setTextoRojo("Rechazar");
    } else if (estado == "Reservado") {
      setTextoVerde("");
      setTextoRojo("Cancelar Reserva");
    } else if (estado == "Cancelado") {
      setTextoVerde("");
      setTextoRojo("");
    }
  }, [estado]);

  return (
    <div>
      <h1 className="title_consulta">Información de la reserva</h1>
      <div className="main_contenedor">
        <div className="contenedor_informacion">
          <div className="borde_superior">
            <b className="subtitulo">Estado de la solicitud: {estado}</b>
          </div>
          <div className="cuerpo">
            <b className="subtitulo">Datos del solicitante</b>
            <div className="datos">
              <p>
                {" "}
                <b>Nombre: </b> Lucía Calvo Gutiérrez
              </p>
              <p>
                <b>Teléfono: </b> 8888-8888
              </p>
              <p>
                <b>Correo: </b> Lcalvo@gmail.com
              </p>
              <p>
                <b>Fecha de la solicitud: </b>Sábado 24 de enero del 2025
              </p>
            </div>
            <b className="subtitulo">Descripción del evento</b>
            <div className="datos">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              obcaecati pariatur veniam quaerat in totam provident soluta
              placeat porro illum iste ipsa repudiandae, natus at ducimus fugiat
              modi ad quas! Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Cumque qui et tenetur maiores libero quos sit id
              consequatur. Ipsa consequatur nesciunt corrupti. Modi expedita
              unde suscipit sapiente corrupti omnis aliquam. Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Distinctio quisquam
              repellendus in deserunt ipsa asperiores deleniti eum, pariatur
              suscipit obcaecati rem id quidem quam voluptatibus quo vitae
              animi? Voluptate, assumenda.
            </div>
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
