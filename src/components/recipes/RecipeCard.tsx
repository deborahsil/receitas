import React from 'react';
import {
  type GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageStyle,
  type DimensionValue,
  type ViewStyle,
} from 'react-native';
import { router } from 'expo-router';

import { getRecipeImage } from '../../recipes/data';
import type { Recipe } from '../../types/recipe';

type RecipeCardProps = {
  recipe: Recipe;
  width?: DimensionValue;
  compact?: boolean;
  style?: ViewStyle;
  onToggleFavorite?: (recipeId: string) => void;
};

export function RecipeCard({
  recipe,
  width = 280,
  compact,
  style,
  onToggleFavorite,
}: RecipeCardProps) {
  const imageStyle: ImageStyle = compact ? styles.compactImage : styles.image;
  const favoriteLabel = recipe.favorita ? 'Remover dos favoritos' : 'Adicionar aos favoritos';

  const handleFavoritePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleFavorite?.(recipe.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => router.push(`/receita/${recipe.id}`)}
      style={[styles.card, { width }, style]}
    >
      <Image source={{ uri: getRecipeImage(recipe) }} resizeMode="cover" style={imageStyle} />

      <TouchableOpacity
        accessibilityLabel={favoriteLabel}
        activeOpacity={0.82}
        onPress={handleFavoritePress}
        style={[styles.favoriteButton, recipe.favorita && styles.favoriteButtonActive]}
      >
        <Text style={[styles.favoriteIcon, recipe.favorita && styles.favoriteIconActive]}>
          {recipe.favorita ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{recipe.categoria}</Text>
          <Text style={styles.time}>{recipe.tempo}</Text>
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {recipe.nome}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {recipe.descricao}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.meta}>{recipe.porcoes}</Text>

          <View style={styles.button}>
            <Text style={styles.buttonText}>Ver Receita</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0E7DD',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 172,
  },
  compactImage: {
    width: '100%',
    height: 128,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE0C2',
  },
  favoriteButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  favoriteIcon: {
    color: '#E85D04',
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 25,
  },
  favoriteIconActive: {
    color: '#FFFFFF',
  },
  content: {
    padding: 14,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  category: {
    color: '#E85D04',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  time: {
    color: '#7B6F65',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#241A12',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
  },
  description: {
    color: '#6B6259',
    fontSize: 14,
    lineHeight: 19,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 2,
  },
  meta: {
    color: '#8A7D72',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  button: {
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
});
