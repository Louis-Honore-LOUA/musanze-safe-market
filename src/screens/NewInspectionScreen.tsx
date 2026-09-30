import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useInspections } from '../context/InspectionsContext';
import { colors, fontSize, spacing } from '../theme';

export default function NewInspectionScreen() {
  const { inspections, addInspection } = useInspections();

  const handleAddDemo = () => {
    addInspection({
      id: Date.now().toString(),
      vendorAlias: 'Demo Vendor',
      stallCode: 'MSM-A101',
      category: 'Produce',
      contactNumber: '0780000000',
      riskLevel: 'Medium',
      consent: true,
      imageUri: null,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Inspection</Text>
      <Text style={styles.text}>The real form comes in the next step.</Text>
      <Text style={styles.text}>Records in session: {inspections.length}</Text>

      <Pressable style={styles.button} onPress={handleAddDemo} accessibilityRole="button">
        <Text style={styles.buttonText}>Add demo inspection</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, gap: spacing.sm, backgroundColor: colors.background },
  title: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  text: { fontSize: fontSize.md, color: colors.textMuted },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  buttonText: { color: '#FFFFFF', fontSize: fontSize.md, fontWeight: '700' },
});