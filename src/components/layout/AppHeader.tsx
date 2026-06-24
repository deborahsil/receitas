import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

type AppHeaderProps = {
  active?: 'home' | 'receitas' | 'favoritos' | 'comunidade' | 'sobre';
};

const links = [
  { key: 'home', label: 'Inicio', href: '/' },
  { key: 'receitas', label: 'Receitas', href: '/receita' },
  { key: 'favoritos', label: 'Favoritos', href: '/favoritos' },
  { key: 'comunidade', label: 'Comunidade', href: '/comunidade' },
  { key: 'sobre', label: 'Sobre', href: '/sobre' },
] as const;

export function AppHeader({ active = 'home' }: AppHeaderProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 700;

  return (
    <View style={[styles.header, isCompact && styles.headerCompact]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/')}>
        <View>
          <Text style={styles.brand}>CookBook+</Text>
          <Text style={styles.tagline}>Livro de receitas</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.nav, isCompact && styles.navCompact]}>
        {links.map((link) => {
          const isActive = active === link.key;

          return (
            <TouchableOpacity
              key={link.key}
              activeOpacity={0.78}
              onPress={() => router.push(link.href)}
              style={[
                styles.navButton,
                isCompact && styles.navButtonCompact,
                isActive && styles.navButtonActive,
              ]}
            >
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerCompact: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  brand: {
    color: '#E85D04',
    fontSize: 26,
    fontWeight: '900',
  },
  navCompact: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  tagline: {
    color: '#7B6F65',
    fontSize: 12,
    fontWeight: '700',
  },
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
  },
  navButton: {
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF6EF',
    borderWidth: 1,
    borderColor: '#FFE0C2',
  },
  navButtonCompact: {
    flexGrow: 1,
    minWidth: 104,
  },
  navButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  navText: {
    color: '#8A4500',
    fontSize: 13,
    fontWeight: '800',
  },
  navTextActive: {
    color: '#FFFFFF',
  },
});
