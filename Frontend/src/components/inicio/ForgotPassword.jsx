import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor ingrese su correo");
      return;
    }

    // Solo simulamos el envío de correo
    setSubmitted(true);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Recuperar contraseña</h2>
        <div className="login-card">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group" style={{ marginBottom: "20px" }}>
                <label>Correo</label>
                <input
                  type="email"
                  placeholder="Ingrese su correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary">
                Enviar instrucciones
              </button>

              <button
                type="button"
                className="btn-secondary"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/login")}
              >
                Volver
              </button>
            </form>
          ) : (
            <div>
              <p>
                Se enviaron instrucciones a <b>{email}</b> para recuperar su
                contraseña. Revise su bandeja de entrada.
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/login")}
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
