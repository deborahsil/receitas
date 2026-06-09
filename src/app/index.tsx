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
  {
    id: '10',
    title: 'Brigadeiro',
    image:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729',
  },
  {
    id: '11',
    title: 'Cheesecake',
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
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
  {
    id: '12',
    title: 'Coxinha',
    image:
      'https://images.unsplash.com/photo-1628294896516-2d1dce57c82c',
  },
  {
    id: '13',
    title: 'Pastel',
    image:
      'https://images.unsplash.com/photo-1612392062798-53b2f6df2c0a',
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
      onPress={() => router.push(`/receita/${item.id}` as any)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
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


function Carousel({ title, data, cardWidth }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
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

  const isTablet = width >= 768;

  const cardWidth = isTablet
    ? 450
    : width * 0.82;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.mainTitle,
            {
              fontSize: isTablet
                ? 42
                : 32,
            },
          ]}
        >
          
          <View style={styles.navbar}>
           <Text style={styles.logo}>
    CookBook+
  </Text>
</View>
        </Text>

        <Carousel
          title="🍩 Doces"
          data={doces}
          cardWidth={cardWidth}
        />

        <Carousel
          title="🍕 Salgados"
          data={salgados}
          cardWidth={cardWidth}
        />

        <Carousel
        title="🥤 Bebidas"
        data={bebidas}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#F8F8F8',
  },

  mainTitle: {
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 24,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#444',
    marginBottom: 12,
  },

  card: {
    height: 250,
    marginRight: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
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
    fontSize: 24,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#FF7A00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  navbar: {
    backgroundColor: '#FF7A00',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  
  logo: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

