import { StyleSheet, Text, View } from 'react-native';
import { StallStatus } from '../types';
import { colors, fontSize, spacing } from '../theme';

// À chaque statut, sa couleur
const STATUS_COLORS: Record<StallStatus, string> = {
  Inspected: colors.inspected,
  Pending: colors.pending,
  Flagged: colors.flagged,
};

type Props = {
  status: StallStatus;
};

export default function StatusChip({ status }: Props) {
  const color = STATUS_COLORS[status];

  return (
    <View
      style={[styles.chip, { borderColor: color, backgroundColor: color + '1A' }]}
      accessibilityLabel={`Status: ${status}`}
    >
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});