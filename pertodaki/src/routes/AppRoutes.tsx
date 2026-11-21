
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ClientDashboard from "../pages/client/ClientDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/cliente" element={<ClientDashboard />} />

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  Página não encontrada
                </h1>
                <a href="/" className="mt-4 inline-block text-blue-600">
                  Voltar ao início
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
