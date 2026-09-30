import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInspections } from '../context/InspectionsContext';
import { InspectionStackParamList } from '../navigation/types';
import { InspectionDraft } from '../types';
import { validateDraft } from '../utils/validation';
import { CATEGORIES, RISK_LEVELS } from '../data/options';
import FormField from '../components/FormField';
import OptionGroup from '../components/OptionGroup';
import ConsentCheckbox from '../components/ConsentCheckbox';
import { colors, fontSize, spacing } from '../theme';
import PhotoPicker from '../components/PhotoPicker';

type Props = NativeStackScreenProps<InspectionStackParamList, 'InspectionForm'>;
type Field = keyof InspectionDraft;

export default function InspectionFormScreen({ navigation }: Props) {
  const { draft, updateDraft } = useInspections();

  // Champs déjà "visités" : on n'affiche pas d'erreur avant que l'utilisateur ait interagi
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  // Passe à true quand l'utilisateur appuie sur le bouton
  const [submitted, setSubmitted] = useState(false);
    // Chaque fois que l'écran redevient visible (retour de Review, changement d'onglet),
  // on repart sans erreurs affichées
  useFocusEffect(
    useCallback(() => {
      setTouched({});
      setSubmitted(false);
    }, [])
  );

  // Les erreurs sont RECALCULÉES à chaque rendu (état dérivé, pas stocké)
  const errors = validateDraft(draft);
  const errorCount = Object.keys(errors).length;

  const errorFor = (field: Field) => (submitted || touched[field] ? errors[field] : undefined);
  const markTouched = (field: Field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleContinue = () => {
    setSubmitted(true);
    if (errorCount > 0) {
      return; // ⛔ soumission bloquée : les erreurs s'affichent
    }
    setSubmitted(false);
    setTouched({});
    navigation.navigate('Review');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.intro}>All fields are required. Use fictional data only.</Text>

      <FormField
        label="Vendor alias"
        value={draft.vendorAlias}
        onChangeText={(text) => updateDraft('vendorAlias', text)}
        onBlur={() => markTouched('vendorAlias')}
        placeholder="e.g. Mama Keza"
        autoCapitalize="words"
        error={errorFor('vendorAlias')}
      />

      <FormField
        label="Stall code"
        value={draft.stallCode}
        onChangeText={(text) => updateDraft('stallCode', text)}
        onBlur={() => markTouched('stallCode')}
        placeholder="MSM-A101"
        autoCapitalize="characters"
        autoCorrect={false}
        hint="MSM- then zone letter A–F and 3 digits"
        error={errorFor('stallCode')}
      />

      <OptionGroup
        label="Category"
        options={CATEGORIES}
        value={draft.category}
        onChange={(value) => {
          updateDraft('category', value);
          markTouched('category');
        }}
        error={errorFor('category')}
      />

      <FormField
        label="Contact number"
        value={draft.contactNumber}
        onChangeText={(text) => updateDraft('contactNumber', text)}
        onBlur={() => markTouched('contactNumber')}
        placeholder="078 000 0000"
        keyboardType="phone-pad"
        hint="Fictional Rwanda mobile number (072, 073, 078, 079)"
        error={errorFor('contactNumber')}
      />

      <OptionGroup
        label="Risk level"
        options={RISK_LEVELS}
        value={draft.riskLevel}
        onChange={(value) => {
          updateDraft('riskLevel', value);
          markTouched('riskLevel');
        }}
        error={errorFor('riskLevel')}
      />
            <PhotoPicker
        imageUri={draft.imageUri}
        onChange={(uri) => {
          updateDraft('imageUri', uri);
          markTouched('imageUri');
        }}
        error={errorFor('imageUri')}
      />

      <ConsentCheckbox
        checked={draft.consent}
        onChange={(value) => {
          updateDraft('consent', value);
          markTouched('consent');
        }}
        error={errorFor('consent')}
      />

      {submitted && errorCount > 0 ? (
        <Text style={styles.summary} accessibilityLiveRegion="assertive">
          Please fix {errorCount} field{errorCount > 1 ? 's' : ''} before continuing.
        </Text>
      ) : null}

      <Pressable
        onPress={handleContinue}
        style={({ pressed }) => [
          styles.button,
          errorCount > 0 && styles.buttonInactive,
          pressed && { opacity: 0.8 },
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: errorCount > 0 }}
      >
        <Text style={styles.buttonText}>Continue to review</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.lg, paddingBottom: spacing.xl },
  intro: { fontSize: fontSize.md, color: colors.textMuted },
  summary: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  buttonInactive: { backgroundColor: colors.textMuted },
  buttonText: { color: '#FFFFFF', fontSize: fontSize.md, fontWeight: '700' },
});