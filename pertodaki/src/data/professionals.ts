
export type Professional = {
    id: number;
    name: string;
    profession: string;
    category: string;
    rating: number;
    reviews: number;
    distance: string;
    location: string;
    image: string;
    description: string;
    available: boolean;
};

export const professionals: Professional[] = [
  {
    id: 1,
    name: "Carlos Oliveira",
    profession: "Eletricista",
    category: "Eletricista",
    rating: 4.9,
    reviews: 124,
    distance: "1,2 km",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    description: "Instalações elétricas e manutenção residencial.",
    available: true,
  },
  {
    id: 2,
    name: "Marcos Santos",
    profession: "Encanador",
    category: "Encanador",
    rating: 4.8,
    reviews: 98,
    distance: "2,4 km",
    location: "Bairro de Fátima",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    description: "Reparos hidráulicos e instalações.",
    available: true,
  },
  {
    id: 3,
    name: "André Martins",
    profession: "Pintor",
    category: "Pintor",
    rating: 5.0,
    reviews: 76,
    distance: "3,1 km",
    location: "São João",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    description: "Pintura residencial e acabamento.",
    available: false,
  },
  {
    id: 4,
    name: "Roberto Lima",
    profession: "Técnico em informática",
    category: "Informática",
    rating: 4.7,
    reviews: 63,
    distance: "1,8 km",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    description: "Manutenção de computadores e notebooks.",
    available: true,
  },
  {
    id: 5,
    name: "Felipe Costa",
    profession: "Montador de móveis",
    category: "Reparos",
    rating: 4.9,
    reviews: 51,
    distance: "4,0 km",
    location: "Paciência",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=500&q=80",
    description: "Montagem e desmontagem de móveis.",
    available: true,
  },
  {
    id: 6,
    name: "Lucas Ferreira",
    profession: "Jardineiro",
    category: "Jardinagem",
    rating: 4.8,
    reviews: 42,
    distance: "2,9 km",
    location: "Parque Recreio",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    description: "Manutenção de jardins e poda.",
    available: false,
  },
];