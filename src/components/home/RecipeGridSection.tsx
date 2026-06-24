import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, type DimensionValue } from 'react-native';

import type { Recipe } from '../../types/recipe';
import { RecipeCard } from '../recipes/RecipeCard';
import { homeStyles } from './home-styles';

type RecipeGridSectionProps = {
  recipes: Recipe[];
  onToggleFavorite: (recipeId: string) => void;
};

function getCardWidth(width: number): DimensionValue {
  if (width >= 1120) {
    return '31.6%';
  }

  if (width >= 740) {
    return '47.4%';
  }

  return '100%';
}

export function RecipeGridSection({ recipes, onToggleFavorite }: RecipeGridSectionProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 520;
  const cardWidth = getCardWidth(width);

  return (
    <View style={[homeStyles.section, isCompact && homeStyles.sectionCompact]}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerText}>
          <Text style={[homeStyles.sectionTitle, isCompact && homeStyles.sectionTitleCompact]}>
            Receitas encontradas
          </Text>
          <Text style={homeStyles.sectionText}>
            {recipes.length} receita(s) prontas para visualizar.
          </Text>
        </View>
      </View>

      <View style={[homeStyles.grid, isCompact && homeStyles.gridCompact]}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            width={cardWidth}
            style={styles.gridItem}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 14,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  gridItem: {
    marginBottom: 2,
  },
});

