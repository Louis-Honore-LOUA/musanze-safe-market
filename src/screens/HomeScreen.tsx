import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import StallCard from '../components/StallCard';
import EmptyState from '../components/EmptyState';
import { STALLS } from '../data/stalls';
import { colors, fontSize, spacing } from '../theme';

export default function HomeScreen() {
  // État local : afficher la liste ou l'état vide (pour la démonstration)
  const [showEmpty, setShowEmpty] = useState(false);
  const data = showEmpty ? [] : STALLS;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StallCard stall={item} />}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            Market Zones
          </Text>
          <Text style={styles.subtitle}>
            {data.length} assigned stall{data.length === 1 ? '' : 's'}
          </Text>

          <Pressable
            onPress={() => setShowEmpty((prev) => !prev)}
            style={styles.toggle}
            accessibilityRole="button"
          >
            <Text style={styles.toggleText}>
              {showEmpty ? 'Show stalls' : 'Preview empty state'}
            </Text>
          </Pressable>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          title="No stalls assigned"
          message="There are no market zones to inspect today. Check back later."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  toggle: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    minHeight: 44,                 // zone de toucher accessible
    justifyContent: 'center',
  },
  toggleText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSize.md,
  },
});