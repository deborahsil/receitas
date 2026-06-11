import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { RecipeCard } from '../components/recipes/RecipeCard';
import {
  categories,
  categoryDetails,
  createRecipe,
  fallbackImages,
  getRecipeImage,
  recipeList,
  toggleFavorite,
} from '../recipes/data';
import type { Recipe, RecipeCategory } from '../types/recipe';

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function splitList(value: string, fallback: string[]) {
  const items = value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
}

export default function Home() {
  const { width } = useWindowDimensions();
  const [recipes, setRecipes] = useState<Recipe[]>(() => [...recipeList]);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'Todas'>(
    'Todas'
  );
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    nome: '',
    categoria: 'Doces' as RecipeCategory,
    tempo: '',
    porcoes: '',
    imagem: '',
    ingredientes: '',
    preparo: '',
  });

  const isWide = width >= 860;
  const cardWidth = width >= 1120 ? '31.6%' : width >= 760 ? '47.5%' : '100%';
  const featuredRecipe = recipes.find((recipe) => recipe.destaque) ?? recipes[0];

  const filteredRecipes = useMemo(() => {
    const query = normalizeText(search);

    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'Todas' || recipe.categoria === selectedCategory;
      const matchesSearch =
        query.length === 0 ||
        normalizeText(`${recipe.nome} ${recipe.categoria} ${recipe.descricao}`).includes(
          query
        );

      return matchesCategory && matchesSearch;
    });
  }, [recipes, search, selectedCategory]);

  const addRecipe = () => {
    const name = form.nome.trim();

    if (!name) {
      return;
    }

    createRecipe({
      nome: name,
      categoria: form.categoria,
      imagem: form.imagem.trim() || fallbackImages[form.categoria],
      tempo: form.tempo.trim() || '30 min',
      porcoes: form.porcoes.trim() || '4 porcoes',
      dificuldade: 'Facil',
      descricao: `Receita adicionada na categoria ${form.categoria}.`,
      ingredientes: splitList(form.ingredientes, [
        'Ingrediente principal',
        'Tempero a gosto',
        'Acompanhamento opcional',
      ]),
      preparo: splitList(form.preparo, [
        'Separe todos os ingredientes.',
        'Prepare a receita com calma.',
        'Finalize e sirva.',
      ]),
      favorita: true,
    });

    setRecipes([...recipeList]);
    setSelectedCategory('Todas');
    setSearch('');
    setForm({
      nome: '',
      categoria: 'Doces',
      tempo: '',
      porcoes: '',
      imagem: '',
      ingredientes: '',
      preparo: '',
    });
  };

  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
    setRecipes([...recipeList]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader active="home" />

        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>Receitas para salvar e preparar</Text>
            <Text style={styles.heroTitle}>CookBook+</Text>
            <Text style={styles.heroText}>
              Doces, salgados e bebidas organizados em um livro de receitas
              moderno, responsivo e facil de apresentar.
            </Text>

            <View style={styles.heroActions}>
              <TouchableOpacity
                activeOpacity={0.84}
                style={styles.primaryButton}
                onPress={() => router.push('/receita')}
              >
                <Text style={styles.primaryButtonText}>Ver receitas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.84}
                style={styles.secondaryButton}
                onPress={() => setSelectedCategory('Doces')}
              >
                <Text style={styles.secondaryButtonText}>Explorar doces:</Text>
              </TouchableOpacity>
            </View>
          </View>

          {featuredRecipe && (
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.featured}
              onPress={() => router.push(`/receita/${featuredRecipe.id}`)}
            >
              <Image
                source={{ uri: getRecipeImage(featuredRecipe) }}
                resizeMode="cover"
                style={styles.featuredImage}
              />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredLabel}>Receita em destaque</Text>
                <Text style={styles.featuredTitle}>{featuredRecipe.nome}</Text>
                <Text style={styles.featuredMeta}>
                  {featuredRecipe.tempo} | {featuredRecipe.porcoes}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View>
              <Text style={styles.sectionTitle}>Buscar no livro</Text>
              <Text style={styles.sectionText}>Encontre por nome, categoria ou descricao.</Text>
            </View>
          </View>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar brownie, pizza, cafe..."
            placeholderTextColor="#9A8D80"
            style={styles.searchInput}
          />

          <View style={styles.categoryRow}>
            {(['Todas', ...categories] as Array<RecipeCategory | 'Todas'>).map((category) => {
              const active = selectedCategory === category;

              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.82}
                  onPress={() => setSelectedCategory(category)}
                  style={[styles.categoryButton, active && styles.categoryButtonActive]}
                >
                  <Text
                    style={[styles.categoryButtonText, active && styles.categoryButtonTextActive]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Receitas encontradas</Text>
              <Text style={styles.sectionText}>
                {filteredRecipes.length} receita(s) prontas para visualizar.
              </Text>
            </View>
          </View>

          <View style={styles.grid}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                width={cardWidth}
                style={styles.gridItem}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.84}
                style={[styles.categoryCard, { borderTopColor: categoryDetails[item].color }]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={styles.categoryCardTitle}>{categoryDetails[item].title}</Text>
                <Text style={styles.categoryCardText}>{categoryDetails[item].subtitle}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={[styles.addSection, isWide && styles.addSectionWide]}>
          <View style={styles.addCopy}>
            <Text style={styles.sectionTitle}>Adicionar receita</Text>
            <Text style={styles.sectionText}>
              Cadastre uma receita nova para ela aparecer na lista e nos favoritos enquanto o app
              estiver aberto.
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              value={form.nome}
              onChangeText={(nome) => setForm((current) => ({ ...current, nome }))}
              placeholder="Nome da receita"
              placeholderTextColor="#9A8D80"
              style={styles.input}
            />

            <View style={styles.categoryRow}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.82}
                  onPress={() => setForm((current) => ({ ...current, categoria: category }))}
                  style={[
                    styles.categoryButton,
                    form.categoria === category && styles.categoryButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      form.categoria === category && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputRow}>
              <TextInput
                value={form.tempo}
                onChangeText={(tempo) => setForm((current) => ({ ...current, tempo }))}
                placeholder="Tempo"
                placeholderTextColor="#9A8D80"
                style={[styles.input, styles.inputHalf]}
              />
              <TextInput
                value={form.porcoes}
                onChangeText={(porcoes) => setForm((current) => ({ ...current, porcoes }))}
                placeholder="Porcoes"
                placeholderTextColor="#9A8D80"
                style={[styles.input, styles.inputHalf]}
              />
            </View>

            <TextInput
              value={form.imagem}
              onChangeText={(imagem) => setForm((current) => ({ ...current, imagem }))}
              placeholder="URL da imagem (opcional)"
              placeholderTextColor="#9A8D80"
              style={styles.input}
            />

            <TextInput
              value={form.ingredientes}
              onChangeText={(ingredientes) =>
                setForm((current) => ({ ...current, ingredientes }))
              }
              placeholder="Ingredientes separados por virgula"
              placeholderTextColor="#9A8D80"
              multiline
              style={[styles.input, styles.textArea]}
            />

            <TextInput
              value={form.preparo}
              onChangeText={(preparo) => setForm((current) => ({ ...current, preparo }))}
              placeholder="Passos de preparo separados por virgula"
              placeholderTextColor="#9A8D80"
              multiline
              style={[styles.input, styles.textArea]}
            />

            <TouchableOpacity activeOpacity={0.86} style={styles.submitButton} onPress={addRecipe}>
              <Text style={styles.submitButtonText}>Adicionar no livro</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AppFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  scrollContent: {
    paddingBottom: 10,
  },
  hero: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 20,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    minWidth: 280,
  },
  eyebrow: {
    color: '#B94E00',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#23170F',
    fontSize: 50,
    fontWeight: '900',
    lineHeight: 56,
  },
  heroText: {
    color: '#65584D',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 12,
    maxWidth: 560,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 22,
  },
  primaryButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD2A6',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  secondaryButtonText: {
    color: '#C35200',
    fontWeight: '900',
    fontSize: 15,
  },
  featured: {
    flex: 1,
    minWidth: 280,
    minHeight: 330,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2A1B12',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(22, 12, 4, 0.34)',
  },
  featuredLabel: {
    color: '#FFE7D0',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },
  featuredMeta: {
    color: '#FFE8D3',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 6,
  },
  panel: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  panelHeader: {
    marginBottom: 12,
  },
  section: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#241A12',
    fontSize: 26,
    fontWeight: '900',
  },
  sectionText: {
    color: '#74675C',
    marginTop: 5,
    lineHeight: 21,
  },
  searchInput: {
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#F1D9C2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    color: '#241A12',
    fontSize: 16,
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0D7BE',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  categoryButtonText: {
    color: '#7E4A18',
    fontWeight: '900',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    marginBottom: 2,
  },
  categoryList: {
    gap: 12,
    paddingVertical: 14,
    paddingRight: 20,
  },
  categoryCard: {
    width: 250,
    minHeight: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    borderTopWidth: 5,
    padding: 16,
  },
  categoryCardTitle: {
    color: '#241A12',
    fontSize: 20,
    fontWeight: '900',
  },
  categoryCardText: {
    color: '#74675C',
    lineHeight: 20,
    marginTop: 8,
  },
  addSection: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 18,
  },
  addSectionWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addCopy: {
    flex: 0.75,
    minWidth: 250,
  },
  form: {
    flex: 1.25,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 16,
    gap: 10,
  },
  input: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECD8C6',
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 13,
    paddingVertical: 10,
    color: '#241A12',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  inputHalf: {
    flex: 1,
    minWidth: 140,
  },
  textArea: {
    minHeight: 86,
    textAlignVertical: 'top',
  },
  submitButton: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: '#241A12',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
