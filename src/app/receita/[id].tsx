import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { receitas } from '../../Data/receitas';

const { width } = Dimensions.get('window');

export default function Receita() {
  const { id } = useLocalSearchParams();

  const receita =
  receitas[id as keyof typeof receitas];

  if (!receita) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Receita não encontrada.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: receita.imagem }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {receita.nome}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>
              ⏱
            </Text>

            <Text style={styles.infoTitle}>
              Tempo
            </Text>

            <Text style={styles.infoValue}>
              {receita.tempo}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>
              🍽
            </Text>

            <Text style={styles.infoTitle}>
              Porções
            </Text>

            <Text style={styles.infoValue}>
              {receita.porcoes}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          🛒 Ingredientes
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
          👨‍🍳 Modo de Preparo
        </Text>

        {receita.preparo.map(
          (passo: string, index: number) => (
            <View
              key={index}
              style={styles.stepContainer}
            >
              <Text style={styles.stepNumber}>
                {index + 1}
              </Text>

              <Text style={styles.stepText}>
                {passo}
              </Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  image: {
    width: '100%',
    height: width > 768 ? 450 : 280,
    resizeMode: 'cover',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: width > 768 ? 38 : 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },

  infoEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },

  infoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
    marginBottom: 15,
  },

  item: {
    fontSize: 17,
    color: '#444',
    marginBottom: 10,
    lineHeight: 24,
  },

  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },

  stepNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#FF7A00',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },

  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});