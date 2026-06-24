import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { categories, recipeList, toggleFavorite } from '../recipes/data';
import type { RecipeCategory } from '../types/recipe';

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function ReceitaPage() {
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState<RecipeCategory | 'Todas'>('Todas');
  const [search, setSearch] = useState('');
  const [favoriteVersion, setFavoriteVersion] = useState(0);
  const isCompact = width < 520;
  const cardWidth = width >= 1120 ? '31.6%' : width >= 740 ? '47.4%' : '100%';

  const filteredRecipes = useMemo(() => {
    const query = normalizeText(search);

    return recipeList.filter((recipe) => {
      const matchesCategory = category === 'Todas' || recipe.categoria === category;
      const matchesSearch =
        query.length === 0 ||
        normalizeText(`${recipe.nome} ${recipe.categoria} ${recipe.descricao}`).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search, favoriteVersion]);

  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
    setFavoriteVersion((current) => current + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="receitas" />

        <View style={[styles.headerBlock, isCompact && styles.headerBlockCompact]}>
          <Text style={styles.eyebrow}>Catalogo completo</Text>
          <Text style={[styles.title, isCompact && styles.titleCompact]}>Todas as receitas</Text>
          <Text style={styles.text}>
            Escolha uma categoria, use a busca e abra os detalhes de cada receita.
          </Text>
        </View>

        <View style={[styles.filters, isCompact && styles.filtersCompact]}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar receita..."
            placeholderTextColor="#9A8D80"
            style={styles.searchInput}
          />

          <View style={styles.categoryRow}>
            {(['Todas', ...categories] as Array<RecipeCategory | 'Todas'>).map((item) => {
              const active = category === item;

              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.82}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.categoryButton,
                    isCompact && styles.categoryButtonCompact,
                    active && styles.categoryButtonActive,
                  ]}
                >
                  <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.grid, isCompact && styles.gridCompact]}>
          {filteredRecipes.map((recipe) => (
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
    paddingBottom: 16,
  },
  headerBlockCompact: {
    paddingHorizontal: 14,
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
  titleCompact: {
    fontSize: 31,
    lineHeight: 37,
  },
  text: {
    color: '#6B6259',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    maxWidth: 620,
  },
  filters: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 12,
  },
  filtersCompact: {
    paddingHorizontal: 14,
  },
  searchInput: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1D9C2',
    backgroundColor: '#FFFFFF',
    color: '#241A12',
    paddingHorizontal: 14,
    fontSize: 16,
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
  categoryButtonCompact: {
    flexGrow: 1,
    alignItems: 'center',
    minWidth: 96,
  },
  categoryButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  categoryText: {
    color: '#7E4A18',
    fontWeight: '900',
  },
  categoryTextActive: {
    color: '#FFFFFF',
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
  gridCompact: {
    paddingHorizontal: 14,
    gap: 14,
  },
});
