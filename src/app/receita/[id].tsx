import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { receitas } from '../../Data/receitas';

export default function Receita() {
  const { id } = useLocalSearchParams();

  const receita = receitas[id as string];

  if (!receita) {
    return (
      <View style={styles.center}>
        <Text>Receita não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: receita.imagem }}
        style={styles.image}
      />

      <Text style={styles.title}>
        {receita.nome}
      </Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          ⏱ {receita.tempo}
        </Text>

        <Text style={styles.infoText}>
          🍽 {receita.porcoes}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Ingredientes
      </Text>

      {receita.ingredientes.map(
        (item: string, index: number) => (
          <Text
            key={index}
            style={styles.item}
          >
            • {item}
          </Text>
        )
      )}

      <Text style={styles.sectionTitle}>
        Modo de Preparo
      </Text>

      {receita.preparo.map(
        (passo: string, index: number) => (
          <Text
            key={index}
            style={styles.item}
          >
            {index + 1}. {passo}
          </Text>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 300,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  infoText: {
    fontSize: 18,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  item: {
    fontSize: 17,
    marginHorizontal: 20,
    marginBottom: 8,
    lineHeight: 25,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});