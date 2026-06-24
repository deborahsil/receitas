import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';

type CommunityComment = {
  id: string;
  name: string;
  recipe: string;
  comment: string;
  rating: number;
};

const recentPosts = [
  {
    id: '1',
    title: 'Bolo de cenoura com cobertura cremosa',
    author: 'Marina',
    category: 'Doces',
    time: 'Publicado ha 12 min',
  },
  {
    id: '2',
    title: 'Sanduiche natural para lanche rapido',
    author: 'Lucas',
    category: 'Salgados',
    time: 'Publicado ha 28 min',
  },
  {
    id: '3',
    title: 'Limonada gelada com hortela',
    author: 'Clara',
    category: 'Bebidas',
    time: 'Publicado ha 1 hora',
  },
];

const initialComments: CommunityComment[] = [
  {
    id: '1',
    name: 'Giovanna',
    recipe: 'Brownie Cremoso',
    comment: 'Fiz no fim de semana e ficou bem facil de seguir.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Beatriz',
    recipe: 'Pizza Marguerita',
    comment: 'Gostei da organizacao dos ingredientes e do tempo de preparo.',
    rating: 4,
  },
  {
    id: '3',
    name: 'Deborah',
    recipe: 'Suco de Laranja',
    comment: 'Receita simples, boa para colocar na tela de bebidas.',
    rating: 5,
  },
];

export default function Comunidade() {
  const { width } = useWindowDimensions();
  const isCompact = width < 560;
  const isWide = width >= 920;
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommunityComment[]>(initialComments);

  const averageRating = useMemo(() => {
    const total = comments.reduce((sum, item) => sum + item.rating, 0);
    return (total / comments.length).toFixed(1);
  }, [comments]);

  const publishComment = () => {
    const text = comment.trim();

    if (!text) {
      return;
    }

    setComments((current) => [
      {
        id: `novo-${Date.now()}`,
        name: 'Visitante',
        recipe: 'Receita da comunidade',
        comment: text,
        rating,
      },
      ...current,
    ]);
    setComment('');
    setRating(4);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppHeader active="comunidade" />

        <View style={[styles.content, isCompact && styles.contentCompact]}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Comunidade CookBook+</Text>
            <Text style={[styles.title, isCompact && styles.titleCompact]}>Comentarios e avaliacoes</Text>
            <Text style={[styles.text, isCompact && styles.textCompact]}>
              Um espaco simples para simular comentarios, notas e receitas postadas recentemente
              pela comunidade.
            </Text>
          </View>

          <View style={[styles.statsGrid, isCompact && styles.statsGridCompact]}>
            <InfoCard label="Comentarios" value={`${comments.length}`} detail="Interacoes recentes" />
            <InfoCard label="Avaliacao media" value={averageRating} detail="Sistema de 1 a 5 estrelas" />
            <InfoCard label="Receitas no feed" value={`${recentPosts.length}`} detail="Postagens falsas para visual" />
          </View>

          <View style={[styles.mainGrid, isWide && styles.mainGridWide]}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Escrever comentario</Text>
              <Text style={styles.panelText}>
                Deixe uma opiniao rapida sobre uma receita e escolha uma avaliacao.
              </Text>

              <Text style={styles.label}>Sua avaliacao</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    activeOpacity={0.8}
                    onPress={() => setRating(value)}
                    style={styles.starButton}
                  >
                    <Text style={[styles.star, value <= rating && styles.starActive]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Comentario</Text>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Escreva algo para a comunidade..."
                placeholderTextColor="#9A8D80"
                multiline
                style={styles.textArea}
              />

              <TouchableOpacity activeOpacity={0.86} style={styles.submitButton} onPress={publishComment}>
                <Text style={styles.submitButtonText}>Publicar comentario</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Feed da comunidade</Text>
              <Text style={styles.panelText}>Receitas postadas recentemente.</Text>

              <View style={styles.feedList}>
                {recentPosts.map((post) => (
                  <View key={post.id} style={styles.feedCard}>
                    <View style={styles.feedHeader}>
                      <Text style={styles.feedCategory}>{post.category}</Text>
                      <Text style={styles.feedTime}>{post.time}</Text>
                    </View>
                    <Text style={styles.feedTitle}>{post.title}</Text>
                    <Text style={styles.feedAuthor}>Por {post.author}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Comentarios recentes</Text>

            <View style={[styles.commentsGrid, isWide && styles.commentsGridWide]}>
              {comments.map((item) => (
                <View key={item.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{item.name.slice(0, 1)}</Text>
                    </View>
                    <View style={styles.commentTitleWrap}>
                      <Text style={styles.commentName}>{item.name}</Text>
                      <Text style={styles.commentRecipe}>{item.recipe}</Text>
                    </View>
                  </View>

                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentStars}>{renderStars(item.rating)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <AppFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoDetail}>{detail}</Text>
    </View>
  );
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (index < rating ? '★' : '☆')).join(' ');
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
    paddingBottom: 18,
  },
  contentCompact: {
    paddingHorizontal: 14,
  },
  hero: {
    maxWidth: 760,
  },
  eyebrow: {
    color: '#B94E00',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#241A12',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 46,
    marginTop: 6,
  },
  titleCompact: {
    fontSize: 30,
    lineHeight: 36,
  },
  text: {
    color: '#6B6259',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
  },
  textCompact: {
    fontSize: 15,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 22,
  },
  statsGridCompact: {
    gap: 10,
  },
  infoCard: {
    flexGrow: 1,
    flexBasis: 220,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 16,
  },
  infoLabel: {
    color: '#8A7D72',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: '#E85D04',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },
  infoDetail: {
    color: '#6B6259',
    lineHeight: 20,
    marginTop: 4,
  },
  mainGrid: {
    gap: 16,
    marginTop: 18,
  },
  mainGridWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  panel: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 18,
  },
  panelTitle: {
    color: '#241A12',
    fontSize: 22,
    fontWeight: '900',
  },
  panelText: {
    color: '#6B6259',
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 14,
  },
  label: {
    color: '#5E4634',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  starButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF6EF',
    borderWidth: 1,
    borderColor: '#FFE0C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    color: '#C9B8A8',
    fontSize: 22,
    lineHeight: 24,
  },
  starActive: {
    color: '#FF7A00',
  },
  textArea: {
    width: '100%',
    minHeight: 118,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECD8C6',
    backgroundColor: '#FFFDFC',
    color: '#241A12',
    fontSize: 15,
    lineHeight: 21,
    paddingHorizontal: 13,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: '#241A12',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  feedList: {
    gap: 10,
  },
  feedCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    backgroundColor: '#FFFDFC',
    padding: 14,
  },
  feedHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  feedCategory: {
    color: '#E85D04',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  feedTime: {
    color: '#8A7D72',
    fontSize: 12,
    fontWeight: '700',
  },
  feedTitle: {
    color: '#241A12',
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
    marginTop: 8,
  },
  feedAuthor: {
    color: '#6B6259',
    marginTop: 6,
  },
  commentsSection: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#241A12',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  commentsGrid: {
    gap: 12,
  },
  commentsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commentCard: {
    flexGrow: 1,
    flexBasis: 300,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  commentTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  commentName: {
    color: '#241A12',
    fontSize: 16,
    fontWeight: '900',
  },
  commentRecipe: {
    color: '#8A7D72',
    marginTop: 2,
  },
  commentText: {
    color: '#5D5148',
    lineHeight: 22,
    marginTop: 12,
  },
  commentStars: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 10,
  },
});

