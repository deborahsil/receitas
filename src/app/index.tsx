import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const doces = [
  {
    id: '1',
    title: 'Brownie',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
  },
  {
    id: '2',
    title: 'Donuts',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b',
  },
  {
    id: '3',
    title: 'Cupcake',
    image:
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d',
  },
];

const salgados = [
  {
    id: '1',
    title: 'Hambúrguer',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    id: '2',
    title: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
  {
    id: '3',
    title: 'Batata Frita',
    image:
      'https://images.unsplash.com/photo-1576107232684-1279f390859f',
  },
];

function RecipeCard({ item }: any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    </View>
  );
}

function Carousel({ title, data }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
      />
    </View>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>🍴 Receitas</Text>

      <Carousel title="🍩 Doces" data={doces} />

      <Carousel title="🍕 Salgados" data={salgados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },

  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 4,
    color: '#444',
  },

  card: {
    width: width * 0.7,
    height: 220,
    marginRight: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#eee',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});