import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../theme';

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
};

export default function ConsentCheckbox({ checked, onChange, error }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange(!checked)}
        style={styles.row}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
      >
        <View style={[styles.box, checked && styles.boxChecked, error ? styles.boxError : null]}>
          {checked ? <Text style={styles.tick}>✓</Text> : null}
        </View>
        <Text style={styles.text}>
          The vendor consents to this inspection and to a photo of the stall being recorded.
        </Text>
      </Pressable>

      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 44 },
  box: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  boxError: { borderColor: colors.error },
  tick: { color: '#FFFFFF', fontWeight: '800', fontSize: fontSize.md },
  text: { flex: 1, fontSize: fontSize.md, color: colors.text },
  error: { fontSize: fontSize.sm, color: colors.error, fontWeight: '600' },
});