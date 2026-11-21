
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Clock,
  BriefcaseBusiness,
  MessageCircle,
  CheckCircle2,
  Image as ImageIcon,
  UserRound,
} from "lucide-react";

import { professionals } from "../../data/professionals";
import ThemeToggle from "../../components/ui/ThemeToggle";

const additionalProfileData: Record<
  string,
  {
    experience: string;
    services: string[];
    portfolio: string[];
    reviewsList: {
      name: string;
      rating: number;
      comment: string;
      date: string;
    }[];
  }
> = {
  "1": {
    experience: "8 anos",
    services: [
      "Instalação elétrica",
      "Manutenção elétrica residencial",
      "Troca de tomadas e interruptores",
      "Instalação de iluminação",
      "Reparos em circuitos",
      "Instalação de ventiladores",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
    ],
    reviewsList: [
      {
        name: "Ana Paula",
        rating: 5,
        comment:
          "Excelente profissional. Realizou o serviço com muita atenção e organização. Recomendo!",
        date: "12/10/2026",
      },
      {
        name: "Ricardo Alves",
        rating: 5,
        comment:
          "Muito pontual e cuidadoso. Explicou o problema e resolveu tudo.",
        date: "03/10/2026",
      },
      {
        name: "Maria Oliveira",
        rating: 4,
        comment:
          "Bom atendimento e serviço realizado conforme combinado.",
        date: "25/09/2026",
      },
    ],
  },

  "2": {
    experience: "6 anos",
    services: [
      "Reparos hidráulicos",
      "Instalação de torneiras",
      "Desentupimentos",
      "Instalação de chuveiros",
      "Reparo de vazamentos",
      "Manutenção hidráulica",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
    ],
    reviewsList: [
      {
        name: "Carlos Eduardo",
        rating: 5,
        comment:
          "Resolveu o vazamento rapidamente. Muito profissional.",
        date: "15/10/2026",
      },
      {
        name: "Fernanda Lima",
        rating: 5,
        comment:
          "Atendimento ótimo, serviço bem feito e preço justo.",
        date: "05/10/2026",
      },
      {
        name: "Paulo Mendes",
        rating: 4,
        comment:
          "Profissional atencioso. Recomendo os serviços.",
        date: "20/09/2026",
      },
    ],
  },

  "3": {
    experience: "10 anos",
    services: [
      "Pintura residencial",
      "Pintura de fachadas",
      "Pintura de interiores",
      "Preparação de paredes",
      "Texturização",
      "Acabamentos",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7822?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7822?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595814433015-e6f5f5b5a6a6?auto=format&fit=crop&w=900&q=80",
    ],
    reviewsList: [
      {
        name: "Juliana Costa",
        rating: 5,
        comment:
          "A pintura ficou muito bonita. Excelente acabamento.",
        date: "10/10/2026",
      },
      {
        name: "André Silva",
        rating: 5,
        comment:
          "Organizado, pontual e muito cuidadoso com o ambiente.",
        date: "02/10/2026",
      },
      {
        name: "Mariana Santos",
        rating: 5,
        comment:
          "Gostei muito do resultado. Trabalho de qualidade.",
        date: "18/09/2026",
      },
    ],
  },
};

function ProfessionalProfilePage() {
  const { id } = useParams();

const professional = professionals.find(
  (item) => item.id === Number(id),
);

  const [favorite, setFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem(
      "pertodaki_favorites",
    );

    if (!savedFavorites) return false;

    try {
      const parsedFavorites: number[] = JSON.parse(savedFavorites);
        return parsedFavorites.includes(Number(id));
    } catch {
      return false;
    }
  });

const [requestSent, setRequestSent] = useState(false);
const [showRequestForm, setShowRequestForm] = useState(false);

const [requestDescription, setRequestDescription] = useState("");
const [requestAddress, setRequestAddress] = useState("");
const [preferredDate, setPreferredDate] = useState("");
const [requestNotes, setRequestNotes] = useState("");

  if (!professional) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center text-slate-900 dark:bg-slate-950 dark:text-white">
        <UserRound size={60} className="text-slate-400" />

        <h1 className="mt-6 text-2xl font-bold">
          Profissional não encontrado
        </h1>

        <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
          Não foi possível encontrar o profissional solicitado.
          Verifique o endereço ou volte ao dashboard.
        </p>

        <Link
          to="/cliente"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Voltar ao dashboard
        </Link>
      </div>
    );
  }

  const profileDetails =
    additionalProfileData[professional.id] ??
    additionalProfileData["1"];

const toggleFavorite = () => {
  const savedFavorites = localStorage.getItem(
    "pertodaki_favorites",
  );

  let favoritesList: number[] = [];

  try {
    favoritesList = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  } catch {
    favoritesList = [];
  }

  const updatedFavorites = favorite
    ? favoritesList.filter(
        (favoriteId) => favoriteId !== professional.id,
      )
    : [
        ...favoritesList.filter(
          (favoriteId) => favoriteId !== professional.id,
        ),
        professional.id,
      ];

  localStorage.setItem(
    "pertodaki_favorites",
    JSON.stringify(updatedFavorites),
  );

  setFavorite(!favorite);
};

  const handleRequest = () => {
  setShowRequestForm(true);
};

const handleSubmitRequest = (
  event: React.FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  const newRequest = {
    id: Date.now().toString(),
    professionalId: professional.id,
    professionalName: professional.name,
    profession: professional.profession,
    description: requestDescription,
    address: requestAddress,
    preferredDate,
    notes: requestNotes,
    status: "Pendente",
    createdAt: new Date().toISOString(),
  };

  try {
    const savedRequests = localStorage.getItem("pertodaki_requests");

    const requests = savedRequests
      ? JSON.parse(savedRequests)
      : [];

    const updatedRequests = [...requests, newRequest];

    localStorage.setItem(
      "pertodaki_requests",
      JSON.stringify(updatedRequests),
    );

    setRequestSent(true);
    setShowRequestForm(false);

    setRequestDescription("");
    setRequestAddress("");
    setPreferredDate("");
    setRequestNotes("");
  } catch (error) {
    console.error("Erro ao salvar solicitação:", error);
    alert("Não foi possível salvar sua solicitação.");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <MapPin size={22} />
            </div>

            <span className="text-xl font-bold">
              Perto<span className="text-blue-600">Daki</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/cliente"
              className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:flex"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

        {/* BACK */}
        <Link
          to="/cliente"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400"
        >
          <ArrowLeft size={18} />
          Voltar para profissionais
        </Link>

        {/* PROFILE HEADER */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

          {/* COVER */}
          <div className="relative h-48 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 sm:h-64">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:left-8">
              <ShieldCheck size={18} />
              Perfil profissional
            </div>
          </div>

          {/* PROFILE INFO */}
          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-16 flex flex-col gap-6 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="h-32 w-32 rounded-3xl border-4 border-white object-cover shadow-lg dark:border-slate-900 sm:h-40 sm:w-40"
                />

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                      {professional.name}
                    </h1>

                    <CheckCircle2
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  <p className="mt-2 text-lg font-medium text-blue-600">
                    {professional.profession}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <MapPin size={17} />
                      {professional.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness size={17} />
                      {profileDetails.experience} de experiência
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ${
                    favorite
                      ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <Heart
                    size={19}
                    className={favorite ? "fill-current" : ""}
                  />
                  {favorite ? "Favoritado" : "Favoritar"}
                </button>

                <button
                  type="button"
                  onClick={handleRequest}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <MessageCircle size={19} />
                  Solicitar serviço
                </button>
              </div>
            </div>

            {/* RATING */}
            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Star
                  size={22}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="text-xl font-bold">
                  {professional.rating}
                </span>
              </div>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                {professional.reviews} avaliações
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  professional.available
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {professional.available
                  ? "Disponível"
                  : "Indisponível"}
              </span>
            </div>
          </div>
        </section>

        {/* REQUEST FEEDBACK */}
        {requestSent && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={22}
                className="mt-0.5 text-blue-600"
              />

              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                  Solicitação demonstrativa
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Sua solicitação foi simulada com sucesso.
                  Esta funcionalidade ainda não envia pedidos
                  reais, pois o sistema está sendo desenvolvido
                  exclusivamente no front-end.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* REQUEST FORM */}
{showRequestForm && (
  <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900 dark:bg-slate-900 sm:p-8">
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Solicitar serviço
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Preencha as informações para enviar sua solicitação
        a {professional.name}.
      </p>
    </div>

    <form onSubmit={handleSubmitRequest} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Descreva o serviço que precisa *
        </label>

        <textarea
          required
          value={requestDescription}
          onChange={(event) =>
            setRequestDescription(event.target.value)
          }
          placeholder="Explique o que precisa ser realizado..."
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Endereço do atendimento *
        </label>

        <input
          required
          type="text"
          value={requestAddress}
          onChange={(event) =>
            setRequestAddress(event.target.value)
          }
          placeholder="Rua, número, bairro e cidade"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Data preferencial *
        </label>

        <input
          required
          type="date"
          value={preferredDate}
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(event) =>
            setPreferredDate(event.target.value)
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Observações adicionais
        </label>

        <textarea
          value={requestNotes}
          onChange={(event) =>
            setRequestNotes(event.target.value)
          }
          placeholder="Informações adicionais (opcional)"
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setShowRequestForm(false)}
          className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Enviar solicitação
        </button>
      </div>
    </form>
  </section>
)}

        {/* ABOUT AND SERVICES */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ABOUT */}
          <section className="space-y-8 lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold">
                Sobre o profissional
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                {professional.description}
              </p>

              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
                Profissional com {profileDetails.experience} de
                experiência na área, comprometido com a qualidade,
                organização e atendimento. Os dados exibidos
                nesta página são demonstrativos e fazem parte
                da versão de protótipo do PertoDaki.
              </p>
            </div>

            {/* SERVICES */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  size={22}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-bold">
                  Serviços oferecidos
                </h2>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {profileDetails.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-blue-600"
                    />

                    <span className="text-sm font-medium">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PORTFOLIO */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center gap-3">
                <ImageIcon
                  size={22}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-bold">
                  Portfólio
                </h2>
              </div>

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Alguns exemplos ilustrativos de trabalhos.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profileDetails.portfolio.map((image, index) => (
                  <div
                    key={`${professional.id}-portfolio-${index}`}
                    className="group overflow-hidden rounded-xl"
                  >
                    <img
                      src={image}
                      alt={`Exemplo de trabalho ${index + 1} de ${professional.name}`}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center gap-3">
                <Star
                  size={22}
                  className="text-amber-400"
                />

                <h2 className="text-xl font-bold">
                  Avaliações de clientes
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                {profileDetails.reviewsList.map((review, index) => (
                  <div
                    key={`${review.name}-${index}`}
                    className="border-b border-slate-200 pb-6 last:border-0 last:pb-0 dark:border-slate-800"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                          <UserRound size={20} />
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {review.name}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {review.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {Array.from(
                          { length: review.rating },
                          (_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={16}
                              className="fill-amber-400 text-amber-400"
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SIDEBAR INFO */}
          <aside className="space-y-6">

            {/* AVAILABILITY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">
                Informações
              </h2>

              <div className="mt-5 space-y-5">
                <div className="flex items-start gap-3">
                  <Clock
                    size={20}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="font-medium">
                      Disponibilidade
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {professional.available
                        ? "Disponível para solicitações"
                        : "Indisponível no momento"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="font-medium">
                      Localização
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {professional.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BriefcaseBusiness
                    size={20}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="font-medium">
                      Categoria
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {professional.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-blue-600 p-6 text-white">
              <h2 className="text-xl font-bold">
                Precisa deste serviço?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                Entre em contato com o profissional e
                solicite um atendimento.
              </p>

              <button
                type="button"
                onClick={handleRequest}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                <MessageCircle size={18} />
                Solicitar serviço
              </button>

              <p className="mt-4 text-center text-xs text-blue-100">
                Funcionalidade demonstrativa
              </p>
            </div>

            {/* TRUST */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-950/30">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="font-bold">
                  Conheça o profissional
                </h2>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Consulte as informações disponíveis,
                serviços, portfólio e avaliações para
                conhecer melhor o prestador.
              </p>
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 py-6 dark:border-slate-800">
          <div className="flex flex-col justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} PertoDaki.
            </p>

            <Link
              to="/cliente"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              Voltar ao dashboard
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ProfessionalProfilePage;
