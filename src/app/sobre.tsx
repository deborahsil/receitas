import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';

const features = [
  'Tela inicial com receitas em destaque',
  'Catalogo com busca e categorias',
  'Tela de detalhes com ingredientes e preparo',
  'Cadastro local de novas receitas',
  'Navbar, footer e componentes reutilizaveis',
];

const stack = ['React Native', 'Expo Router', 'TypeScript', 'ScrollView', 'Image', 'TouchableOpacity'];

export default function Sobre() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="sobre" />

        <View style={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Sobre o projeto</Text>
            <Text style={styles.title}>CookBook+</Text>
            <Text style={styles.text}>
              Aplicativo de livro de receitas criado para organizar doces, salgados e bebidas com
              visual moderno, navegacao simples e paginas responsivas.
            </Text>
          </View>

          <View style={styles.columns}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>O que tem no app</Text>
              {features.map((feature) => (
                <Text key={feature} style={styles.listItem}>
                  - {feature}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tecnologias usadas</Text>
              <View style={styles.tags}>
                {stack.map((item) => (
                  <View key={item} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Desenvolvido por</Text>
              <Text style={styles.author}>Giovanna Isabela</Text>
              <Text style={styles.author}>Beatriz Marchesini</Text>
              <Text style={styles.author}>Deborah</Text>
            </View>
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
  hero: {
    maxWidth: 760,
  },
  eyebrow: {
    color: '#B94E00',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#241A12',
    fontSize: 42,
    fontWeight: '900',
    marginTop: 6,
  },
  text: {
    color: '#6B6259',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  card: {
    flex: 1,
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 18,
  },
  cardTitle: {
    color: '#241A12',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  listItem: {
    color: '#5D5148',
    lineHeight: 23,
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFF4E8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD9B2',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tagText: {
    color: '#B94E00',
    fontWeight: '900',
  },
  author: {
    color: '#5D5148',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
});

