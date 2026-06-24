import type { RecipeCategory } from '../../types/recipe';

export type HomeRecipeForm = {
  nome: string;
  categoria: RecipeCategory;
  tempo: string;
  porcoes: string;
  imagem: string;
  ingredientes: string;
  preparo: string;
};

export const emptyRecipeForm: HomeRecipeForm = {
  nome: '',
  categoria: 'Doces',
  tempo: '',
  porcoes: '',
  imagem: '',
  ingredientes: '',
  preparo: '',
};

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function splitList(value: string, fallback: string[]) {
  const items = value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
}

