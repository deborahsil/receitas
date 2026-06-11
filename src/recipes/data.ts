import type { Recipe, RecipeCategory } from '../types/recipe';

export const categoryDetails: Record<
  RecipeCategory,
  { title: string; subtitle: string; color: string }
> = {
  Doces: {
    title: 'Doces',
    subtitle: 'Sobremesas, bolos e receitas para adoçar o dia.',
    color: '#FF8A1F',
  },
  Salgados: {
    title: 'Salgados',
    subtitle: 'Lanches e pratos práticos para qualquer momento.',
    color: '#F05A28',
  },
  Bebidas: {
    title: 'Bebidas',
    subtitle: 'Opções geladas, cremosas e refrescantes.',
    color: '#2AA198',
  },
};

export const fallbackImages: Record<RecipeCategory, string> = {
  Doces:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
  Salgados:
    'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1200&q=80',
  Bebidas:
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
};

export const receitas: Record<string, Recipe> = {
  '1': {
    id: '1',
    nome: 'Brownie Cremoso',
    categoria: 'Doces',
    imagem:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    tempo: '40 min',
    porcoes: '8 porcoes',
    dificuldade: 'Facil',
    descricao:
      'Casquinha crocante por fora e massa macia por dentro, perfeito para servir com sorvete.',
    ingredientes: [
      '200g de chocolate meio amargo',
      '150g de manteiga',
      '3 ovos',
      '1 xicara de acucar',
      '1 xicara de farinha de trigo',
    ],
    preparo: [
      'Derreta o chocolate com a manteiga em fogo baixo.',
      'Misture os ovos com o acucar ate formar um creme.',
      'Incorpore o chocolate derretido e a farinha.',
      'Leve ao forno preaquecido por cerca de 30 minutos.',
    ],
    destaque: true,
    favorita: true,
  },
  '2': {
    id: '2',
    nome: 'Donuts Coloridos',
    categoria: 'Doces',
    imagem:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    tempo: '1 hora',
    porcoes: '10 unidades',
    dificuldade: 'Media',
    descricao: 'Donuts fofinhos com cobertura simples e visual de confeitaria.',
    ingredientes: [
      '2 xicaras de farinha de trigo',
      '1 ovo',
      '1/2 xicara de leite morno',
      '2 colheres de acucar',
      '1 colher de fermento biologico',
    ],
    preparo: [
      'Misture os ingredientes e sove ate a massa ficar lisa.',
      'Deixe descansar por 30 minutos.',
      'Modele os donuts e frite em oleo quente.',
      'Finalize com cobertura e confeitos.',
    ],
  },
  '3': {
    id: '3',
    nome: 'Cupcake de Baunilha',
    categoria: 'Doces',
    imagem:
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80',
    tempo: '45 min',
    porcoes: '12 unidades',
    dificuldade: 'Facil',
    descricao: 'Massa leve, cobertura cremosa e preparo simples para festas.',
    ingredientes: [
      '2 ovos',
      '1 xicara de acucar',
      '2 xicaras de farinha de trigo',
      '1 xicara de leite',
      '1 colher de essencia de baunilha',
    ],
    preparo: [
      'Bata os ovos com o acucar.',
      'Adicione leite, farinha e baunilha aos poucos.',
      'Distribua em forminhas.',
      'Asse por 25 minutos e finalize com cobertura.',
    ],
  },
  '4': {
    id: '4',
    nome: 'Hamburguer Caseiro',
    categoria: 'Salgados',
    imagem:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    tempo: '30 min',
    porcoes: '2 porcoes',
    dificuldade: 'Facil',
    descricao: 'Um lanche bem montado, suculento e com cara de hamburgueria.',
    ingredientes: [
      '500g de carne moida',
      '2 paes de hamburguer',
      '2 fatias de queijo',
      'Alface e tomate',
      'Sal e pimenta',
    ],
    preparo: [
      'Tempere a carne e modele dois discos.',
      'Grelhe ate dourar dos dois lados.',
      'Derreta o queijo sobre a carne.',
      'Monte o lanche com salada e molho.',
    ],
    destaque: true,
  },
  '5': {
    id: '5',
    nome: 'Pizza Marguerita',
    categoria: 'Salgados',
    imagem:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    tempo: '1h 20 min',
    porcoes: '8 fatias',
    dificuldade: 'Media',
    descricao: 'Massa fina, molho de tomate, queijo e manjericao fresco.',
    ingredientes: [
      '1 massa de pizza',
      '1/2 xicara de molho de tomate',
      '200g de mussarela',
      'Tomates em rodelas',
      'Manjericao e oregano',
    ],
    preparo: [
      'Abra a massa em uma forma untada.',
      'Espalhe o molho e cubra com queijo.',
      'Adicione tomate, oregano e manjericao.',
      'Asse ate a borda ficar dourada.',
    ],
    favorita: true,
  },
  '6': {
    id: '6',
    nome: 'Batata Frita Crocante',
    categoria: 'Salgados',
    imagem:
      'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1200&q=80',
    tempo: '25 min',
    porcoes: '4 porcoes',
    dificuldade: 'Facil',
    descricao: 'Batatas sequinhas, douradas e temperadas na medida certa.',
    ingredientes: ['4 batatas grandes', 'Oleo para fritar', 'Sal', 'Paprica a gosto'],
    preparo: [
      'Corte as batatas em palitos.',
      'Seque bem antes de fritar.',
      'Frite em oleo quente ate dourar.',
      'Tempere ainda quentes.',
    ],
  },
  '7': {
    id: '7',
    nome: 'Suco de Laranja',
    categoria: 'Bebidas',
    imagem:
      'https://veja.abril.com.br/wp-content/uploads/2024/02/suco-laranja.jpg?crop=1&resize=1212,909',
    tempo: '10 min',
    porcoes: '2 copos',
    dificuldade: 'Facil',
    descricao: 'Bebida natural, rapida e refrescante para acompanhar qualquer refeicao.',
    ingredientes: ['4 laranjas', '300ml de agua gelada', 'Gelo', 'Acucar a gosto'],
    preparo: [
      'Esprema as laranjas.',
      'Misture com agua gelada.',
      'Adoce se desejar.',
      'Sirva com gelo.',
    ],
    destaque: true,
  },
  '8': {
    id: '8',
    nome: 'Milk-shake de Chocolate',
    categoria: 'Bebidas',
    imagem:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
    tempo: '15 min',
    porcoes: '2 copos',
    dificuldade: 'Facil',
    descricao: 'Cremoso, gelado e com calda para deixar a apresentacao bonita.',
    ingredientes: [
      '3 bolas de sorvete de chocolate',
      '200ml de leite',
      'Calda de chocolate',
      'Chantilly opcional',
    ],
    preparo: [
      'Bata o sorvete com o leite no liquidificador.',
      'Decore os copos com calda.',
      'Sirva imediatamente.',
    ],
    favorita: true,
  },
  '9': {
    id: '9',
    nome: 'Cafe Gelado',
    categoria: 'Bebidas',
    imagem:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80',
    tempo: '5 min',
    porcoes: '1 copo',
    dificuldade: 'Facil',
    descricao: 'Cafe frio com leite e gelo para dias quentes.',
    ingredientes: ['200ml de cafe forte', '100ml de leite', 'Gelo', 'Acucar ou mel'],
    preparo: [
      'Prepare o cafe e deixe esfriar.',
      'Coloque gelo em um copo alto.',
      'Adicione cafe, leite e adoce.',
      'Misture bem antes de servir.',
    ],
  },
  '10': {
    id: '10',
    nome: 'Brigadeiro Tradicional',
    categoria: 'Doces',
    imagem:
      'https://dafeiraaobaile.com.br/wp-content/uploads/2023/02/Dafeiraaobaile-Novembro-69.jpg',
    tempo: '25 min',
    porcoes: '20 unidades',
    dificuldade: 'Facil',
    descricao: 'O classico brasileiro para festas, feito com poucos ingredientes.',
    ingredientes: [
      '1 lata de leite condensado',
      '1 colher de manteiga',
      '4 colheres de chocolate em po',
      'Chocolate granulado',
    ],
    preparo: [
      'Misture leite condensado, manteiga e chocolate na panela.',
      'Mexa em fogo baixo ate desgrudar do fundo.',
      'Deixe esfriar.',
      'Enrole e passe no granulado.',
    ],
  },
  '11': {
    id: '11',
    nome: 'Coxinha de Frango',
    categoria: 'Salgados',
    imagem:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
    tempo: '1 hora',
    porcoes: '15 unidades',
    dificuldade: 'Caprichada',
    descricao: 'Salgado de festa com recheio cremoso e casquinha dourada.',
    ingredientes: [
      '2 xicaras de farinha de trigo',
      '2 xicaras de caldo de frango',
      'Frango cozido e desfiado',
      'Requeijao',
      'Farinha de rosca',
    ],
    preparo: [
      'Cozinhe a massa com caldo e farinha ate soltar da panela.',
      'Misture o frango com requeijao.',
      'Modele, recheie e empane.',
      'Frite ate ficar dourada.',
    ],
  },
  '12': {
    id: '12',
    nome: 'Pastel de Queijo',
    categoria: 'Salgados',
    imagem:
      'https://www.sabornamesa.com.br/media/k2/items/cache/990810f9242641a8e264ce996a78ed28_XL.jpg',
    tempo: '40 min',
    porcoes: '10 unidades',
    dificuldade: 'Facil',
    descricao: 'Pastel sequinho, recheado e facil de preparar em casa.',
    ingredientes: ['Massa de pastel', 'Queijo mussarela', 'Oregano', 'Oleo para fritar'],
    preparo: [
      'Recheie a massa com queijo e oregano.',
      'Feche bem as bordas com um garfo.',
      'Frite em oleo quente.',
      'Escorra e sirva ainda quente.',
    ],
  },
};

export const recipeList = Object.values(receitas);

export const categories = Object.keys(categoryDetails) as RecipeCategory[];

export function getRecipesByCategory(category: RecipeCategory) {
  return recipeList.filter((recipe) => recipe.categoria === category);
}

export function getFavoriteRecipes() {
  return recipeList.filter((recipe) => recipe.favorita);
}

export function getRecipeImage(recipe: Recipe) {
  return recipe.imagem?.trim() || fallbackImages[recipe.categoria];
}

export function toggleFavorite(recipeId: string) {
  const recipe = receitas[recipeId];

  if (!recipe) {
    return undefined;
  }

  recipe.favorita = !recipe.favorita;
  return recipe;
}

export function createRecipe(recipe: Omit<Recipe, 'id'>) {
  const id = `nova-${Date.now()}`;
  const newRecipe: Recipe = { ...recipe, id };

  receitas[id] = newRecipe;
  recipeList.unshift(newRecipe);

  return newRecipe;
}
