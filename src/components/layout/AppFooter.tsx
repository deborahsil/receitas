import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

export function AppFooter() {
  const { width } = useWindowDimensions();
  const isCompact = width < 520;

  return (
    <View style={[styles.footer, isCompact && styles.footerCompact]}>
      <Text style={styles.title}>CookBook+</Text>
      <Text style={styles.text}>
        Desenvolvido por Giovanna Isabela, Beatriz Marchesini e Deborah.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F0E1D2',
    marginTop: 24,
  },
  footerCompact: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 26,
    marginTop: 16,
  },
  title: {
    color: '#E85D04',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  text: {
    color: '#7B6F65',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 20,
  },
});
