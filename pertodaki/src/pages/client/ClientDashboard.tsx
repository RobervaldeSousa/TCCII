
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Heart,
  Home,
  ClipboardList,
  Settings,
  Menu,
  X,
  ArrowRight,
  Bell,
  SlidersHorizontal,
  Zap,
  Droplets,
  Paintbrush,
  Laptop,
  Trees,
  Wrench,
  LogOut,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";
import { professionals } from "../../data/professionals";
import type { Professional } from "../../data/professionals";
import ThemeToggle from "../../components/ui/ThemeToggle";

const categories = [
  { name: "Todos", icon: Home },
  { name: "Eletricista", icon: Zap },
  { name: "Encanador", icon: Droplets },
  { name: "Pintor", icon: Paintbrush },
  { name: "Informática", icon: Laptop },
  { name: "Jardinagem", icon: Trees },
  { name: "Reparos", icon: Wrench },
];

type RegisteredUser = {
  name: string;
  email: string;
  userType: "client" | "provider";
  profession?: string;
  description?: string;
};

function ClientDashboard() {
  const [allProfessionals, setAllProfessionals] =
  useState<Professional[]>(professionals);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("pertodaki_users");

      if (!storedUsers) return;

      const users: RegisteredUser[] = JSON.parse(storedUsers);

      const registeredProviders: Professional[] = users
        .filter(
          (user) =>
            user.userType === "provider" &&
            user.email &&
            user.profession
        )
        .map((user) => {
          const profession = user.profession!.trim();
          const normalizedProfession = profession.toLowerCase();

          let category = "Reparos";

          if (normalizedProfession.includes("eletric")) {
            category = "Eletricista";
          } else if (normalizedProfession.includes("encan")) {
            category = "Encanador";
          } else if (
            normalizedProfession.includes("pint") ||
            normalizedProfession.includes("pintor")
          ) {
            category = "Pintor";
          } else if (
            normalizedProfession.includes("informática") ||
            normalizedProfession.includes("informatica") ||
            normalizedProfession.includes("computador") ||
            normalizedProfession.includes("técnico") ||
            normalizedProfession.includes("tecnico")
          ) {
            category = "Informática";
          } else if (
            normalizedProfession.includes("jardineir") ||
            normalizedProfession.includes("jardinagem")
          ) {
            category = "Jardinagem";
          }

          return {
            id: `provider:${user.email.toLowerCase()}`,
            email: user.email.toLowerCase(),
            name: user.name,
            profession,
            category,
            rating: 0,
            reviews: 0,
            distance: "Não informada",
            location: "Localização não informada",
            image: professionals[0].image,
            description:
              user.description?.trim() ||
              "Profissional cadastrado no PertoDaki.",
            available: true,
          };
        });

      setAllProfessionals([
        ...professionals,
        ...registeredProviders,
      ]);
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error);
    }
  }, []);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<Professional["id"][]>(() => {
  const savedFavorites = localStorage.getItem("pertodaki_favorites");

  try {
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredProfessionals = useMemo(() => {
    return allProfessionals.filter((professional) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        professional.category === selectedCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        professional.name.toLowerCase().includes(searchText) ||
        professional.profession.toLowerCase().includes(searchText) ||
        professional.description.toLowerCase().includes(searchText) ||
        professional.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [allProfessionals, search, selectedCategory]);

  const toggleFavorite = (id: Professional["id"]) => {
  setFavorites((currentFavorites) => {
    const updatedFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((favorite) => favorite !== id)
      : [...currentFavorites, id];

    localStorage.setItem(
      "pertodaki_favorites",
      JSON.stringify(updatedFavorites),
    );

    return updatedFavorites;
  });
};

  const favoriteProfessionals = allProfessionals.filter((professional) =>
  favorites.includes(professional.id),
);

const availableProfessionals = allProfessionals.filter(
  (professional) => professional.available,
);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <aside className="relative flex w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <MapPin size={22} />
                </div>

                <span className="text-xl font-bold">
                  Perto<span className="text-blue-600">Daki</span>
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">

          {/* LOGO */}
          <div className="border-b border-slate-200 p-6 dark:border-slate-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <MapPin size={24} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Perto<span className="text-blue-600">Daki</span>
              </span>
            </Link>
          </div>

          <SidebarContent />
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu size={20} />
                </button>

                <div className="min-w-0">
                  <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                    Área do cliente
                  </p>

                  <h1 className="truncate text-lg font-bold sm:text-xl">
                    Meu painel
                  </h1>
                </div>
              </div>

              {/* HEADER ACTIONS */}
              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />

                <button
                  type="button"
                  aria-label="Notificações"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Bell size={19} />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
                </button>

                <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800 sm:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Cliente
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Minha conta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* DASHBOARD BODY */}
          <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">

            {/* WELCOME */}
            <section className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white sm:p-8 lg:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

              <div className="absolute -bottom-20 right-40 h-48 w-48 rounded-full bg-white/10" />

              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-blue-50">
                  <MapPin size={15} />
                  Sua comunidade, mais próxima
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Olá! Seja bem-vindo ao PertoDaki.
                </h2>

                <p className="mt-4 max-w-xl leading-relaxed text-blue-100">
                  Encontre profissionais perto de você e
                  simplifique a resolução dos seus problemas
                  do dia a dia.
                </p>

                <a
                  href="#explorar"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Encontrar profissionais
                  <ArrowRight size={18} />
                </a>
              </div>
            </section>

            {/* STATS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <StatCard
                title="Profissionais"
                value={String(allProfessionals.length)}
                description="Cadastrados na plataforma"
                icon={<UserRound size={22} />}
              />

              <StatCard
                title="Disponíveis"
                value={String(availableProfessionals.length)}
                description="Disponíveis nos dados demonstrativos"
                icon={<Zap size={22} />}
              />

              <StatCard
                title="Favoritos"
                value={String(favorites.length)}
                description="Profissionais salvos por você"
                icon={<Heart size={22} />}
              />
            </section>

            {/* SEARCH */}
            <section
              id="explorar"
              className="scroll-mt-24"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">
                  Encontre um profissional
                </h2>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Pesquise por serviço, nome ou categoria.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-colors dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search
                    size={20}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Ex: eletricista, pintura, Carlos..."
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Search size={18} />
                  Pesquisar
                </button>
              </div>
            </section>

            {/* CATEGORIES */}
            <section>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">
                    Categorias
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Escolha o tipo de serviço.
                  </p>
                </div>

                <SlidersHorizontal
                  size={20}
                  className="text-slate-400"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected =
                    selectedCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(category.name)
                      }
                      className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700"
                      }`}
                    >
                      <Icon size={18} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* PROFESSIONALS */}
            <section>
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Profissionais
                  </h2>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    {filteredProfessionals.length} resultado(s)
                    encontrado(s).
                  </p>
                </div>
              </div>

              {filteredProfessionals.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProfessionals.map((professional) => {
                    const isFavorite = favorites.includes(
                      professional.id,
                    );

                    return (
                      <article
                        key={professional.id}
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                      >
                        {/* IMAGE */}
                        <div className="relative">
                          <img
                            src={professional.image}
                            alt={professional.name}
                            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />

                          <span
                            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              professional.available
                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                          >
                            {professional.available
                              ? "Disponível"
                              : "Indisponível"}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              toggleFavorite(professional.id)
                            }
                            aria-label={
                              isFavorite
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"
                            }
                            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
                              isFavorite
                                ? "bg-rose-500 text-white"
                                : "bg-white/90 text-slate-600 hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:text-rose-400"
                            }`}
                          >
                            <Heart
                              size={20}
                              className={
                                isFavorite ? "fill-current" : ""
                              }
                            />
                          </button>
                        </div>

                        {/* CARD BODY */}
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold">
                                {professional.name}
                              </h3>

                              <p className="mt-1 text-sm font-medium text-blue-600">
                                {professional.profession}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 dark:bg-amber-950/40">
                              <Star
                                size={16}
                                className="fill-amber-400 text-amber-400"
                              />

                              <span className="text-sm font-semibold">
                                {professional.rating}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin size={16} />
                            {professional.location}
                          </div>

                          <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {professional.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>
                              {professional.reviews} avaliações
                            </span>

                            <span className="rounded-lg bg-slate-100 px-2 py-1 dark:bg-slate-800">
                              {professional.category}
                            </span>
                          </div>

                          <Link
                            to={`/profissional/${professional.id}`}
                            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Ver perfil
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                  <Search
                    size={40}
                    className="mx-auto text-slate-400"
                  />

                  <h3 className="mt-4 text-lg font-bold">
                    Nenhum profissional encontrado
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Tente alterar a pesquisa ou selecionar
                    outra categoria.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("Todos");
                    }}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </section>

            {/* FAVORITES */}
            <section
              id="favoritos"
              className="scroll-mt-24"
            >
              <div className="mb-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                  <Heart
                    size={22}
                    className="text-rose-500"
                  />
                  Seus favoritos
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Profissionais que você salvou.
                </p>
              </div>

              {favoriteProfessionals.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {favoriteProfessionals.map((professional) => (
                    <div
                      key={professional.id}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold">
                          {professional.name}
                        </h3>

                        <p className="text-sm text-blue-600">
                          {professional.profession}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                          />
                          {professional.rating}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(professional.id)
                        }
                        className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        aria-label="Remover favorito"
                      >
                        <Heart
                          size={20}
                          className="fill-current"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                  <Heart
                    size={36}
                    className="mx-auto text-slate-300 dark:text-slate-600"
                  />

                  <h3 className="mt-4 font-semibold">
                    Você ainda não salvou favoritos
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Clique no coração de um profissional para
                    adicioná-lo à sua lista.
                  </p>
                </div>
              )}
            </section>

            {/* CTA */}
            <section className="overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30 sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Conhece um profissional?
                  </h2>

                  <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                    Compartilhe o PertoDaki e ajude profissionais
                    locais a encontrar novos clientes.
                  </p>
                </div>

                <Link
                  to="/cadastro"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Cadastrar profissional
                  <ArrowRight size={18} />
                </Link>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex flex-col justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center">
                <p>
                  © {new Date().getFullYear()} PertoDaki.
                </p>

                <Link
                  to="/"
                  className="font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Voltar para página inicial
                </Link>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

/* SIDEBAR CONTENT */

function SidebarContent() {
  return (
    <div className="flex flex-1 flex-col p-5">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Menu principal
      </p>

      <nav className="space-y-2">
        <SidebarLink
          icon={<Home size={20} />}
          label="Dashboard"
          href="/cliente"
          active
        />

        <SidebarLink
          icon={<ClipboardList size={20} />}
          label="Solicitações"
          href="/cliente/solicitacoes"
        />

        <SidebarLink
          icon={<Heart size={20} />}
          label="Favoritos"
          href="/cliente/favoritos"
        />

        <SidebarLink
          icon={<Settings size={20} />}
          label="Configurações"
          href="/cliente/configuracoes"
        />
      </nav>

      <div className="mt-auto pt-8">
        <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/40">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <MapPin size={20} />
          </div>

          <h3 className="mt-3 font-semibold">
            PertoDaki
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Conectando você a profissionais da sua região.
          </p>

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Página inicial
            <ArrowRight size={16} />
          </Link>
        </div>

        <Link
          to="/login"
          className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <LogOut size={20} />
          Sair
        </Link>
      </div>
    </div>
  );
}

/* SIDEBAR LINK */

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarLink({
  icon,
  label,
  href,
  active = false,
}: SidebarLinkProps) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
          : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

/* STAT CARD */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default ClientDashboard;
