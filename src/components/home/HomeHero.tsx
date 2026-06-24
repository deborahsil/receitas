import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';

import { getRecipeImage } from '../../recipes/data';
import type { Recipe } from '../../types/recipe';

type HomeHeroProps = {
  featuredRecipe?: Recipe;
  onExploreSweets: () => void;
};

export function HomeHero({ featuredRecipe, onExploreSweets }: HomeHeroProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isCompact = width < 520;

  return (
    <View style={[styles.hero, isCompact && styles.heroCompact, isWide && styles.heroWide]}>
      <View style={styles.heroCopy}>
        <Text style={styles.eyebrow}>Receitas para salvar e preparar</Text>
        <Text style={[styles.heroTitle, isCompact && styles.heroTitleCompact]}>CookBook+</Text>
        <Text style={[styles.heroText, isCompact && styles.heroTextCompact]}>
          Doces, salgados e bebidas organizados em um livro de receitas moderno, responsivo e
          facil de apresentar.
        </Text>

        <View style={[styles.heroActions, isCompact && styles.heroActionsCompact]}>
          <TouchableOpacity
            activeOpacity={0.84}
            style={[styles.primaryButton, isCompact && styles.actionCompact]}
            onPress={() => router.push('/receita')}
          >
            <Text style={styles.primaryButtonText}>Ver receitas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.84}
            style={[styles.secondaryButton, isCompact && styles.actionCompact]}
            onPress={onExploreSweets}
          >
            <Text style={styles.secondaryButtonText}>Explorar doces</Text>
          </TouchableOpacity>
        </View>
      </View>

      {featuredRecipe && (
        <TouchableOpacity
          activeOpacity={0.88}
          style={[styles.featured, isCompact && styles.featuredCompact]}
          onPress={() => router.push(`/receita/${featuredRecipe.id}`)}
        >
          <Image
            source={{ uri: getRecipeImage(featuredRecipe) }}
            resizeMode="cover"
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredLabel}>Receita em destaque</Text>
            <Text style={[styles.featuredTitle, isCompact && styles.featuredTitleCompact]}>
              {featuredRecipe.nome}
            </Text>
            <Text style={styles.featuredMeta}>
              {featuredRecipe.tempo} | {featuredRecipe.porcoes}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 20,
  },
  heroCompact: {
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCopy: {
    flex: 1,
    minWidth: 0,
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
  heroTitleCompact: {
    fontSize: 38,
    lineHeight: 44,
  },
  heroText: {
    color: '#65584D',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 12,
    maxWidth: 560,
  },
  heroTextCompact: {
    fontSize: 15,
    lineHeight: 22,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 22,
  },
  heroActionsCompact: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  actionCompact: {
    width: '100%',
    alignItems: 'center',
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
    minWidth: 0,
    minHeight: 330,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2A1B12',
  },
  featuredCompact: {
    minHeight: 250,
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
  featuredTitleCompact: {
    fontSize: 24,
    lineHeight: 29,
  },
  featuredMeta: {
    color: '#FFE8D3',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 6,
  },
});

