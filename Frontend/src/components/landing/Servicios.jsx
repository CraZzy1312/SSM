import building1 from "../../assets/Vector.png";
import restaurant1 from "../../assets/restaurant 1.png";
import candleLotusYoga1 from "../../assets/candle-lotus-yoga 1.png";
import glassCheers1 from "../../assets/glass-cheers 1.png";
import gym1 from "../../assets/gym 1.png";
import podium from "../../assets/ranking-podium 1.png";
import "../../css/Servicios.css";


const servicesData = [
  {
    title: "Charlas",
    description: "Espacio ideal para compartir ideas y aprendizajes.",
    image: building1,
  },
  {
    title: "Actividades Recreativas",
    description: "Espacio para talleres y actividades.",
    image: podium,
  },
  {
    title: "Eventos Gastronómicos",
    description: "Degustaciones y talleres de cocina para compartir.",
    image: restaurant1,
  },
  {
    title: "Exposiciones y Ferias",
    description: "Presenta productos y proyectos de manera organizada.",
    image: candleLotusYoga1,
  },
  {
    title: "Celebraciones Sociales",
    description: "Fiestas, cumpleaños y reuniones en un lugar seguro.",
    image: glassCheers1,
  },
  {
    title: "Reuniones Comunitarias",
    description: "Encuentros de grupo para fortalecer la comunidad.",
    image: gym1,
  },
];

export const Servicios = () => {
  return (
    <div className="servicios">
      <div className="servicios-container">
        <div className="servicios-header">
          <div className="line" />
          <h2>Nuestros servicios</h2>
          <div className="line" />
        </div>
        <p className="servicios-subtitle">
          ¿Qué eventos podés realizar?
        </p>
        <div className="servicios-grid">
          {servicesData.map((service, index) => (
            <div className="servicio-card" key={index}>
              <img src={service.image} alt={service.title} className="servicio-img" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;