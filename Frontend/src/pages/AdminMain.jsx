import "../css/AdminMain.css";
import CalendarCombo from "../components/calendar/CalendarCombo";

function AdminMain() {
  return (
    <div>
      <h1 className="tittle_admin">Administración de las reservas</h1>
      <CalendarCombo></CalendarCombo>
    </div>
  );
}

export default AdminMain;
