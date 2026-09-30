import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MarketStall, Priority } from '../types';
import { colors, fontSize, spacing } from '../theme';
import StatusChip from './StatusChip';

const PRIORITY_STYLE: Record<Priority, { bg: string; label: string }> = {
  High: { bg: '#1A1A1A', label: '▲▲▲ High' },
  Medium: { bg: '#4A4A4A', label: '▲▲ Medium' },
  Low: { bg: '#8A8A8A', label: '▲ Low' },
};

type Props = {
  stall: MarketStall;
  onPress?: () => void; // le "?" veut dire : optionnel
};

export default function StallCard({ stall, onPress }: Props) {
  const priority = PRIORITY_STYLE[stall.priority];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${stall.name}, ${stall.category}, ${stall.zone}, status ${stall.status}, priority ${stall.priority}`}
    >
      {/* Emplacement de l'image (placeholder) */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.initial}>{stall.name.charAt(0)}</Text>
      </View>

      {/* Informations */}
      <View style={styles.info}>
        <Text style={styles.name}>{stall.name}</Text>
        <Text style={styles.meta}>
          {stall.category} · {stall.zone}
        </Text>

        <View style={styles.badges}>
          <StatusChip status={stall.status} />
          <View style={[styles.priority, { backgroundColor: priority.bg }]}>
            <Text style={styles.priorityText}>{priority.label}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',          // image à gauche, infos à droite
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textMuted,
  },
  info: {
    flex: 1,                        // prend toute la place restante
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',               // passe à la ligne si l'écran est étroit
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  priority: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  priorityText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});