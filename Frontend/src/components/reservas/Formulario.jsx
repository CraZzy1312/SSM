// src/components/reservas/Formulario.jsx
import { useState, useEffect } from "react";
import { crearEvento, validarCorreo, getAllEvents } from "../../funciones";
import "../../css/Formulario.css";

function Formulario({ onReservaCreada }) {
  const [formData, setFormData] = useState({
    nombreSolicitante: "",
    correo: "",
    telefono: "",
    descripcionEvento: "",
    fechaEvento: "",
  });

  const [loading, setLoading] = useState(false);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  // Cargar todas las fechas de eventos existentes
  useEffect(() => {
    const cargarFechas = async () => {
      try {
        const res = await getAllEvents();
        if (res?.success) {
          const fechas = res.data.map(evento => evento.fechaEvento);
          setFechasOcupadas(fechas);
        }
      } catch (error) {
        console.error("Error al obtener fechas de eventos:", error);
      }
    };
    cargarFechas();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombreSolicitante || !formData.correo || !formData.fechaEvento) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    if (!validarCorreo(formData.correo)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    // Validar si la fecha ya está ocupada
    if (fechasOcupadas.includes(formData.fechaEvento)) {
      alert("Ya hay un evento en esa fecha, por favor selecciona otra.");
      return;
    }

    setLoading(true);

    try {
      // Agregar fechaSolicitud antes de enviar al backend
      const dataConFechaSolicitud = {
        ...formData,
        fechaSolicitud: new Date().toISOString(),
      };

      const resultado = await crearEvento(dataConFechaSolicitud);

      if (resultado && resultado.success) {
        alert("Solicitud enviada exitosamente");
        setFormData({
          nombreSolicitante: "",
          correo: "",
          telefono: "",
          descripcionEvento: "",
          fechaEvento: "",
        });
        onReservaCreada?.(); // recarga lista si hace falta
      } else {
        alert("Error al enviar la solicitud: " + (resultado?.message || ""));
      }
    } catch (error) {
      alert("Ocurrió un error al enviar la solicitud: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario_container">
      <h2 className="form_titulo">Solicitar Reserva</h2>
      <form className="form_contenido" onSubmit={handleSubmit}>
        <label>Nombre del solicitante *</label>
        <input
          type="text"
          name="nombreSolicitante"
          value={formData.nombreSolicitante}
          onChange={handleChange}
          required
        />

        <label>Correo electrónico *</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />

        <label>Fecha del evento *</label>
        <input
          type="date"
          name="fechaEvento"
          value={formData.fechaEvento}
          onChange={handleChange}
          required
        />

        <label>Descripción del evento</label>
        <textarea
          name="descripcionEvento"
          value={formData.descripcionEvento}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}

export default Formulario;
