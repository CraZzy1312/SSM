import "../../css/registro.css";
import logo from "../../assets/logo_ADI_SM.png";
import { useNavigate } from "react-router-dom";

import {
  iniciarSesion,
  usuarioExistente,
  validarCorreo,
  registrarUsuario,
} from "../../funciones";

export const Register = () => {
  const navigate = useNavigate();

  const validar_datos = async () => {
    // Validacion del nombre
    var nombre = document.getElementById("name").value;
    if (nombre == "") {
      alert("Ingrese su nombre");
      return;
    }

    // Validacion de correo
    var email = document.getElementById("email").value;
    if (email == "") {
      alert("Por favor, ingrese el correo");
      return;
    }
    if (!validarCorreo(email) == true) {
      alert("El formato del correo no es válido");
      return;
    }
    // Validación contraseñas
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (!password1 || !password2) {
      alert("Ingrese las dos contraseñas");

      return;
    }

    if (password1 != password2) {
      alert("Las contraseñas tienen que ser iguales");
      return;
    }

    const existe = await usuarioExistente(email);
    if (existe) {
      alert("Ya existe el usuario");
      return;
    }

    const registrado = await registrarUsuario(email, password1, nombre);
    if (registrado) {
      alert("Se registró el usuario correctamente");

      // Inicia sesión con las credenciales creadas
      const login = await iniciarSesion(email, password1);
      const idUsuario = JSON.parse(localStorage.getItem("user")).data.id_user;

      // Logica para guardar informacion del usuario en el navegador

      navigate("/user");
    } else {
      alert("Hubo un error al registrar");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <img src={logo} alt="Logo" className="register-logo" />

        <div className="register-card">
          <h2 className="register-title">Registrarse</h2>

          <div className="input-group">
            <label>Nombre</label>
            <input type="text" id="name" placeholder="Ingrese su nombre" />
          </div>

          <div className="input-group">
            <label>Correo</label>
            <input type="email" id="email" placeholder="Ingrese su correo" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              id="password1"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <div className="input-group">
            <label>Confirme su contraseña</label>
            <input
              type="password"
              id="password2"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button className="btn-primary" onClick={validar_datos}>
            Registrarse
          </button>

          <p className="login-link">
            ¿Ya tienes cuenta?{" "}
            <span onClick={() => navigate("/login")}>Inicia sesión</span>
          </p>

          <button className="btn-secondary" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
