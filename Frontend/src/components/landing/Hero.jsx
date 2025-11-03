// src/components/landing/Hero.jsx
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/heroImg.png";
import "../../css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleReservarClick = () => {
    navigate("/reservas"); // Redirige a la página de reservas
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-text-container">
          <div className="hero-subtitle">Bienvenidos al</div>
          <div className="hero-title">Salón San Marcos</div>
        </div>

        <p className="hero-paragraph">
          Nuestro sistema digital permite a la comunidad planificar actividades
          educativas, culturales y sociales, facilitando la gestión y
          optimizando el uso del espacio disponible.
        </p>

        <button className="hero-button" onClick={handleReservarClick}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Hero;
