import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { categories } from '../../recipes/data';
import type { RecipeCategory } from '../../types/recipe';
import { homeStyles } from './home-styles';

type RecipeSearchPanelProps = {
  search: string;
  selectedCategory: RecipeCategory | 'Todas';
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: RecipeCategory | 'Todas') => void;
};

export function RecipeSearchPanel({
  search,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: RecipeSearchPanelProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 520;

  return (
    <View style={[styles.panel, isCompact && homeStyles.sectionCompact]}>
      <View style={styles.panelHeader}>
        <Text style={[homeStyles.sectionTitle, isCompact && homeStyles.sectionTitleCompact]}>
          Buscar no livro
        </Text>
        <Text style={homeStyles.sectionText}>Encontre por nome, categoria ou descricao.</Text>
      </View>

      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Buscar brownie, pizza, cafe..."
        placeholderTextColor="#9A8D80"
        style={styles.searchInput}
      />

      <View style={homeStyles.categoryRow}>
        {(['Todas', ...categories] as Array<RecipeCategory | 'Todas'>).map((category) => {
          const active = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.82}
              onPress={() => onCategoryChange(category)}
              style={[
                homeStyles.categoryButton,
                isCompact && homeStyles.categoryButtonCompact,
                active && homeStyles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  homeStyles.categoryButtonText,
                  active && homeStyles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

