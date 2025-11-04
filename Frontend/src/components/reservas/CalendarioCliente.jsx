import "../../css/CalendarCombo.css";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EstadosCliente from "./EstadosCliente";

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
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Atrás
      </button>

      <span style={{ fontWeight: "bold", fontSize: "2vh", color: "white" }}>
        {label}
      </span>

      <button
        onClick={() => onNavigate("NEXT")}
        style={{
          backgroundColor: "#2563eb",
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

// Encabezado de los días
const CustomHeaderRow = ({ className, style, ...props }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      backgroundColor: "white",
      borderBottom: "1px solid #ddd",
    }}
    {...props}
  />
);

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

function CalendarioUsuario({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mapa de colores según estado
  const estadoColorMap = {
    Solicitud: "#F3F871",
    "Pago pendiente": "#78CAD2",
    Reservado: "#7EEA7E",
    rechazado: "#F58284",
  };

  // Función para pintar los días
  const dayPropGetter = (date) => {
    const evento = events.find((event) =>
      isSameDay(new Date(event.start), date)
    );

    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    let style = {
      backgroundColor: isCurrentMonth ? "white" : "#f0f0f0",
    };

    if (evento) {
      style.backgroundColor =
        estadoColorMap[evento.estado] || style.backgroundColor;
    }

    return { style };
  };

  return (
    <div
      style={{
        height: "70vh",
        width: "100%",
        padding: "20px",
        backgroundColor: "#2C444C",
        borderRadius: "30px",
      }}
    >
      <a style={{ color: "white" }}>Calendario de Reservas</a>
      <Calendar
        localizer={localizer}
        culture="es-CR"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "95%", width: "100%" }}
        messages={messages}
        views={["month"]}
        selectable={false}
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
        date={currentDate}
      />
    </div>
  );
}

// NUEVO COMPONENTE FINAL — calendario + estados
export default function CalendarioEstadosCliente({ eventos }) {
  // Formatear eventos para react-big-calendar
  const eventosFormateados = eventos.map((ev) => ({
    ...ev,
    start: new Date(ev.fechaEvento),
    end: new Date(ev.fechaEvento),
    title: ev.estado,
  }));

  return (
    <div
      className="calendar_combo_container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "3rem",
        padding: "3rem 0",
      }}
    >
      {/* Calendario */}
      <div
        style={{
          flex: "0 1 70%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CalendarioUsuario events={eventosFormateados} />
      </div>

      {/* Estados del cliente */}
      <div
        style={{
          flex: "0 1 20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <EstadosCliente />
      </div>
    </div>
  );
}
