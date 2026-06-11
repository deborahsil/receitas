export type RecipeCategory = 'Doces' | 'Salgados' | 'Bebidas';

export type Recipe = {
  id: string;
  nome: string;
  categoria: RecipeCategory;
  imagem: string;
  tempo: string;
  porcoes: string;
  dificuldade: 'Facil' | 'Media' | 'Caprichada';
  descricao: string;
  ingredientes: string[];
  preparo: string[];
  destaque?: boolean;
  favorita?: boolean;
};

