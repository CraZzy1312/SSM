import "../../css/registro.css";
import logo from "../../assets/logo_ADI_SM.png";

export const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <img src={logo} alt="Logo" className="register-logo" />

        <div className="register-card">
          <h2 className="register-title">Registrarse</h2>

          <div className="input-group">
            <label>Correo</label>
            <input type="email" placeholder="Ingrese su correo" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>

          <div className="input-group">
            <label>Confirme su contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>

          <button className="btn-primary">Registrarse</button>

          <p className="login-link">
            ¿Ya tienes cuenta? <span>Inicia sesión</span>
          </p>

          <button className="btn-secondary">Volver</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
