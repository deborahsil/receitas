import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { categories, categoryDetails } from '../../recipes/data';
import type { RecipeCategory } from '../../types/recipe';
import { homeStyles } from './home-styles';

type CategoryScrollerProps = {
  onCategoryPress: (category: RecipeCategory) => void;
};

export function CategoryScroller({ onCategoryPress }: CategoryScrollerProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 520;

  if (isCompact) {
    return (
      <View style={[homeStyles.section, homeStyles.sectionCompact, styles.sectionCompact]}>
        <Text style={[homeStyles.sectionTitle, homeStyles.sectionTitleCompact]}>Categorias</Text>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.84}
              style={[styles.categoryCard, styles.categoryCardFull, { borderTopColor: categoryDetails[item].color }]}
              onPress={() => onCategoryPress(item)}
            >
              <Text style={styles.categoryCardTitle}>{categoryDetails[item].title}</Text>
              <Text style={styles.categoryCardText}>{categoryDetails[item].subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[homeStyles.section, isCompact && homeStyles.sectionCompact]}>
      <Text style={[homeStyles.sectionTitle, isCompact && homeStyles.sectionTitleCompact]}>
        Categorias
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.84}
            style={[
              styles.categoryCard,
              isCompact && styles.categoryCardCompact,
              { borderTopColor: categoryDetails[item].color },
            ]}
            onPress={() => onCategoryPress(item)}
          >
            <Text style={styles.categoryCardTitle}>{categoryDetails[item].title}</Text>
            <Text style={styles.categoryCardText}>{categoryDetails[item].subtitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCompact: {
    paddingBottom: 8,
  },
  categoryGrid: {
    gap: 10,
    marginTop: 12,
  },
  categoryList: {
    gap: 12,
    paddingVertical: 14,
    paddingRight: 20,
  },
  categoryCard: {
    width: 250,
    minHeight: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    borderTopWidth: 5,
    padding: 16,
  },
  categoryCardCompact: {
    width: 220,
    minHeight: 122,
  },
  categoryCardFull: {
    width: '100%',
    minHeight: 112,
  },
  categoryCardTitle: {
    color: '#241A12',
    fontSize: 20,
    fontWeight: '900',
  },
  categoryCardText: {
    color: '#74675C',
    lineHeight: 20,
    marginTop: 8,
  },
});
