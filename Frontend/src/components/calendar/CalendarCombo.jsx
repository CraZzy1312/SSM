import "../../css/CalendarCombo.css";
import Estados from "./Estados";
import Calendario from "./Calendar";

function CalendarCombo() {
  return (
    <div className="calendar_combo_container">
      <Calendario></Calendario>
      <Estados></Estados>
    </div>
  );
}

export default CalendarCombo;
