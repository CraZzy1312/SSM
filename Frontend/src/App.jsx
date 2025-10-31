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

import { getAllEvents } from "./funciones.js";

/* Eliminar lo que esté debajo de esto*/
/*------------------------------------ */

import ConfirmacionModal from "./components/common/ConfirmacionModal.jsx";
import RechazarSolicitud from "./components/common/RechazarSolicitud.jsx";
import SeguroDe from "./components/common/SeguroDe.jsx";

/* Dejar lo demás normal */
function App() {
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [adminAuthenticated, setAdminAuthenticated] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [eventos, setEventos] = useState([{}]);
  const [recargar, setRecargar] = useState(false);

  // Actualización del objeto eventos según quien los necesite
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
              <Header CS={true} />
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
              <Header></Header>
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
        <Route
          path="/test"
          element={
            <SeguroDe isOpen={showModal} onClose={setShowModal}></SeguroDe>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
