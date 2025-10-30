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
