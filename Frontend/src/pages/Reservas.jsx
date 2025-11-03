// src/pages/Reservas.jsx
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { getAllEvents } from "../funciones";
import Formulario from "../components/reservas/Formulario";

const Reservas = ({ isUser = false, handleCerrarSesion }) => {
  const [eventos, setEventos] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEventos(data);
    };
    fetchEvents();
  }, [recargar]);

  const actualizarReservas = () => {
    setRecargar((prev) => !prev);
  };

  return (
    <div>
      <Header
        IS={!isUser}
        CS={isUser}
        MR={isUser}
        handleCerrarSesion={handleCerrarSesion}
      />
      <div style={{ padding: "2rem" }}>
        <h2>Reservas</h2>
        <Formulario onReservaCreada={actualizarReservas} />
      </div>
    </div>
  );
};

export default Reservas;
