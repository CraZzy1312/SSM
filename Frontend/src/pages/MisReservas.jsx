import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { getAllEventsUser } from "../funciones"; // función que obtiene los eventos del backend
import CalendarioCliente from "../components/reservas/CalendarioCliente";

const MisReservas = ({ isUser = false, handleCerrarSesion, idUsuario }) => {
  const [eventos, setEventos] = useState([]);
  const [recargar, setRecargar] = useState(false);

  //  Cargar los eventos del usuario desde el backend
  useEffect(() => {
    const fetchEvents = async () => {
      if (!idUsuario) return; // evita error si el id aún no está disponible
      const data = await getAllEventsUser(idUsuario);
      setEventos(data);
    };
    fetchEvents();
  }, [recargar, idUsuario]);

  //  Función para actualizar reservas (por ejemplo, tras crear o eliminar una)
  const actualizarReservas = () => {
    setRecargar((prev) => !prev);
  };

  return (
    <div>
      {/*  Header principal con las props necesarias */}
     <Header
        IS={false}
        CS={true}
        MR={true}
        handleCerrarSesion={handleCerrarSesion}
        />
      {/* Contenido principal */}
      <div style={{ padding: "2rem" }}>
        <h2 style={{ color: "#2C444C", marginBottom: "1.5rem" }}>
          Mis Reservas
        </h2>

        {/* Componente del calendario con los estados */}
        <CalendarioCliente
          eventos={eventos}
          onReservaCreada={actualizarReservas}
        />
      </div>
    </div>
  );
};

export default MisReservas;
