
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  MapPin,
  UserRound,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

type UserType = "client" | "provider";

type RegisteredUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: UserType;
  profession?: string;
  description?: string;
  createdAt: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!email.trim() || !password.trim()) {
    setError("Preencha todos os campos.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Informe um e-mail válido.");
    return;
  }

  if (password.length < 6) {
    setError("A senha deve conter pelo menos 6 caracteres.");
    return;
  }

  try {
    const storedUsers = localStorage.getItem("pertodaki_users");

    const users: RegisteredUser[] = storedUsers
      ? JSON.parse(storedUsers)
      : [];

    const user = users.find(
      (registeredUser) =>
        registeredUser.email.toLowerCase() === email.trim().toLowerCase() &&
        registeredUser.password === password &&
        registeredUser.userType === userType
    );

    if (!user) {
      setError(
        "E-mail, senha ou tipo de usuário incorretos. Verifique seus dados."
      );
      return;
    }

    // Armazena uma sessão demonstrativa sem salvar a senha
    const session = {
      name: user.name,
      email: user.email,
      userType: user.userType,
      profession: user.profession,
    };

    localStorage.setItem("pertodaki_session", JSON.stringify(session));

    if (user.userType === "client") {
      navigate("/cliente");
      return;
    }

    setSuccess(
      "Login validado com sucesso! O painel do prestador ainda está em desenvolvimento."
    );
  } catch {
  setError("Não foi possível verificar os dados armazenados.");
  }
}

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Painel visual */}
        <section className="relative hidden overflow-hidden bg-blue-700 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900" />

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700">
                <MapPin size={24} />
              </div>

              <span className="text-2xl font-bold text-white">
                PertoDaki
              </span>
            </Link>
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
              <ShieldCheck size={30} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
              Conectando você aos melhores profissionais.
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Encontre serviços perto de você, conheça profissionais
              e descubra novas oportunidades.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-blue-700 object-cover"
                />

                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-blue-700 object-cover"
                />

                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80"
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-blue-700 object-cover"
                />
              </div>

              <p className="text-sm text-blue-100">
                Clientes e profissionais conectados
              </p>
            </div>
          </div>

          <div className="relative z-10 text-sm text-blue-200">
            © 2026 PertoDaki. Conectando pessoas e serviços.
          </div>
        </section>

        {/* Formulário */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={18} />
              Voltar para o início
            </Link>

            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <MapPin size={22} />
                </div>

                <span className="text-xl font-bold text-slate-900">
                  Perto<span className="text-blue-600">Daki</span>
                </span>
              </Link>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Bem-vindo de volta!
              </h2>

              <p className="mt-3 text-slate-500">
                Entre na sua conta para continuar.
              </p>
            </div>

            {/* Seleção do tipo de usuário */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserType("client");
                  setError("");
                  setSuccess("");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border p-4 transition ${
                  userType === "client"
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <UserRound size={20} />
                <span className="font-medium">Cliente</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserType("provider");
                  setError("");
                  setSuccess("");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border p-4 transition ${
                  userType === "provider"
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <BriefcaseBusiness size={20} />
                <span className="font-medium">Prestador</span>
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Senha
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setError(
                        "Recuperação de senha estará disponível em uma futura implementação."
                      );
                      setSuccess("");
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Digite sua senha"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Feedback */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Entrar
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Ainda não possui uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Esta tela faz parte do protótipo Front-end do PertoDaki.
              Nenhuma autenticação real é realizada.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
