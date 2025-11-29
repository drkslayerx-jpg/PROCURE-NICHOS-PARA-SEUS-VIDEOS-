export interface Source {
  title: string;
  url: string;
}

export interface NicheResult {
  id: string;
  name: string;
  description: string;
  trendScore: number; // 0 to 100
  competitionLevel: 'Baixa' | 'Média' | 'Alta';
  targetAudience: string;
  reasonForVirality: string;
  exampleChannels: string[];
  monetizationPotential: string;
  searchSources?: Source[];
}

export interface VideoIdea {
  title: string;
  thumbnailConcept: string;
  hook: string;
  outline: string[];
}

export enum Region {
  GLOBAL = 'Global (Mundo Todo)',
  BRAZIL = 'Brasil',
  USA = 'Estados Unidos',
  LATAM = 'América Latina',
  EUROPE = 'Europa',
  ASIA = 'Ásia'
}

export enum Category {
  TRUE_CRIME = 'True Crime & Mistérios',
  HORROR = 'Terror, Lendas & Creepypastas',
  HISTORY = 'História & Guerras',
  MYTHOLOGY = 'Mitologia & Folclore',
  BIBLICAL = 'Histórias Bíblicas & Fé',
  CURIOSITIES = 'Curiosidades Sombrias & Fatos',
  BIOGRAPHIES = 'Biografias & Superação',
  STOICISM = 'Estoicismo & Filosofia',
  SCIFI = 'Futuro & Paradoxos',
  CONSPIRACY = 'Teorias & Enigmas',
  EMOTIONAL = 'Histórias Emocionantes de Vida'
}