import ProviderServices from "./ProviderServices";
import ProviderRequests from "./ProviderRequests";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Briefcase, User, Settings, Clock } from "lucide-react";

type ProviderSession = {
  name: string;
  email: string;
  userType: "client" | "provider";
  profession?: string;
};

function ProviderDashboard() {
  const navigate = useNavigate();

  const [session] = useState<ProviderSession | null>(() => {
    const storedSession = localStorage.getItem("pertodaki_session");

    if (!storedSession) return null;

    try {
      return JSON.parse(storedSession) as ProviderSession;
    } catch {
      return null;
    }
  });

  const [available, setAvailable] = useState(() => {
    return localStorage.getItem("pertodaki_provider_available") === "true";
  });

  useEffect(() => {
    if (!session || session.userType !== "provider") {
      navigate("/login");
    }
  }, [session, navigate]);

  function toggleAvailability() {
    const newAvailability = !available;

    setAvailable(newAvailability);

    localStorage.setItem(
      "pertodaki_provider_available",
      String(newAvailability)
    );
  }

  function handleLogout() {
    localStorage.removeItem("pertodaki_session");
    navigate("/login");
  }

  if (!session || session.userType !== "provider") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              PertoDaki
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Painel do prestador
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Welcome */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Olá, {session.name.split(" ")[0]}!
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bem-vindo ao seu painel de gerenciamento de serviços.
          </p>
        </section>

        {/* Availability */}
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Disponibilidade
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Indique se está disponível para receber solicitações.
              </p>
            </div>

            <button
              onClick={toggleAvailability}
              className={`rounded-xl px-5 py-3 font-medium transition ${
                available
                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {available ? "● Disponível" : "○ Indisponível"}
            </button>
          </div>
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <User size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Meu perfil
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {session.name}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {session.profession || "Profissão não informada"}
            </p>
          </div>

          {/* Services */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Briefcase size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Meus serviços
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Gerencie os serviços que você oferece.
            </p>
          </div>

          {/* Requests */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <Clock size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Solicitações
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Acompanhe os pedidos de serviços recebidos.
            </p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <Settings size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configurações
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Personalize sua experiência na plataforma.
            </p>
          </div>
        </section>

        <ProviderServices email={session.email} />
        <ProviderRequests email={session.email} />
      </main>
    </div>
  );
}

export default ProviderDashboard;
