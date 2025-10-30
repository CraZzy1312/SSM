import "../../css/login.css";
import logo from "../../assets/logo_ADI_SM.png";
import { useNavigate } from "react-router-dom";

import {
  iniciarSesion,
  usuarioExistente,
  validarCorreo,
} from "../../funciones";

export const Login = ({ setUserAuthenticated, setAdminAuthenticated }) => {
  const navigate = useNavigate();

  const validarDatos = async () => {
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validacion de correo
    var email = document.getElementById("email").value;
    if (email == "") {
      alert("Por favor, ingrese el correo");
      return;
    }
    if (!validarCorreo(email)) {
      alert("El formato del correo no es válido");
      return;
    }

    // Validar password
    if (password == "") {
      alert("Ingrese la contraseña");
      return;
    }

    const existe = await usuarioExistente(correo);
    if (!existe) {
      alert("El correo que ingresó no está registrado en el sistema");
      return;
    }

    // Inicia sesión dependiendo de si es admin o usuario
    const usuario = await iniciarSesion(email, password);
    if (!usuario.success) {
      alert("Credenciales inválidas");
      return;
    }

    console.log(usuario);
    // Redirige a la vista de admin o de user
    if (usuario && usuario.data.isAdmin) {
      setAdminAuthenticated(true);
      setUserAuthenticated(false);
      navigate("/admin");
    } else if (usuario && !usuario.data.isAdmin) {
      setAdminAuthenticated(false);
      setUserAuthenticated(true);
      navigate("/user");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />

        <div className="login-card">
          <h2 className="login-title">Iniciar sesión</h2>

          <div className="input-group">
            <label>Correo</label>
            <input type="email" id="email" placeholder="Ingrese su correo" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <p className="forgot-password">Olvidé mi contraseña</p>

          <button className="btn-primary" onClick={validarDatos}>
            Iniciar Sesión
          </button>

          <p className="register-link">
            ¿No tienes cuenta?{" "}
            <span onClick={() => navigate("/registro")}>Regístrate</span>
          </p>

          <button className="btn-secondary" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
