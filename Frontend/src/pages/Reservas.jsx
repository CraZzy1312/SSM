// src/pages/Reservas.jsx
import Header from "../components/common/Header";

const Reservas = ({ isUser = false, handleCerrarSesion }) => {
  return (
    <div>
      <Header
        IS={!isUser}   // Muestra "Iniciar Sesión" solo si NO es usuario
        CS={isUser}    // Muestra "Cerrar Sesión" si es usuario
        MR={isUser}    // Muestra "Mis Reservas" si es usuario
        handleCerrarSesion={handleCerrarSesion}
      />
      <div style={{ padding: "2rem" }}>
        <h2>Reservas</h2>
        <p>Aquí podrás hacer tus reservas aunque no hayas iniciado sesión.</p>
      </div>
    </div>
  );
};

export default Reservas;
