import { createContext, ReactNode, useContext, useState } from 'react';
import { Inspection, InspectionDraft } from '../types';

const EMPTY_DRAFT: InspectionDraft = {
  vendorAlias: '',
  stallCode: '',
  category: null,
  contactNumber: '',
  riskLevel: null,
  consent: false,
  imageUri: null,
};

type InspectionsContextValue = {
  inspections: Inspection[];
  addInspection: (inspection: Inspection) => void;
  draft: InspectionDraft;
  updateDraft: <K extends keyof InspectionDraft>(field: K, value: InspectionDraft[K]) => void;
  resetDraft: () => void;
};

const InspectionsContext = createContext<InspectionsContextValue | undefined>(undefined);

export function InspectionsProvider({ children }: { children: ReactNode }) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [draft, setDraft] = useState<InspectionDraft>(EMPTY_DRAFT);

  const addInspection = (inspection: Inspection) => {
    setInspections((prev) => [inspection, ...prev]);
  };

  const updateDraft = <K extends keyof InspectionDraft>(field: K, value: InspectionDraft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const resetDraft = () => setDraft(EMPTY_DRAFT);

  return (
    <InspectionsContext.Provider
      value={{ inspections, addInspection, draft, updateDraft, resetDraft }}
    >
      {children}
    </InspectionsContext.Provider>
  );
}

export function useInspections() {
  const context = useContext(InspectionsContext);
  if (!context) {
    throw new Error('useInspections must be used inside InspectionsProvider');
  }
  return context;
}