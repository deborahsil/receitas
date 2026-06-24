import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { AddRecipeSection } from '../components/home/AddRecipeSection';
import { CategoryScroller } from '../components/home/CategoryScroller';
import { HomeHero } from '../components/home/HomeHero';
import { RecipeGridSection } from '../components/home/RecipeGridSection';
import { RecipeSearchPanel } from '../components/home/RecipeSearchPanel';
import {
  emptyRecipeForm,
  normalizeText,
  splitList,
  type HomeRecipeForm,
} from '../components/home/home-utils';
import { createRecipe, fallbackImages, recipeList, toggleFavorite } from '../recipes/data';
import type { Recipe, RecipeCategory } from '../types/recipe';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => [...recipeList]);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'Todas'>('Todas');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<HomeRecipeForm>(emptyRecipeForm);
  const featuredRecipe = recipes.find((recipe) => recipe.destaque) ?? recipes[0];

  const filteredRecipes = useMemo(() => {
    const query = normalizeText(search);

    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'Todas' || recipe.categoria === selectedCategory;
      const matchesSearch =
        query.length === 0 ||
        normalizeText(`${recipe.nome} ${recipe.categoria} ${recipe.descricao}`).includes(query);

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
    setForm(emptyRecipeForm);
  };

  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
    setRecipes([...recipeList]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="home" />

        <HomeHero
          featuredRecipe={featuredRecipe}
          onExploreSweets={() => setSelectedCategory('Doces')}
        />

        <RecipeSearchPanel
          search={search}
          selectedCategory={selectedCategory}
          onSearchChange={setSearch}
          onCategoryChange={setSelectedCategory}
        />

        <RecipeGridSection recipes={filteredRecipes} onToggleFavorite={handleToggleFavorite} />

        <CategoryScroller onCategoryPress={setSelectedCategory} />

        <AddRecipeSection form={form} onFormChange={setForm} onSubmit={addRecipe} />

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
});

