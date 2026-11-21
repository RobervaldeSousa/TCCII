
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  MapPin,
  UserRound,
  BriefcaseBusiness,
  UserPlus,
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

function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Preencha todos os campos obrigatórios.");
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

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (userType === "provider" && !profession.trim()) {
      setError("Informe sua profissão ou especialidade.");
      return;
    }

    const registeredUser: RegisteredUser = {
      name,
      email,
      phone,
      password,
      userType,
      ...(userType === "provider" && {
        profession,
        description,
      }),
      createdAt: new Date().toISOString(),
    };

    try {
      const storedUsers = localStorage.getItem("pertodaki_users");
      const users: RegisteredUser[] = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      const emailExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        setError("Este e-mail já está cadastrado neste navegador.");
        return;
      }

      users.push(registeredUser);

      localStorage.setItem("pertodaki_users", JSON.stringify(users));

        // Redireciona o cliente para seu painel
        if (userType === "client") {
          navigate("/cliente");
          return;
        }
        
        setSuccess(
          "Cadastro realizado com sucesso! Seu cadastro de prestador foi armazenado neste navegador. O painel do profissional ainda será        implementado."
        );
        
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setProfession("");
        setDescription("");
    } catch {
      setError("Não foi possível armazenar os dados neste navegador.");
    }
  }

  function handleUserTypeChange(type: UserType) {
    setUserType(type);
    setError("");
    setSuccess("");
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
              <UserPlus size={30} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
              Faça parte de uma comunidade de serviços.
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Encontre oportunidades, descubra profissionais e
              conecte-se com pessoas perto de você.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-blue-100">
                <UserRound size={20} />
                <span>Encontre serviços para o seu dia a dia.</span>
              </div>

              <div className="flex items-center gap-3 text-blue-100">
                <BriefcaseBusiness size={20} />
                <span>Divulgue seu trabalho e suas especialidades.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-blue-200">
            © 2026 PertoDaki. Conectando pessoas e serviços.
          </div>
        </section>

        {/* Formulário */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-lg">
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
                Crie sua conta
              </h2>

              <p className="mt-3 text-slate-500">
                Preencha seus dados para começar.
              </p>
            </div>

            {/* Tipo de usuário */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleUserTypeChange("client")}
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
                onClick={() => handleUserTypeChange("provider")}
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
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Nome completo
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Digite seu nome completo"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

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
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Telefone
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Campos específicos do prestador */}
              {userType === "provider" && (
                <div className="space-y-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                  <div>
                    <label
                      htmlFor="profession"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Profissão ou especialidade
                    </label>

                    <input
                      id="profession"
                      type="text"
                      value={profession}
                      onChange={(event) => {
                        setProfession(event.target.value);
                        setError("");
                        setSuccess("");
                      }}
                      placeholder="Ex.: Eletricista, encanador..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Descrição dos serviços
                    </label>

                    <textarea
                      id="description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                        setError("");
                        setSuccess("");
                      }}
                      placeholder="Descreva brevemente os serviços que você oferece..."
                      rows={3}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Senha
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Mínimo de 6 caracteres"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirmar senha
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Digite sua senha novamente"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Ocultar confirmação"
                        : "Mostrar confirmação"
                    }
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
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
                  className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm leading-6 text-green-700"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                <UserPlus size={20} />
                Criar conta
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Já possui uma conta?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Entrar
                </Link>
              </p>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Protótipo Front-end. Os dados são armazenados apenas
              neste navegador para fins de demonstração.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default RegisterPage;
