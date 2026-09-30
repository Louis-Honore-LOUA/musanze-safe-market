import { DraftErrors, Inspection, InspectionDraft } from '../types';

// MSM- + une lettre de A à F + exactement 3 chiffres
export const STALL_CODE_PATTERN = /^MSM-[A-F]\d{3}$/;

// (+250 ou 0) + 7 + (2, 3, 8 ou 9) + exactement 7 chiffres
export const RW_PHONE_PATTERN = /^(?:\+250|0)7[2389]\d{7}$/;

// Normalisation : on nettoie avant de vérifier
export const normalizeStallCode = (value: string) => value.trim().toUpperCase();
export const normalizePhone = (value: string) => value.replace(/\s+/g, '');

export function validateDraft(draft: InspectionDraft): DraftErrors {
  const errors: DraftErrors = {};

  const alias = draft.vendorAlias.trim();
  if (alias.length === 0) {
    errors.vendorAlias = 'Vendor alias is required.';
  } else if (alias.length < 2 || alias.length > 40) {
    errors.vendorAlias = 'Use between 2 and 40 characters.';
  }

  const code = normalizeStallCode(draft.stallCode);
  if (code.length === 0) {
    errors.stallCode = 'Stall code is required.';
  } else if (!STALL_CODE_PATTERN.test(code)) {
    errors.stallCode = 'Use the format MSM-A101 (zone A–F, then 3 digits).';
  }

  if (!draft.category) {
    errors.category = 'Select a category.';
  }

  const phone = normalizePhone(draft.contactNumber);
  if (phone.length === 0) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!RW_PHONE_PATTERN.test(phone)) {
    errors.contactNumber = 'Use a Rwanda mobile format: 07X XXX XXXX (072, 073, 078 or 079).';
  }

  if (!draft.riskLevel) {
    errors.riskLevel = 'Select a risk level.';
  }

  if (!draft.consent) {
    errors.consent = 'Consent must be confirmed before continuing.';
  }

  return errors;
}

export const hasErrors = (errors: DraftErrors) => Object.keys(errors).length > 0;

// Transforme un brouillon VALIDE en inspection définitive (sinon renvoie null)
export function toInspection(draft: InspectionDraft, createdAt: Date): Inspection | null {
  if (hasErrors(validateDraft(draft)) || !draft.category || !draft.riskLevel) {
    return null;
  }

  return {
    id: createdAt.getTime().toString(),
    vendorAlias: draft.vendorAlias.trim(),
    stallCode: normalizeStallCode(draft.stallCode),
    category: draft.category,
    contactNumber: normalizePhone(draft.contactNumber),
    riskLevel: draft.riskLevel,
    consent: draft.consent,
    imageUri: draft.imageUri,
    createdAt: createdAt.toISOString(),
  };
}