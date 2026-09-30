// Valeurs possibles, fixées à l'avance ("union types")
export type StallStatus = 'Inspected' | 'Pending' | 'Flagged';
export type Priority = 'High' | 'Medium' | 'Low';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type Category =
  | 'Produce'
  | 'Meat & Fish'
  | 'Grains'
  | 'Textiles'
  | 'Household'
  | 'Electronics';

// Un stand du marché (affiché dans le catalogue)
export interface MarketStall {
  id: string;
  name: string;
  zone: string;
  category: Category;
  status: StallStatus;
  priority: Priority;
}

// Une inspection enregistrée par l'agent
export interface Inspection {
  id: string;
  vendorAlias: string;
  stallCode: string;
  category: Category;
  contactNumber: string;
  riskLevel: RiskLevel;
  consent: boolean;
  imageUri: string | null; // null = pas encore de photo
  createdAt: string;       // date au format ISO
}
// Le brouillon du formulaire : les choix peuvent être encore vides (null)
export interface InspectionDraft {
  vendorAlias: string;
  stallCode: string;
  category: Category | null;
  contactNumber: string;
  riskLevel: RiskLevel | null;
  consent: boolean;
  imageUri: string | null;
}

// Un message d'erreur possible par champ
export type DraftErrors = Partial<Record<keyof InspectionDraft, string>>;