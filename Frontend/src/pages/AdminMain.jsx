import "../css/AdminMain.css";
import CalendarCombo from "../components/calendar/CalendarCombo";
import { useEffect, useState } from "react";

import { getAllEvents } from "../funciones";

function AdminMain({ eventos, recargar, setRecargar }) {
  useEffect(() => {
    setRecargar(!recargar);
  }, []);
  return (
    <div>
      <h1 className="tittle_admin">Administración de las reservas</h1>
      <CalendarCombo eventos={eventos}></CalendarCombo>
    </div>
  );
}

export default AdminMain;
