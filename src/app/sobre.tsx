import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        CookBook+
      </Text>

      <Text style={styles.text}>
        Seu livro de receitas na palma da mão.
      </Text>

      <Text style={styles.subtitle}>
        Desenvolvido por:
      </Text>

      <Text style={styles.text}>
        Giovanna Isabela
      </Text>

      <Text style={styles.text}>
        Beatriz Marchesini
      </Text>

      <Text style={styles.text}>
        Déborah
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});