import { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, fontSize, spacing } from '../theme';

type Source = 'camera' | 'library';

type Feedback = {
  tone: 'info' | 'error';
  text: string;
  showSettings?: boolean;
} | null;

type Props = {
  imageUri: string | null;
  onChange: (uri: string | null) => void;
  error?: string;
};

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,   // permet de recadrer
  aspect: [4, 3],
  quality: 0.7,          // compresse l'image (moins lourde en mémoire)
};

export default function PhotoPicker({ imageUri, onChange, error }: Props) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [busy, setBusy] = useState(false);

  const pickImage = async (source: Source) => {
    setFeedback(null);
    setBusy(true);

    try {
      // 1. Demander la permission AU MOMENT où on en a besoin
      const permission =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      // 2. Permission refusée : message + chemin de récupération
      if (!permission.granted) {
        const name = source === 'camera' ? 'Camera' : 'Photo library';
        const other = source === 'camera' ? 'choose from the gallery' : 'take a photo';
        setFeedback({
          tone: 'error',
          text: permission.canAskAgain
            ? `${name} access was denied. Tap the button again to allow it, or ${other} instead.`
            : `${name} access is turned off for this app. Enable it in Settings, or ${other} instead.`,
          showSettings: !permission.canAskAgain,
        });
        return;
      }

      // 3. Ouvrir la caméra ou la galerie
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
          : await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);

      // 4. Annulation par l'utilisateur
      if (result.canceled || !result.assets || result.assets.length === 0) {
        setFeedback({
          tone: 'info',
          text: imageUri
            ? 'Cancelled. Your current photo was kept.'
            : 'No photo was selected. You can try again at any time.',
        });
        return;
      }

      // 5. Succès : on remonte l'URI de l'image au formulaire
      onChange(result.assets[0].uri);
    } catch {
      setFeedback({
        tone: 'error',
        text: `Could not open the ${source === 'camera' ? 'camera' : 'gallery'}. Please try again.`,
      });
    } finally {
      setBusy(false); // exécuté dans tous les cas
    }
  };

  const handleRemove = () => {
    onChange(null);
    setFeedback({ tone: 'info', text: 'Photo removed.' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Evidence photo</Text>

      {/* Aperçu ou emplacement vide */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.preview}
          accessibilityLabel="Selected evidence photo"
        />
      ) : (
        <View style={[styles.placeholder, error ? styles.placeholderError : null]}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={styles.placeholderText}>No photo yet</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <ActionButton
          label={imageUri ? 'Retake photo' : 'Take photo'}
          onPress={() => pickImage('camera')}
          disabled={busy}
        />
        <ActionButton
          label={imageUri ? 'Replace from gallery' : 'Choose from gallery'}
          onPress={() => pickImage('library')}
          disabled={busy}
        />
        {imageUri ? (
          <ActionButton label="Remove photo" onPress={handleRemove} disabled={busy} danger />
        ) : null}
      </View>

      {/* Erreur de validation du formulaire */}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}

      {/* Retour après refus / annulation / suppression */}
      {feedback ? (
        <View
          style={[styles.feedback, feedback.tone === 'error' ? styles.feedbackError : styles.feedbackInfo]}
          accessibilityLiveRegion="polite"
        >
          <Text style={feedback.tone === 'error' ? styles.feedbackErrorText : styles.feedbackInfoText}>
            {feedback.text}
          </Text>
          {feedback.showSettings ? (
            <Pressable onPress={() => Linking.openSettings()} accessibilityRole="link" style={styles.settingsLink}>
              <Text style={styles.settingsText}>Open Settings</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

// Petit bouton interne au composant
function ActionButton({
  label,
  onPress,
  disabled,
  danger,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        danger && styles.buttonDanger,
        (pressed || disabled) && { opacity: 0.6 },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.buttonText, danger && styles.buttonDangerText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  preview: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  placeholderError: { borderColor: colors.error },
  placeholderIcon: { fontSize: 36 },
  placeholderText: { fontSize: fontSize.md, color: colors.textMuted },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  button: {
    flexGrow: 1,
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: colors.primary, fontWeight: '700', fontSize: fontSize.md },
  buttonDanger: { borderColor: colors.error },
  buttonDangerText: { color: colors.error },
  error: { fontSize: fontSize.sm, color: colors.error, fontWeight: '600' },
  feedback: { borderRadius: 8, padding: spacing.md, gap: spacing.sm },
  feedbackError: { backgroundColor: colors.error + '14', borderWidth: 1, borderColor: colors.error },
  feedbackInfo: { backgroundColor: colors.border },
  feedbackErrorText: { color: colors.error, fontSize: fontSize.md },
  feedbackInfoText: { color: colors.text, fontSize: fontSize.md },
  settingsLink: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center' },
  settingsText: { color: colors.primary, fontWeight: '700', fontSize: fontSize.md, textDecorationLine: 'underline' },
});