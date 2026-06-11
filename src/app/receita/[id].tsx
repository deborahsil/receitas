import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { AppFooter } from '../../components/layout/AppFooter';
import { AppHeader } from '../../components/layout/AppHeader';
import { categoryDetails, getRecipeImage, receitas, toggleFavorite } from '../../recipes/data';

export default function ReceitaDetalhes() {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const [, setFavoriteVersion] = useState(0);
  const recipe = receitas[String(id)];
  const isWide = width >= 820;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader active="receitas" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Receita nao encontrada</Text>
          <Text style={styles.emptyText}>Volte para o livro e escolha outra receita.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/receita')}>
            <Text style={styles.primaryButtonText}>Ver receitas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
    setFavoriteVersion((current) => current + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="receitas" />

        <View style={[styles.hero, isWide && styles.heroWide]}>
          <View style={styles.imageWrap}>
            <Image source={{ uri: getRecipeImage(recipe) }} resizeMode="cover" style={styles.image} />
          </View>

          <View style={styles.summary}>
            <TouchableOpacity activeOpacity={0.78} onPress={() => router.back()}>
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <Text style={[styles.category, { color: categoryDetails[recipe.categoria].color }]}>
              {recipe.categoria}
            </Text>
            <Text style={styles.title}>{recipe.nome}</Text>
            <Text style={styles.description}>{recipe.descricao}</Text>

            <TouchableOpacity
              activeOpacity={0.84}
              style={[styles.favoriteButton, recipe.favorita && styles.favoriteButtonActive]}
              onPress={handleToggleFavorite}
            >
              <Text
                style={[
                  styles.favoriteButtonText,
                  recipe.favorita && styles.favoriteButtonTextActive,
                ]}
              >
                {recipe.favorita ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              </Text>
            </TouchableOpacity>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Tempo</Text>
                <Text style={styles.infoValue}>{recipe.tempo}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Porcoes</Text>
                <Text style={styles.infoValue}>{recipe.porcoes}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Nivel</Text>
                <Text style={styles.infoValue}>{recipe.dificuldade}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            {recipe.ingredientes.map((item) => (
              <View key={item} style={styles.ingredientRow}>
                <View style={styles.dot} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Modo de preparo</Text>

            {recipe.preparo.map((step, index) => (
              <View key={`${step}-${index}`} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
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
    paddingTop: 8,
    paddingBottom: 20,
    gap: 20,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  imageWrap: {
    flex: 1,
    minHeight: 320,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5E5D6',
  },
  image: {
    width: '100%',
    height: '100%',
    minHeight: 320,
  },
  summary: {
    flex: 1,
    minWidth: 280,
    justifyContent: 'center',
  },
  backText: {
    color: '#C35200',
    fontWeight: '900',
    marginBottom: 14,
  },
  category: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#241A12',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 46,
    marginTop: 8,
  },
  description: {
    color: '#6B6259',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 12,
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    marginTop: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF7A00',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  favoriteButtonActive: {
    backgroundColor: '#FF7A00',
  },
  favoriteButtonText: {
    color: '#D45F00',
    fontSize: 15,
    fontWeight: '900',
  },
  favoriteButtonTextActive: {
    color: '#FFFFFF',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 22,
  },
  infoCard: {
    minWidth: 120,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 14,
  },
  infoLabel: {
    color: '#8A7D72',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: '#241A12',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 5,
  },
  content: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  contentWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  block: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 18,
  },
  sectionTitle: {
    color: '#241A12',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A00',
    marginTop: 8,
  },
  itemText: {
    flex: 1,
    color: '#4D433A',
    fontSize: 16,
    lineHeight: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  stepText: {
    flex: 1,
    color: '#4D433A',
    fontSize: 16,
    lineHeight: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    color: '#241A12',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyText: {
    color: '#74675C',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
