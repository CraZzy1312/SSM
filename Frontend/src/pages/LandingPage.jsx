// src/pages/LandingPage.jsx
import Header from "../components/common/Header";
import Hero from "../components/landing/Hero";
import SobreNosotros from "../components/landing/SobreNosotros";
import Servicios from "../components/landing/Servicios";
import Footer from "../components/landing/Footer";

const LandingPage = ({ isUser = false, handleCerrarSesion }) => {
  return (
    <div className="landing-page">
      <Header
        IS={!isUser} // Muestra "Iniciar Sesión" solo si NO es usuario
        CS={isUser} // Muestra "Cerrar Sesión" si es usuario
        MR={isUser} // Muestra "Mis Reservas" si es usuario
        handleCerrarSesion={handleCerrarSesion}
      />
      <Hero />
      <SobreNosotros />
      <Servicios />
      <Footer />
    </div>
  );
};

export default LandingPage;
