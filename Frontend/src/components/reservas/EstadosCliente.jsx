import "../../css/Estados.css";
import solicitudColor from "../../assets/solicitud.png";
import pago_pendiente from "../../assets/pago_pendiente.png";
import reservado from "../../assets/reservados.png";
import rechazado from "../../assets/rechazados.png";

function EstadosCliente() {
  return (
    <div className="estados_container">
      <h3 className="estado_tittle">Estados</h3>
      <div className="estado_item">
        <img src={solicitudColor} alt="" className="circle_color" />
        <div>Solicitud</div>
      </div>
      <div className="estado_item">
        <img src={pago_pendiente} alt="" className="circle_color" />
        <div>Pago pendiente</div>
      </div>
      <div className="estado_item">
        <img src={reservado} alt="" className="circle_color" />
        <div>Confirmada</div>
      </div>
      <div className="estado_item">
        <img src={rechazado} alt="" className="circle_color" />
        <div>Rechazada</div>
      </div>
    </div>
  );
}

export default EstadosCliente;
