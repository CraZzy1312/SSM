import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isSameDay,
  isToday,
} from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

// Funcion de manejo del calendario

// Configuración del localizer
const locales = { "es-CR": es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  allDay: "Todo el día",
  previous: "Atrás",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
};

// Toolbar personalizado
function CustomToolbar({ label, onNavigate }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <button
        onClick={() => onNavigate("PREV")}
        style={{
          backgroundColor: "#2563eb",
          height: "100%",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Atrás
      </button>

      <span
        style={{
          fontWeight: "bold",
          fontSize: "2vh",
          color: "white",
        }}
      >
        {label}
      </span>

      <button
        onClick={() => onNavigate("NEXT")}
        style={{
          backgroundColor: "#2563eb",
          height: "100%",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Siguiente
      </button>
    </div>
  );
}

// Componente para la fila de encabezado (días)
const CustomHeaderRow = ({ className, style, ...props }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      backgroundColor: "white", // fondo blanco
      borderBottom: "1px solid #ddd",
    }}
    {...props}
  />
);

// Componente para cada celda de encabezado (día)
const CustomHeader = ({ label }) => (
  <div
    style={{
      flex: 1,
      textAlign: "center",
      fontWeight: "bold",
      padding: "5px 0",
      color: "white",
    }}
  >
    {label}
  </div>
);

export default function Calendario() {
  const navigate = useNavigate();
  const mostrar_evento = () => {
    navigate("/informacion-evento");
  };
  const [events] = useState([
    {
      title: "Reservado",
      start: new Date(2025, 9, 15),
      end: new Date(2025, 9, 15),
    },
    {
      title: "Cancelado",
      start: new Date(2025, 9, 20),
      end: new Date(2025, 9, 20),
    },
    {
      title: "Pago pendiente",
      start: new Date(2025, 9, 25),
      end: new Date(2025, 9, 25),
    },
    {
      title: "Solicitud",
      start: new Date(2025, 9, 10),
      end: new Date(2025, 9, 10),
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Función para colorear los días
  const dayPropGetter = (date) => {
    const isReserved = events.some(
      (event) => isSameDay(event.start, date) && event.title === "Reservado"
    );
    const isCanceled = events.some(
      (event) => isSameDay(event.start, date) && event.title === "Cancelado"
    );
    const isNotPaid = events.some(
      (event) =>
        isSameDay(event.start, date) && event.title === "Pago pendiente"
    );
    const isSolitude = events.some(
      (event) => isSameDay(event.start, date) && event.title === "Solicitud"
    );
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    // Fondo por defecto: blanco si es del mes actual, gris si no
    let style = {
      backgroundColor: isCurrentMonth ? "white" : "#f0f0f0",
    };

    if (isReserved) {
      style = { ...style, backgroundColor: "#7EEA7E", cursor: "pointer" }; // verde claro para reservados
    }

    if (isCanceled) {
      style = { ...style, backgroundColor: "#F58284", cursor: "pointer" }; // rojo claro para cancelados
    }

    if (isNotPaid) {
      style = { ...style, backgroundColor: "#78CAD2", cursor: "pointer" }; // azul claro para pago pendiente
    }

    if (isSolitude) {
      style = { ...style, backgroundColor: "#F3F871", cursor: "pointer" }; // amarillo claro para solicitudes
    }

    if (isToday(date)) {
      /*borde de un color */
      style = { ...style, border: "1px solid #001f67ff" };
    }

    return { style };
  };

  return (
    <div
      style={{
        height: "70vh",
        width: "60%",
        padding: "20px",
        paddingLeft: "1%",
        backgroundColor: "#2C444C",
        borderRadius: "30px",
      }}
    >
      <a style={{ color: "white" }}>Seleccione un día para revisar</a>
      <Calendar
        selectable
        localizer={localizer}
        culture="es-CR"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "95%", width: "100%" }}
        messages={messages}
        views={["month"]}
        components={{
          toolbar: (toolbarProps) => (
            <CustomToolbar
              {...toolbarProps}
              onNavigate={(action) => {
                let newDate = new Date(currentDate);
                if (action === "NEXT") newDate.setMonth(newDate.getMonth() + 1);
                if (action === "PREV") newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
            />
          ),
          header: CustomHeader,
          headerRow: CustomHeaderRow,
        }}
        dayPropGetter={dayPropGetter}
        date={currentDate} // permite cambiar de mes
        onSelectSlot={(slotInfo) => {
          const eventoDia = events.find((ev) =>
            isSameDay(ev.start, slotInfo.start)
          );
          if (eventoDia) {
            mostrar_evento();
          } else {
            // No hacer nada si no hay evento
          }
        }}
      />
    </div>
  );
}
