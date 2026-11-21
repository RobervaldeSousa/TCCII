
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  Droplets,
  Paintbrush,
  Laptop,
  Trees,
  Wrench,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

const categories = [
  { name: "Eletricista", icon: Zap },
  { name: "Encanador", icon: Droplets },
  { name: "Pintor", icon: Paintbrush },
  { name: "Informática", icon: Laptop },
  { name: "Jardinagem", icon: Trees },
  { name: "Reparos", icon: Wrench },
];

const professionals = [
  {
    name: "Carlos Mendes",
    profession: "Eletricista",
    rating: "4.9",
    reviews: 128,
    location: "Piripiri, PI",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "João Ferreira",
    profession: "Encanador",
    rating: "4.8",
    reviews: 96,
    location: "Piripiri, PI",
    image:
      "https://images.unsplash.com/photo-1621619856624-42fd193a0661?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcos Oliveira",
    profession: "Pintor",
    rating: "5.0",
    reviews: 74,
    location: "Piripiri, PI",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <MapPin size={23} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#categorias"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
            >
              Categorias
            </a>

            <a
              href="#profissionais"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
            >
              Profissionais
            </a>

            <a
              href="#sobre"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
            >
              Sobre
            </a>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:block"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:block"
            >
              Criar conta
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200 md:hidden"
              aria-label="Menu"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-50 transition-colors dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">

          {/* HERO TEXT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
              <MapPin size={16} />
              Serviços perto de você
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Encontre quem resolve.
              <span className="mt-2 block text-blue-600">
                Bem perto de você.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Encontre profissionais qualificados na sua região
              para resolver o que você precisa. Simples, rápido
              e conectado à sua comunidade.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/40 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:shadow-none sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search className="shrink-0 text-slate-400" size={20} />

                <input
                  type="text"
                  placeholder="Qual serviço você precisa?"
                  className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <Search size={18} />
                Buscar
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>Popular:</span>
              <span className="text-blue-600">Eletricista</span>
              <span>•</span>
              <span className="text-blue-600">Encanador</span>
              <span>•</span>
              <span className="text-blue-600">Pintor</span>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/40" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
                alt="Profissional realizando serviço de manutenção"
                className="h-[350px] w-full object-cover sm:h-[450px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Profissionais da sua região
                    </p>

                    <p className="text-sm text-slate-200">
                      Conecte-se com quem está por perto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categorias"
        className="py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 text-center">
            <span className="font-semibold text-blue-600">
              Categorias
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              O que você precisa resolver?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              Explore diferentes categorias e encontre profissionais
              para os serviços que você precisa.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  type="button"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <span className="text-center text-sm font-semibold">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section
        id="profissionais"
        className="bg-slate-50 py-20 transition-colors dark:bg-slate-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="font-semibold text-blue-600">
                Destaques
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Profissionais em destaque
              </h2>

              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Conheça alguns profissionais disponíveis.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Explorar profissionais
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {professionals.map((professional) => (
              <article
                key={professional.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="relative">
                  <img
                    src={professional.image}
                    alt={professional.profession}
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-600 shadow dark:bg-slate-900">
                    Disponível
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        {professional.name}
                      </h3>

                      <p className="mt-1 text-sm text-blue-600">
                        {professional.profession}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 dark:bg-amber-950/40">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {professional.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={16} />
                    {professional.location}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Star size={16} />
                    {professional.reviews} avaliações
                  </div>

                  <Link
                    to="/login"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    Ver profissional
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="sobre"
        className="py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <span className="font-semibold text-blue-600">
                Por que PertoDaki?
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Conectando pessoas e profissionais.
              </h2>

              <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">
                O PertoDaki nasceu com a proposta de facilitar
                a busca por serviços locais, aproximando clientes
                de profissionais autônomos e valorizando os
                prestadores de serviços de cada região.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Proximidade
                    </h3>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Encontre prestadores de serviços próximos
                      de onde você está.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Transparência
                    </h3>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Consulte informações e avaliações para
                      conhecer melhor os profissionais.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Clock size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Praticidade
                    </h3>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Simplifique a busca por serviços e economize
                      tempo no seu dia a dia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85"
                alt="Pessoas trabalhando e colaborando"
                className="h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA PROVIDER */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Você é um profissional?
              </h2>

              <p className="mt-4 max-w-2xl text-blue-100">
                Divulgue seus serviços, encontre novos clientes
                e faça parte da comunidade PertoDaki.
              </p>
            </div>

            <Link
              to="/cadastro"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Quero ser profissional
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 transition-colors dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <MapPin size={20} />
            </div>

            <span className="text-lg font-bold">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </Link>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} PertoDaki. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <Link
              to="/login"
              className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
