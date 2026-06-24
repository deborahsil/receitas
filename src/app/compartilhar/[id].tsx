import React from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { AppFooter } from '../../components/layout/AppFooter';
import { AppHeader } from '../../components/layout/AppHeader';
import { getRecipeImage, receitas } from '../../recipes/data';

const qrPattern = [
  '11111110101111111',
  '10000010101000001',
  '10111010101011101',
  '10111010111011101',
  '10111010001011101',
  '10000010101000001',
  '11111110101111111',
  '00000000100000000',
  '11010111101101011',
  '01001100111010010',
  '11101010100101111',
  '00111001101110100',
  '10101110111010101',
  '00000000100101010',
  '11111110101110111',
  '10000010100000100',
  '11111110111011101',
];

export default function CompartilharReceita() {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const recipe = receitas[String(id)];
  const isWide = width >= 840;
  const isCompact = width < 520;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader active="receitas" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Receita nao encontrada</Text>
          <Text style={styles.emptyText}>Volte para o catalogo e escolha uma receita.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/receita')}>
            <Text style={styles.primaryButtonText}>Ver receitas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const shareText = `Olha essa receita do CookBook+: ${recipe.nome}\n\nTempo: ${recipe.tempo}\nPorcoes: ${recipe.porcoes}\n\nIngredientes:\n- ${recipe.ingredientes.join(
    '\n- '
  )}\n\nModo de preparo:\n${recipe.preparo
    .map((step, index) => `${index + 1}. ${step}`)
    .join('\n')}`;

  const handleShare = async () => {
    await Share.share({
      title: `Receita: ${recipe.nome}`,
      message: shareText,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="receitas" />

        <View style={[styles.content, isCompact && styles.contentCompact]}>
          <TouchableOpacity activeOpacity={0.78} onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={[styles.sharePanel, isWide && styles.sharePanelWide]}>
            <View style={styles.recipePreview}>
              <Image source={{ uri: getRecipeImage(recipe) }} resizeMode="cover" style={styles.image} />
              <View style={styles.previewText}>
                <Text style={styles.eyebrow}>Compartilhar receita</Text>
                <Text style={[styles.title, isCompact && styles.titleCompact]}>{recipe.nome}</Text>
                <Text style={styles.description}>{recipe.descricao}</Text>
                <Text style={styles.meta}>
                  {recipe.tempo} | {recipe.porcoes} | {recipe.categoria}
                </Text>
              </View>
            </View>

            <View style={styles.shareBox}>
              <Text style={styles.shareTitle}>QR Code da receita</Text>
              <Text style={styles.shareText}>
                Aponte a camera para acessar a receita ou use o botao de compartilhar.
              </Text>

              <View style={styles.qrWrap}>
                {qrPattern.map((row, rowIndex) => (
                  <View key={`row-${rowIndex}`} style={styles.qrRow}>
                    {row.split('').map((cell, cellIndex) => (
                      <View
                        key={`${rowIndex}-${cellIndex}`}
                        style={[styles.qrCell, cell === '1' && styles.qrCellActive]}
                      />
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.shareActions}>
                <TouchableOpacity activeOpacity={0.86} style={styles.primaryButton} onPress={handleShare}>
                  <Text style={styles.primaryButtonText}>Compartilhar agora</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.86}
                  style={styles.whatsappButton}
                  onPress={handleShare}
                >
                  <Text style={styles.whatsappButtonText}>Enviar pelo WhatsApp</Text>
                </TouchableOpacity>
              </View>
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
    paddingBottom: 22,
  },
  contentCompact: {
    paddingHorizontal: 14,
  },
  backText: {
    color: '#C35200',
    fontWeight: '900',
    marginBottom: 14,
  },
  sharePanel: {
    gap: 16,
  },
  sharePanelWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  recipePreview: {
    flex: 1.15,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 260,
  },
  previewText: {
    padding: 18,
  },
  eyebrow: {
    color: '#B94E00',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#241A12',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,
    marginTop: 6,
  },
  titleCompact: {
    fontSize: 28,
    lineHeight: 34,
  },
  description: {
    color: '#6B6259',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  meta: {
    color: '#E85D04',
    fontWeight: '900',
    marginTop: 12,
  },
  shareBox: {
    flex: 0.85,
    minWidth: 0,
    backgroundColor: '#241A12',
    borderRadius: 8,
    padding: 18,
  },
  shareTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  shareText: {
    color: '#FFE7D0',
    lineHeight: 21,
    marginTop: 8,
  },
  qrWrap: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 22,
  },
  qrRow: {
    flexDirection: 'row',
  },
  qrCell: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
  },
  qrCellActive: {
    backgroundColor: '#241A12',
  },
  shareActions: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  whatsappButton: {
    backgroundColor: '#1FAF64',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 13,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    color: '#241A12',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyText: {
    color: '#74675C',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
});

