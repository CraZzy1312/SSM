import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { getAllEventsUser } from "../funciones";
import CalendarioCliente from "../components/reservas/CalendarioCliente";

const MisReservas = ({ isUser = false, handleCerrarSesion, idUsuario }) => {
  const [eventos, setEventos] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!idUsuario) return;

      const data = await getAllEventsUser(idUsuario);

      // Mapear eventos a formato calendario
      const eventosFormateados = data.map((ev) => ({
        ...ev,
        start: new Date(ev.fechaEvento),
        end: new Date(ev.fechaEvento),
        title: ev.estado,
      }));

      setEventos(eventosFormateados);
    };
    fetchEvents();
  }, [recargar, idUsuario]);

  const actualizarReservas = () => {
    setRecargar((prev) => !prev);
  };

  return (
    <div>
      <Header IS={false} CS={true} MR={true} handleCerrarSesion={handleCerrarSesion} />
      <div style={{ padding: "2rem" }}>
        <h2 style={{ color: "#2C444C", marginBottom: "1.5rem" }}>
          Mis Reservas
        </h2>

        <CalendarioCliente eventos={eventos} onReservaCreada={actualizarReservas} />
      </div>
    </div>
  );
};

export default MisReservas;
