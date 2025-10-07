import "../../css/login.css";
import logo from "../../assets/logo_ADI_SM.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="login-logo" />

        <div className="login-card">
          <h2 className="login-title">Iniciar sesión</h2>

          <div className="input-group">
            <label>Correo</label>
            <input type="email" placeholder="Ingrese su correo" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>

          <p className="forgot-password">Olvidé mi contraseña</p>

          <button className="btn-primary" onClick={() => navigate("/admin")}>
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
