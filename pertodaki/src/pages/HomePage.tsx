
import {
  Search,
  MapPin,
  Menu,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Zap,
  Paintbrush,
  Droplets,
  Laptop,
  Scissors,
  Hammer,
} from "lucide-react";

const categories = [
  { name: "Encanador", icon: Droplets },
  { name: "Eletricista", icon: Zap },
  { name: "Pintor", icon: Paintbrush },
  { name: "Reparos", icon: Hammer },
  { name: "Informática", icon: Laptop },
  { name: "Beleza", icon: Scissors },
];

const professionals = [
  {
    name: "Carlos Oliveira",
    profession: "Eletricista",
    rating: "4.9",
    reviews: 124,
    distance: "1,2 km",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Marcos Santos",
    profession: "Encanador",
    rating: "4.8",
    reviews: 98,
    distance: "2,4 km",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "André Martins",
    profession: "Pintor",
    rating: "5.0",
    reviews: 76,
    distance: "3,1 km",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <MapPin size={23} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-medium text-blue-600">
              Início
            </a>
            <a href="#categorias" className="text-slate-600 hover:text-blue-600">
              Categorias
            </a>
            <a
              href="#profissionais"
              className="text-slate-600 hover:text-blue-600"
            >
              Profissionais
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600">
              Como funciona
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-xl px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Entrar
            </button>

            <button className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
              Cadastrar
            </button>
          </div>

          <button className="rounded-lg p-2 text-slate-700 md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <MapPin size={16} />
                Serviços perto de você
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Encontre profissionais{" "}
                <span className="text-blue-600">perto de você.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Precisou de um serviço? Encontre profissionais da sua região,
                conheça seus trabalhos e entre em contato de forma simples.
              </p>

              {/* Search */}
              <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search className="text-slate-400" size={22} />

                  <input
                    type="text"
                    placeholder="Qual serviço você precisa?"
                    className="w-full bg-transparent py-3 outline-none"
                  />
                </div>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                  Buscar
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-600" />
                  Profissionais avaliados
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  Fácil e rápido
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
                  alt="Profissional realizando serviço residencial"
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </div>

              <div className="absolute -bottom-5 left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:-left-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <ShieldCheck size={26} />
                  </div>

                  <div>
                    <p className="font-bold">Conexão simplificada</p>
                    <p className="text-sm text-slate-500">
                      Clientes e profissionais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categorias" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-medium text-blue-600">
                  Encontre o que precisa
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Explore as categorias
                </h2>

                <p className="mt-3 text-slate-500">
                  Serviços para facilitar o seu dia a dia.
                </p>
              </div>

              <button className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700">
                Ver todas
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.name}
                    className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={26} />
                    </div>

                    <span className="text-center font-medium">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Professionals */}
        <section id="profissionais" className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div>
              <p className="font-medium text-blue-600">
                Destaques da região
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Profissionais em destaque
              </h2>

              <p className="mt-3 text-slate-500">
                Conheça profissionais que podem ajudar você.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {professionals.map((professional) => (
                <article
                  key={professional.name}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                      <div>
                        <h3 className="text-lg font-bold">
                          {professional.name}
                        </h3>

                        <p className="mt-1 text-slate-500">
                          {professional.profession}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          <Star
                            size={16}
                            className="fill-amber-400 text-amber-400"
                          />

                          <span className="font-medium">
                            {professional.rating}
                          </span>

                          <span className="text-sm text-slate-400">
                            ({professional.reviews} avaliações)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} className="text-blue-600" />
                        {professional.distance}
                      </div>

                      <button className="rounded-xl bg-blue-50 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white">
                        Ver perfil
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl rounded-3xl bg-blue-600 px-8 py-12 text-white md:px-16 md:py-16">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">
                  Você é um profissional?
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-blue-100">
                  Divulgue seus serviços, encontre clientes próximos e
                  amplie suas oportunidades de trabalho.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50">
                Quero me cadastrar
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />

            <span className="font-bold">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Conectando pessoas e profissionais.
          </p>

          <p className="text-sm text-slate-400">
            © 2026 PertoDaki
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
