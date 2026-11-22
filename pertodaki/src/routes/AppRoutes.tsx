
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ClientDashboard from "../pages/client/ClientDashboard";
import ProfessionalProfilePage from "../pages/provider/ProfessionalProfilePage";
import ProviderDashboard from "../pages/provider/ProviderDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/cliente" element={<ClientDashboard />} />
        <Route
          path="/profissional/:id"
          element={<ProfessionalProfilePage />}/>
        <Route path="/prestador" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
