import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { categories, categoryDetails } from '../recipes/data';

export default function Explore() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="receitas" />

        <View style={styles.content}>
          <Text style={styles.eyebrow}>Organizacao visual</Text>
          <Text style={styles.title}>Categorias</Text>
          <Text style={styles.text}>
            Navegue pelo livro de receitas usando os grupos principais do projeto.
          </Text>

          <View style={styles.grid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                activeOpacity={0.84}
                style={[styles.card, { borderTopColor: categoryDetails[category].color }]}
                onPress={() => router.push('/receita')}
              >
                <Text style={styles.cardTitle}>{categoryDetails[category].title}</Text>
                <Text style={styles.cardText}>{categoryDetails[category].subtitle}</Text>
              </TouchableOpacity>
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
  content: {
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 22,
  },
  card: {
    width: 280,
    minHeight: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    borderTopWidth: 5,
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  cardTitle: {
    color: '#241A12',
    fontSize: 22,
    fontWeight: '900',
  },
  cardText: {
    color: '#74675C',
    lineHeight: 21,
    marginTop: 8,
  },
});
