import "../../css/CalendarCombo.css";
import Estados from "./Estados";
import Calendario from "./Calendar";

function CalendarCombo({ eventos }) {
  return (
    <div className="calendar_combo_container">
      <Calendario events={eventos}></Calendario>
      <Estados></Estados>
    </div>
  );
}

export default CalendarCombo;
