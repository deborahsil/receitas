import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { categories } from '../../recipes/data';
import type { RecipeCategory } from '../../types/recipe';
import { homeStyles } from './home-styles';
import type { HomeRecipeForm } from './home-utils';

type AddRecipeSectionProps = {
  form: HomeRecipeForm;
  onFormChange: (form: HomeRecipeForm) => void;
  onSubmit: () => void;
};

export function AddRecipeSection({ form, onFormChange, onSubmit }: AddRecipeSectionProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 560;
  const isWide = width >= 960;

  const updateForm = (field: keyof HomeRecipeForm, value: string | RecipeCategory) => {
    onFormChange({ ...form, [field]: value });
  };

  return (
    <View
      style={[
        styles.addSection,
        isCompact && styles.addSectionCompact,
        isWide && styles.addSectionWide,
      ]}
    >
      <View style={[styles.addCopy, isWide && styles.addCopyWide]}>
        <Text style={[homeStyles.sectionTitle, isCompact && homeStyles.sectionTitleCompact]}>
          Adicionar receita
        </Text>
        <Text style={homeStyles.sectionText}>
          Cadastre uma receita nova para ela aparecer na lista e nos favoritos enquanto o app
          estiver aberto.
        </Text>
      </View>

      <View style={[styles.form, isCompact && styles.formCompact, isWide && styles.formWide]}>
        <FieldLabel label="Nome da receita" />
        <TextInput
          value={form.nome}
          onChangeText={(nome) => updateForm('nome', nome)}
          placeholder="Ex: Bolo de cenoura"
          placeholderTextColor="#9A8D80"
          style={styles.input}
        />

        <FieldLabel label="Categoria" />
        <View style={homeStyles.categoryRow}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              activeOpacity={0.82}
              onPress={() => updateForm('categoria', category)}
              style={[
                homeStyles.categoryButton,
                isCompact && homeStyles.categoryButtonCompact,
                form.categoria === category && homeStyles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  homeStyles.categoryButtonText,
                  form.categoria === category && homeStyles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.inputRow, isCompact && styles.inputRowCompact]}>
          <View style={styles.inputGroup}>
            <FieldLabel label="Tempo" />
            <TextInput
              value={form.tempo}
              onChangeText={(tempo) => updateForm('tempo', tempo)}
              placeholder="30 min"
              placeholderTextColor="#9A8D80"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <FieldLabel label="Porcoes" />
            <TextInput
              value={form.porcoes}
              onChangeText={(porcoes) => updateForm('porcoes', porcoes)}
              placeholder="4 porcoes"
              placeholderTextColor="#9A8D80"
              style={styles.input}
            />
          </View>
        </View>

        <FieldLabel label="Imagem" />
        <TextInput
          value={form.imagem}
          onChangeText={(imagem) => updateForm('imagem', imagem)}
          placeholder="URL da imagem (opcional)"
          placeholderTextColor="#9A8D80"
          style={styles.input}
        />

        <FieldLabel label="Ingredientes" />
        <TextInput
          value={form.ingredientes}
          onChangeText={(ingredientes) => updateForm('ingredientes', ingredientes)}
          placeholder="Ingredientes separados por virgula"
          placeholderTextColor="#9A8D80"
          multiline
          style={[styles.input, styles.textArea]}
        />

        <FieldLabel label="Modo de preparo" />
        <TextInput
          value={form.preparo}
          onChangeText={(preparo) => updateForm('preparo', preparo)}
          placeholder="Passos separados por virgula"
          placeholderTextColor="#9A8D80"
          multiline
          style={[styles.input, styles.textArea]}
        />

        <TouchableOpacity activeOpacity={0.86} style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Adicionar no livro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.label}>{label}</Text>;
}

const styles = StyleSheet.create({
  addSection: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
    gap: 16,
  },
  addSectionCompact: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 14,
  },
  addSectionWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addCopy: {
    width: '100%',
    minWidth: 0,
  },
  addCopyWide: {
    flex: 0.72,
    minWidth: 0,
  },
  form: {
    minWidth: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0E1D2',
    padding: 16,
    gap: 8,
  },
  formCompact: {
    padding: 14,
  },
  formWide: {
    flex: 1.28,
  },
  label: {
    color: '#5E4634',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  input: {
    width: '100%',
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECD8C6',
    backgroundColor: '#FFFDFC',
    paddingHorizontal: 13,
    paddingVertical: 10,
    color: '#241A12',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  inputRowCompact: {
    flexDirection: 'column',
  },
  inputGroup: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  submitButton: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: '#241A12',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
