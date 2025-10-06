import logo from "../../assets/logo_ADI_SM.png";
import "../../css/Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Falta agregar la funcionalidad de los botones
// IS = Iniciar Sesión -> Redirigir a /login
// CS = Cerrar Sesión  -> Cerrar sesión y redirigir /   (home)
// MR = Mis Reservas   -> Redirigir a /user/misreservas

function Header({ IS = false, CS = true, MR = false }) {
  const [estilo, setEstilo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    MR && CS
      ? setEstilo({ justifyContent: "space-between" })
      : setEstilo({ justifyContent: "flex-end" });
  }, [IS, MR, CS]);

  return (
    <header>
      <div className="header_container">
        <img src={logo} alt="" className="logo_banner" />
        <div className="button_container" style={estilo}>
          {IS ? (
            <button
              style={{ backgroundColor: "#5ac00c" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Iniciar Sesión
            </button>
          ) : null}
          {MR ? (
            <button
              style={{ backgroundColor: "#757575" }}
              onClick={() => {
                navigate("/user/misreservas");
              }}
            >
              Mis Reservas
            </button>
          ) : null}
          {CS ? (
            <button
              style={{ backgroundColor: "#c00f0c" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
