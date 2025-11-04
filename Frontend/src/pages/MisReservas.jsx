import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { getAllEvents } from "../funciones";
import CalendarioCliente from "../components/reservas/CalendarioCliente";

const MisReservas = ({ isUser = false, handleCerrarSesion }) => {
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
        <h2>Mis Reservas</h2>
        <CalendarioCliente
          eventos={eventos}
          onReservaCreada={actualizarReservas}
        />
      </div>
    </div>
  );
};

export default MisReservas;
