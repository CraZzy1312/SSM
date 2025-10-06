import { useState } from "react";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./components/common/Header";
import AdminMain from "./pages/AdminMain";

function App() {
  const [count, setCount] = useState(0);
  const [adminAuthenticated, setAdminAuthenticated] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={"Este es el login"} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={adminAuthenticated}>
              <Header />
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
      </Routes>
    </Router>
  );
}

export default App;
