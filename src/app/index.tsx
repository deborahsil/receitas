import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const doces = [
  {
    id: '1',
    title: 'Brownie',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Donuts',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Cupcake',
    image:
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80',
  },
];

const salgados = [
  {
    id: '4',
    title: 'Hambúrguer',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    title: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    title: 'Batata Frita',
    image:
      'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1000&q=80',
  },
];

const bebidas = [
  {
    id: '7',
    title: 'Suco de Laranja',
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f',
  },
  {
    id: '8',
    title: 'Milk Shake',
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
  },
  {
    id: '9',
    title: 'Café Gelado',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
  },
];

function RecipeCard({ item, cardWidth }: any) {
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.8}
      onPress={() =>
        router.push(`/receita/${item.id}` as any)
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>
          {item.title}
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Ver Receita
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Carousel({
  title,
  data,
  cardWidth,
}: any) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <Text style={styles.verTodas}>
          Ver Todas
        </Text>
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            item={item}
            cardWidth={cardWidth}
          />
        )}
      />
    </View>
  );
}

export default function Home() {
  const { width } = useWindowDimensions();

  const cardWidth =
    width > 1400
      ? 300
      : width > 1000
      ? 280
      : width > 768
      ? 260
      : width * 0.82;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>
              CookBook+
            </Text>

            <Text style={styles.heroSubtitle}>
              Seu livro de receitas na palma da mão.
            </Text>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroCardTitle}>
              SOBRE O APP
            </Text>

            <Text style={styles.heroCardText}>
              Aplicativo desenvolvido em
              React Native e Expo para
              visualizar receitas de doces,
              salgados e bebidas.
            </Text>
          </View>
        </View>

        <Carousel
          title="🍩 Doces"
          data={doces}
          cardWidth={cardWidth}
        />

        <Carousel
          title="🍔 Salgados"
          data={salgados}
          cardWidth={cardWidth}
        />

        <Carousel
          title="🥤 Bebidas"
          data={bebidas}
          cardWidth={cardWidth}
        />

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>
              📖 Receitas
            </Text>
            <Text>
              Diversas receitas organizadas.
            </Text>
          </View>

          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>
              ⭐ Favoritos
            </Text>
            <Text>
              Salve suas receitas favoritas.
            </Text>
          </View>

          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>
              🍳 Detalhes
            </Text>
            <Text>
              Ingredientes e preparo.
            </Text>
          </View>

          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>
              ℹ️ Sobre
            </Text>
            <Text>
              Informações do projeto.
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          Desenvolvido por Giovanna,
          Beatriz Marchesini e Déborah
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F8F8',
  },

  hero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 35,
  },

  heroLeft: {
    flex: 1,
    minWidth: 250,
  },

  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF7A00',
  },

  heroSubtitle: {
    fontSize: 18,
    marginTop: 8,
    color: '#555',
  },

  heroCard: {
    width: 320,
    backgroundColor: '#FFF4EC',
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
  },

  heroCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heroCardText: {
    lineHeight: 22,
  },

  section: {
    marginBottom: 35,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  verTodas: {
    color: '#FF7A00',
    fontWeight: 'bold',
  },

  card: {
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 15,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#FF7A00',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  footerCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    margin: 8,
  },

  footerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 25,
    color: '#666',
  },
});