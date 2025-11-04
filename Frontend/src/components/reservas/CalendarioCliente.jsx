import "../../css/CalendarCombo.css";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EstadosCliente from "./EstadosCliente";
import { useNavigate } from "react-router-dom";

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

// Toolbar personalizado (sin cambios)
function CustomToolbar({ label, onNavigate }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginBottom: "0px",
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

// Encabezado de la fila de días (sin cambios)
const CustomHeaderRow = ({ className, style, ...props }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      borderBottom: "1px solid #ddd",
    }}
    {...props}
  />
);

// Encabezado de los días (Texto blanco) (sin cambios)
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

// CalendarioUsuario (sin cambios, solo agregué currentDate y setCurrentDate a props)
function CalendarioUsuario({ events = [], currentDate, setCurrentDate }) {
  const estadoColorMap = {
    Solicitud: "#F3F871",
    "Pago pendiente": "#78CAD2",
    Confirmada: "#7EEA7E",
    Rechazada: "#FF6347",
  };

  const dayPropGetter = (date) => {
    const evento = events.find((event) =>
      isSameDay(new Date(event.start), date)
    );
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    let style = {
      backgroundColor: isCurrentMonth ? "white" : "#f0f0f0",
      color: isCurrentMonth ? "#000" : "rgb(150, 150, 150)",
    };

    if (evento) {
      style.backgroundColor =
        estadoColorMap[evento.title] || style.backgroundColor;
      style.color = "#000";
    }

    return { style };
  };

  return (
    <div
      style={{
        height: "450px",
        width: "100%",
        padding: "5px 10px 10px 10px",
        backgroundColor: "#2C444C",
        borderRadius: "30px",
        minWidth: "700px",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "0 0 5px 10px",
        }}
      >
        Sus Reservas
      </div>
      <Calendar
        localizer={localizer}
        culture="es-CR"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80%", width: "100%" }}
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

export default function CalendarioEstadosCliente({ eventos = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const eventosFormateados = eventos.map((ev) => ({
    ...ev,
    start: new Date(ev.fechaEvento),
    end: new Date(ev.fechaEvento),
    title: ev.estado,
  }));

  const volverInicio = () => {
    navigate("/user");
  };

  return (
    <div
      className="calendar_combo_container"
      style={{
        display: "flex",
        justifyContent: "center",
        // ✅ CAMBIO AQUÍ: Alinea los ítems al centro verticalmente
        alignItems: "center",
        gap: "3rem",
        padding: "0.5rem 3rem",
        width: "100%",
        boxSizing: "border-box",
        flexDirection: "row",
      }}
    >
      {/* Contenedor del Calendario y el Botón de Volver */}
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <CalendarioUsuario
          events={eventosFormateados}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <button
          type="button"
          className="btn_volver"
          onClick={volverInicio}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Volver al inicio
        </button>
      </div>

      {/* Estados del cliente */}
      <div
        style={{
          flex: "0 0 250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "1rem",
        }}
      >
        <EstadosCliente />
      </div>
    </div>
  );
}