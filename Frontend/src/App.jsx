import { useState } from "react";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./css/App.css";

import Header from "./components/common/Header";
import AdminMain from "./pages/AdminMain";
import LandingPage from "./pages/LandingPage";
import Login from "./components/inicio/login";
import Registro from "./components/inicio/registro";
import PanelInformacion from "./components/common/PanelInformacion";
import NotFound from "./components/common/NotFound.jsx";

import { getAllEvents } from "./funciones.js";

// Código principal
function App() {
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [eventos, setEventos] = useState([{}]);
  const [recargar, setRecargar] = useState(false);

  // Funcion para cerrar sesión (setea las variables en false)
  const handleCerrarSesion = () => {
    setAdminAuthenticated(false);
    setUserAuthenticated(false);
  };

  // Carga los eventos de la bd a la variable eventos
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEvents();
      setEventos(data);
    };

    fetchData();
    console.log(eventos);
  }, [recargar]); // Se ejecuta al inicio y cada vez que cambie "recargar"

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <Login
              setAdminAuthenticated={setAdminAuthenticated}
              setUserAuthenticated={setUserAuthenticated}
            />
          }
        />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={adminAuthenticated}>
              <Header
                CS={true}
                handleCerrarSesion={handleCerrarSesion}
                isAdmin={adminAuthenticated}
              />
              <AdminMain
                eventos={eventos}
                setRecargar={setRecargar}
                recargar={recargar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute isAuthenticated={userAuthenticated}>
              "Usuario registrado"
            </ProtectedRoute>
          }
        />
        <Route
          path="/informacion-evento"
          element={
            <div>
              <Header
                isAdmin={adminAuthenticated}
                handleCerrarSesion={handleCerrarSesion}
              ></Header>
              <PanelInformacion
                showModal={showModal}
                setModal={setShowModal}
                setRecargar={setRecargar}
                recargar={recargar}
                adminAuthenticated={adminAuthenticated}
              ></PanelInformacion>
            </div>
          }
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </Router>
  );
}

export default App;
