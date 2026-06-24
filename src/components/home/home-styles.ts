import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  block: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  blockCompact: {
    paddingHorizontal: 14,
  },
  section: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  sectionCompact: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  sectionTitle: {
    color: '#241A12',
    fontSize: 26,
    fontWeight: '900',
  },
  sectionTitleCompact: {
    fontSize: 23,
    lineHeight: 28,
  },
  sectionText: {
    color: '#74675C',
    marginTop: 5,
    lineHeight: 21,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0D7BE',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  categoryButtonCompact: {
    flexGrow: 1,
    alignItems: 'center',
    minWidth: 96,
  },
  categoryButtonActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  categoryButtonText: {
    color: '#7E4A18',
    fontWeight: '900',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridCompact: {
    gap: 14,
  },
});

