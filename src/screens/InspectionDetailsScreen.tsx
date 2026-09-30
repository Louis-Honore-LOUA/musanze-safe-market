import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInspections } from '../context/InspectionsContext';
import { RecordsStackParamList } from '../navigation/types';
import EmptyState from '../components/EmptyState';
import { colors, fontSize, spacing } from '../theme';


type Props = NativeStackScreenProps<RecordsStackParamList, 'InspectionDetails'>;

export default function InspectionDetailsScreen({ route }: Props) {
  const { inspectionId } = route.params;
  const { inspections } = useInspections();
  const inspection = inspections.find((i) => i.id === inspectionId);

  if (!inspection) {
    return <EmptyState title="Inspection not found" message="This record is no longer available." />;
  }

  const rows: [string, string][] = [
    ['Vendor alias', inspection.vendorAlias],
    ['Stall code', inspection.stallCode],
    ['Category', inspection.category],
    ['Contact number', inspection.contactNumber],
    ['Risk level', inspection.riskLevel],
    ['Consent', inspection.consent ? 'Confirmed' : 'Not confirmed'],
    ['Recorded at', new Date(inspection.createdAt).toLocaleString()],
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm },
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
    photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12, backgroundColor: colors.border },
});