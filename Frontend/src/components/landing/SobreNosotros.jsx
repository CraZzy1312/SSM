import salon1 from "../../assets/salon1.png";
import salon2 from "../../assets/salon2.png";
import "../../css/SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <section className="sobre-nosotros">
      <div className="sobre-header">
        <div className="line"></div>
        <h2>Sobre nosotros</h2>
        <div className="line"></div>
      </div>

      <div className="sobre-contenido">
        <div className="bloque">
          <img src={salon1} alt="Salón" className="imagen-principal" />
          <div className="texto">
            <h3>Historia de nuestro salón</h3>
            <p>
              El salón multiuso de la Asociación de Desarrollo Integral (ADI) de
              San Marcos es un espacio diseñado para fortalecer la vida
              comunitaria. Aquí se realizan actividades educativas, culturales
              y sociales que buscan beneficiar a toda la población local. En una
              zona donde los espacios de este tipo son limitados, nuestro salón
              se convierte en un punto de encuentro clave para estudiantes,
              organizaciones y grupos de la comunidad que desean desarrollar
              proyectos, talleres y eventos que promuevan el desarrollo integral
              de San Marcos.
            </p>
          </div>
        </div>

        <div className="bloque">
          <div className="texto">
            <h3>¿Por qué escogernos?</h3>
            <p>
              Elegir el salón multiuso de la ADI de San Marcos significa optar
              por accesibilidad, organización y confianza. Nuestro sistema
              facilita la reserva en cualquier momento y desde cualquier lugar,
              mientras que la gestión centralizada asegura que no haya
              conflictos de horarios. Al utilizar nuestro salón, contribuyes al
              desarrollo educativo, cultural y social de la comunidad,
              aprovechando un espacio amplio, seguro y adaptado para diferentes
              tipos de actividades. Además, todos los procesos son claros y
              transparentes, brindando tranquilidad tanto a los usuarios como a
              la Asociación.
            </p>
          </div>
          <img src={salon2} alt="Actividades" className="imagen-principal" />
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
