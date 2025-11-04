import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { getAllEventsUser } from "../funciones";
import CalendarioCliente from "../components/reservas/CalendarioCliente";

const MisReservas = ({ isUser = false, handleCerrarSesion }) => {
  const [eventos, setEventos] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    const correo = JSON.parse(localStorage.getItem("user")).data.correo;
    const fetchEvents = async () => {
      if (!correo) return;

      const data = await getAllEventsUser(correo);

      console.log(data);
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
  }, [recargar]);

  const actualizarReservas = () => {
    setRecargar((prev) => !prev);
  };

  return (
    <div>
      <Header
        IS={false}
        CS={true}
        MR={true}
        handleCerrarSesion={handleCerrarSesion}
      />
      <div style={{ padding: "2rem" }}>
        <h2 style={{ color: "#2C444C", marginBottom: "1.5rem" }}>
          Mis Reservas
        </h2>

        <CalendarioCliente
          eventos={eventos}
          onReservaCreada={actualizarReservas}
        />
      </div>
    </div>
  );
};

export default MisReservas;
