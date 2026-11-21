import ThemeToggle from "../../components/ui/ThemeToggle";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Home,
  Compass,
  ClipboardList,
  Heart,
  Settings,
  Bell,
  Menu,
  X,
  Star,
  SlidersHorizontal,
  ArrowRight,
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
  Laptop,
  Trees,
  LogOut,
  UserRound,
} from "lucide-react";

import { professionals } from "../../data/professionals";

const categories = [
  { name: "Todos", icon: Compass },
  { name: "Eletricista", icon: Zap },
  { name: "Encanador", icon: Droplets },
  { name: "Pintor", icon: Paintbrush },
  { name: "Informática", icon: Laptop },
  { name: "Reparos", icon: Wrench },
  { name: "Jardinagem", icon: Trees },
];

function ClientDashboard() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        professional.category === selectedCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        professional.name.toLowerCase().includes(searchText) ||
        professional.profession.toLowerCase().includes(searchText) ||
        professional.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }

  const navigation = [
    { name: "Início", icon: Home, active: true, href: "/cliente" },
    { name: "Explorar", icon: Compass, active: false, href: "/cliente" },
    { name: "Solicitações", icon: ClipboardList, active: false, href: "/cliente/solicitacoes" },
    { name: "Favoritos", icon: Heart, active: false, href: "/cliente/favoritos" },
    { name: "Configurações", icon: Settings, active: false, href: "/cliente/configuracoes" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          aria-label="Fechar menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden cursor-pointer"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <MapPin size={23} />
            </div>
            <span className="text-xl font-bold text-slate-900 cursor-pointer">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={21} />
          </button>
        </div>

        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">
              <UserRound size={22} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900 dark:text-slate-white">
                Olá, visitante!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Área do cliente</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-5">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu principal
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer ${
                  item.active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-5">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <LogOut size={19} />
            Voltar ao início
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="min-h-screen lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu size={23} />
            </button>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Painel do cliente
              </p>
              <p className="hidden text-xs text-slate-400 sm:block">
                Encontre serviços perto de você
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              aria-label="Notificações"
              className="relative rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-500 hover:bg-slate-50 cursor-pointer"
              onClick={() => alert("Notificações estarão disponíveis futuramente.")}
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              V
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8">
          {/* Welcome */}
          <section>
            <p className="font-medium text-blue-600">PertoDaki</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Encontre o profissional ideal
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Descubra profissionais e serviços para facilitar seu dia a dia.
            </p>
          </section>

          {/* Search banner */}
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white shadow-sm sm:p-9">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Do que você precisa hoje?
              </h2>
              <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                Pesquise um serviço ou escolha uma categoria para encontrar profissionais.
              </p>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-500">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search size={21} className="shrink-0 text-slate-400 cursor-pointer" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Ex.: eletricista, encanador..."
                    className="w-full min-w-0 py-3 text-sm text-slate-800 dark:text-white outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  onClick={() => {
                    document
                      .getElementById("professionals")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
                >
                  Buscar profissionais
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                <MapPin size={16} />
                <span>Localização demonstrativa</span>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-5 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Profissionais</span>
                <Compass className="text-blue-600" size={21} />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {professionals.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">Perfis demonstrativos</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-5 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Favoritos</span>
                <Heart className="text-rose-500" size={21} />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {favorites.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">Salvos nesta sessão</p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-5 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Disponíveis</span>
                <UserRound className="text-emerald-600" size={21} />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {professionals.filter((p) => p.available).length}
              </p>
              <p className="mt-1 text-xs text-slate-400">Disponibilidade simulada</p>
            </div>
          </section>

          {/* Categories */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Categorias de serviços
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Escolha o tipo de serviço que procura.
                </p>
              </div>

              <SlidersHorizontal size={20} className="text-slate-400" />
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = selectedCategory === category.name;

                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition cursor-pointer ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 dark:border-slate-800 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={18} />
                    {category.name}
                  </button>
                  
                );
              })}
            </div>
          </section>

          {/* Professionals */}
          <section id="professionals">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Profissionais em destaque
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Conheça profissionais que podem ajudar você.
                </p>
              </div>

              <span className="text-sm font-medium text-blue-600">
                {filteredProfessionals.length} resultado(s)
              </span>
            </div>

            {filteredProfessionals.length > 0 ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProfessionals.map((professional) => (
                  <article
                    key={professional.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={professional.image}
                        alt={`Foto ilustrativa de ${professional.name}`}
                        className="h-48 w-full object-cover"
                      />

                      <button
                        onClick={() => toggleFavorite(professional.id)}
                        aria-label={
                          favorites.includes(professional.id)
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                        }
                        className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 cursor-pointer ${
                          favorites.includes(professional.id)
                            ? "text-rose-500"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={
                            favorites.includes(professional.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <span
                        className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${
                          professional.available
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {professional.available ? "Disponível" : "Indisponível"}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-medium text-blue-600">
                        {professional.profession}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {professional.name}
                      </h3>

                      <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
                        {professional.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star
                            size={16}
                            className="fill-amber-400 text-amber-400"
                          />
                          <strong>{professional.rating.toFixed(1)}</strong>
                          <span className="text-slate-400">
                            ({professional.reviews})
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin size={15} className="text-blue-600" />
                          {professional.distance}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          alert(
                            `O perfil de ${professional.name} será implementado em uma próxima etapa.`
                          )
                        }
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white cursor-pointer"
                      >
                        Ver perfil
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <Search className="mx-auto text-slate-400" size={32} />
                <h3 className="mt-3 font-semibold text-slate-800">
                  Nenhum profissional encontrado
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Experimente alterar sua pesquisa ou categoria.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("Todos");
                  }}
                  className="mt-4 font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
            © 2026 PertoDaki — Protótipo de aplicação Front-end.
          </footer>
        </main>
      </div>
    </div>
  );
}

export default ClientDashboard;