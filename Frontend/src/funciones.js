export const iniciarSesion = async (correo, contraseña) => {
  try {
    localStorage.clear()
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({correo, contraseña}),
    });
    const data = await res.json()
    localStorage.setItem("user", JSON.stringify(data))
    return data
  } catch (error) {
    alert("Error: " +error);
    return false;
  }

};

export const usuarioExistente = async (email) => {
  try {
    const res = await fetch(
      `http://localhost:3000/user/${encodeURIComponent(email)}`
    );
    const data = await res.json();
    return data.data != null; // true si existe, false si no
  } catch (err) {
    alert("Error: " + err);
    return false; // por seguridad
  }
};

export const validarCorreo = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const registrarUsuario = async (email, password, nombre) => {
  try {
    var usuario_nuevo = {
      nombre: nombre,
      correo: email,
      contraseña: password,
      isAdmin: false,
    };
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario_nuevo),
    });
    const data = await res.json();
    return true;
  } catch (error) {
    alert("Error: " +error);
    return false;
  }
};


export const getAllEvents = async () =>
{
  try {
    const res = await fetch(
      `http://localhost:3000/getAllEvent`
    );
    const data = await res.json();
    return data.data 
  } catch (err) {
    alert("Error: " + err);
    return [{}]; // por seguridad
  }
}

export const cambiarEstado = async (idEvento, newState) => {
    try {
        const bd = {newState: newState};
    const res = await fetch(`http://localhost:3000/eventNewState/${encodeURIComponent(idEvento)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bd),
    });
    const data = await res.json();
    return true;
  } catch (error) {
    alert("Error: "+error);
    return false;
  }
}


export function formatearFechaISO(fechaISO) {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Convertimos el string ISO a Date
  const fecha = new Date(fechaISO);

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${diaSemana} ${dia} de ${mes} del ${anio}`;
}

export const rejectSolicitud = async (idEvento, newState, motivo) => {
  try {
    const evento = JSON.parse(localStorage.getItem("evento"))
    console.log("Esto es el evento: " +evento);
    const fechaFormateada = formatearFechaISO(evento.fechaEvento)
    const bd = {reason: motivo, correo: evento.correo, fecha: fechaFormateada};
    const res = await fetch(`http://localhost:3000/rejectEvent/${encodeURIComponent(idEvento)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bd),
    });
    const data = await res.json();
    return true;
  } catch (error) {
    console.log("Error: "+error);
    return false;
  }
}

export const crearEvento = async (evento) => {
  try {
    const res = await fetch("http://localhost:3000/createEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data;
    } else {
      const text = await res.text();
      console.error("Respuesta no JSON:", text);
      return { success: false, message: "Respuesta inválida del servidor" };
    }
  } catch (error) {
    alert("Error: " + error);
    return false;
  }
};

export const getAllEventsUser = async (idUser) => {
  try {
    const res = await fetch(`/api/eventos/usuario/${idUser}`);
    const data = await res.json();
    if (data.success) {
      return data.data; // array de eventos listo
    } else {
      console.error("Error al obtener eventos del usuario:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error en getAllEventsUser:", error);
    return [];
  }
};

