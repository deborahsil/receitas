import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const receitas: any = {
  '1': {
    title: 'Brownie',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
    description: 'Delicioso brownie de chocolate.',
  },

  '2': {
    title: 'Donuts',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b',
    description: 'Donuts coloridos e fofinhos.',
  },

  '3': {
    title: 'Cupcake',
    image:
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d',
    description: 'Cupcake recheado com creme.',
  },
};

export default function ReceitaPage() {
  const { id } = useLocalSearchParams();

  const receita = receitas[id as string];

  return (
    <View style={styles.container}>
      <Image source={{ uri: receita.image }} style={styles.image} />

      <Text style={styles.title}>{receita.title}</Text>

      <Text style={styles.description}>
        {receita.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  description: {
    fontSize: 18,
    marginTop: 10,
    color: '#555',
  },
});