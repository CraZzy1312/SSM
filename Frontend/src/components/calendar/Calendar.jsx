import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configuración del localizer
const locales = { "es-CR": es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function Calendario() {
  const [events, setEvents] = useState([
    {
      title: "Reservado",
      start: new Date(2025, 9, 5, 10, 0),
      end: new Date(2025, 9, 5, 12, 0),
    },
  ]);

  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        culture="es-CR" // <<-- Esto fuerza español
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
