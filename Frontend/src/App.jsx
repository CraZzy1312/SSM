import { useState } from "react";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";

import Header from "./components/common/Header";
import AdminMain from "./pages/AdminMain";
import LandingPage from "./pages/LandingPage";
import Login from "./components/inicio/login";
import Registro from "./components/inicio/registro";
import PanelInformacion from "./components/common/PanelInformacion";

/* Eliminar lo que esté debajo de esto*/
/*------------------------------------ */

import ConfirmacionModal from "./components/common/ConfirmacionModal.jsx";
import RechazarSolicitud from "./components/common/RechazarSolicitud.jsx";
import SeguroDe from "./components/common/SeguroDe.jsx";

/* Dejar lo demás normal */
function App() {
  const [showModal, setShowModal] = useState(true);
  const [count, setCount] = useState(0);
  const [adminAuthenticated, setAdminAuthenticated] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={adminAuthenticated}>
              <Header CS={true} />
              <AdminMain />
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
