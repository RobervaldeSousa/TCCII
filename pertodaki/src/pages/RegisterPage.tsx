
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MapPin size={22} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Perto<span className="text-blue-600">Daki</span>
          </span>
        </Link>

        <h1 className="text-3xl font-bold text-slate-900">
          Criar conta
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          Estamos preparando uma experiência simples para você
          se conectar ao PertoDaki.
        </p>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-blue-700">
            Cadastro em desenvolvimento
          </p>

          <p className="mt-2 text-sm leading-6 text-blue-600">
            Esta página será implementada na próxima etapa
            do projeto.
          </p>
        </div>

        <Link
          to="/login"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-medium text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Voltar para login
        </Link>

        <Link
          to="/"
          className="mt-4 block text-center text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          Voltar para página inicial
        </Link>
      </div>
    </main>
  );
}

export default RegisterPage;
