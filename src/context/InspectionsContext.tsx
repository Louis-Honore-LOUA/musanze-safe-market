import { createContext, ReactNode, useContext, useState } from 'react';
import { Inspection } from '../types';

type InspectionsContextValue = {
  inspections: Inspection[];
  addInspection: (inspection: Inspection) => void;
};

const InspectionsContext = createContext<InspectionsContextValue | undefined>(undefined);

export function InspectionsProvider({ children }: { children: ReactNode }) {
  const [inspections, setInspections] = useState<Inspection[]>([]);

  const addInspection = (inspection: Inspection) => {
    // On crée une NOUVELLE liste (on ne modifie jamais l'ancienne directement)
    setInspections((prev) => [inspection, ...prev]);
  };

  return (
    <InspectionsContext.Provider value={{ inspections, addInspection }}>
      {children}
    </InspectionsContext.Provider>
  );
}

// Hook personnalisé pour lire la mémoire depuis n'importe quel écran
export function useInspections() {
  const context = useContext(InspectionsContext);
  if (!context) {
    throw new Error('useInspections must be used inside InspectionsProvider');
  }
  return context;
}