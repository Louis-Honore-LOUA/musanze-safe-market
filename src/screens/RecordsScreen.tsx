import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInspections } from '../context/InspectionsContext';
import { RecordsStackParamList } from '../navigation/types';
import EmptyState from '../components/EmptyState';
import { colors, fontSize, spacing } from '../theme';

type Props = NativeStackScreenProps<RecordsStackParamList, 'RecordsList'>;

export default function RecordsScreen({ navigation }: Props) {
  const { inspections } = useInspections();

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={inspections}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
          onPress={() => navigation.navigate('InspectionDetails', { inspectionId: item.id })}
          accessibilityRole="button"
          accessibilityLabel={`Inspection of ${item.vendorAlias}, stall ${item.stallCode}. Open details`}
        >
          <Text style={styles.itemTitle}>{item.vendorAlias}</Text>
          <Text style={styles.itemMeta}>
            {item.stallCode} · {item.category} · Risk: {item.riskLevel}
          </Text>
          <Text style={styles.itemMeta}>{new Date(item.createdAt).toLocaleString()}</Text>
        </Pressable>
      )}
      ListEmptyComponent={
        <EmptyState
          title="No inspections yet"
          message="Saved inspections from this session will appear here."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, flexGrow: 1 },
  item: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  itemMeta: { fontSize: fontSize.sm, color: colors.textMuted },
});