// src/pages/Reservas.jsx
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import CalendarCombo from "../components/calendar/CalendarCombo";
import { getAllEvents } from "../funciones";

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

  return (
    <div>
      <Header
        IS={!isUser}   // Muestra "Iniciar Sesión" solo si NO es usuario
        CS={isUser}    // Muestra "Cerrar Sesión" si es usuario
        MR={isUser}    // Muestra "Mis Reservas" si es usuario
        handleCerrarSesion={handleCerrarSesion}
      />
      <div style={{ padding: "2rem" }}>
        <h2>Mis Reservas</h2>
        <CalendarCombo eventos={eventos} />
      </div>
    </div>
  );
};

export default Reservas;
