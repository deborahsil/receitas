import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { getFavoriteRecipes, toggleFavorite } from '../recipes/data';

export default function Favoritos() {
  const { width } = useWindowDimensions();
  const [, setFavoriteVersion] = useState(0);
  const cardWidth = width >= 1120 ? '31.6%' : width >= 760 ? '47.5%' : '100%';
  const favorites = getFavoriteRecipes();

  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
    setFavoriteVersion((current) => current + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="favoritos" />

        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>Selecao especial</Text>
          <Text style={styles.title}>Favoritos</Text>
          <Text style={styles.text}>
            Receitas salvas para acesso rapido durante a apresentacao do livro.
          </Text>
        </View>

        <View style={styles.grid}>
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              width={cardWidth}
              compact
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
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
  headerBlock: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
  },
  eyebrow: {
    color: '#B94E00',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#241A12',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 6,
  },
  text: {
    color: '#6B6259',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    maxWidth: 620,
  },
  grid: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
