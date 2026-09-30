import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInspections } from '../context/InspectionsContext';
import { InspectionStackParamList } from '../navigation/types';
import { toInspection } from '../utils/validation';
import EmptyState from '../components/EmptyState';
import { colors, fontSize, spacing } from '../theme';


type Props = NativeStackScreenProps<InspectionStackParamList, 'Review'>;

export default function ReviewScreen({ navigation }: Props) {
  const { draft, addInspection, resetDraft } = useInspections();

  // Horodatage figé au moment où l'écran de revue s'ouvre
  const [reviewedAt] = useState(() => new Date());

  // On revalide ici aussi : on ne fait jamais confiance à l'étape précédente
  const inspection = toInspection(draft, reviewedAt);

  if (!inspection) {
    return (
      <EmptyState
        title="Inspection incomplete"
        message="Go back and complete all required fields before reviewing."
      />
    );
  }

  const handleSave = () => {
    addInspection(inspection);
    navigation.popToTop();          // revient au formulaire dans ce stack
    resetDraft();                   // vide le formulaire
    navigation.getParent()?.navigate('Records', { screen: 'RecordsList' });
  };

  const rows: [string, string][] = [
    ['Vendor alias', inspection.vendorAlias],
    ['Stall code', inspection.stallCode],
    ['Category', inspection.category],
    ['Contact number', inspection.contactNumber],
    ['Risk level', inspection.riskLevel],
    ['Consent', 'Confirmed'],
    ['Timestamp', reviewedAt.toLocaleString()],
    
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>Check the details before saving.</Text>

            {inspection.imageUri ? (
        <Image
          source={{ uri: inspection.imageUri }}
          style={styles.photo}
          accessibilityLabel="Evidence photo"
        />
      ) : null}

      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, styles.secondaryText]}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSave} accessibilityRole="button">
          <Text style={styles.buttonText}>Save inspection</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm, paddingBottom: spacing.xl },
  intro: { fontSize: fontSize.md, color: colors.textMuted, marginBottom: spacing.xs },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 2,
  },
  label: { fontSize: fontSize.sm, color: colors.textMuted },
  value: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  button: {
    flexGrow: 1,
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary },
  buttonText: { color: '#FFFFFF', fontSize: fontSize.md, fontWeight: '700' },
  secondaryText: { color: colors.primary },
    photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12, backgroundColor: colors.border },
});