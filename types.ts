

export interface Option {
  value: string;
  label: string;
}

export type SectionType = 'radio' | 'checkbox';

export interface LayoutSettings {
  // Mise en page
  positionY: number; // Position Verticale (cm)
  positionX: number; // Position Horizontale (cm)
  textBlockWidth: number; // Largeur du bloc de texte (cm)
  // Texte
  fontFamily: 'Helvetica' | 'Times' | 'Courier'; // Police
  fontSize: number; // Taille (pt)
  fontWeight: number; // Épaisseur
  lineHeight: number; // Hauteur de ligne
  entrySpacing: number; // Espacement (pt)
  opacity: number; // Densité (0-100)
  // Impression étiquette
  labelWidth: number; // Largeur (cm)
  labelHeight: number; // Hauteur (cm)
}


export interface PainState {
  p: string[];
  q: string[];
  r: string[];
  site: string;
  s: string;
  t: string[];
  u: string[];
  medicament: string;
  interventionsNonPharma: string[];
}

export type PainFieldId = 'p' | 'q' | 'r' | 's' | 't' | 'u';

export interface PainField {
  id: PainFieldId;
  label: string;
  type: 'radio' | 'checkbox';
  options: Option[];
}

export interface MorseScaleState {
    history: number;
    secondaryDiagnosis: number;
    ambulatoryAid: number;
    ivTherapy: number;
    gait: number;
    mentalStatus: number;
}

export interface BradenScaleState {
    sensoryPerception: number;
    moisture: number;
    activity: number;
    mobility: number;
    nutrition: number;
    frictionAndShear: number;
}

export interface CIWAScaleState {
    nauseaVomiting: number;
    tremor: number;
    sweats: number;
    anxiety: number;
    agitation: number;
    tactile: number;
    auditory: number;
    visual: number;
    headache: number;
    orientation: number;
}

export interface FormState {
  quart: string;
  gender: string;
  // Admission fields
  admissionCheckboxes: string[];
  orientation: string[];
  autonomie: string;
  effetsPersonnels: string;
  accesVeineux: boolean;
  accesVeineux_gauge: string;
  accesVeineux_site: string;
  piccLine: boolean;
  piccLine_site: string;
  drains: string[];
  sondes: string[];
  // Other sections
  position: string[];
  etatEveil: string;
  signesVitaux: string;
  signesNeuro: string;
  respiratoire: string[];
  respiratoire_medicament: string;
  respiratoire_interventions: string[];
  respiratoire_o2_litres: string;
  digestif: string[];
  digestif_medicament: string;
  digestif_interventions: string[];
  urinaire: string[];
  urinaire_medicament: string;
  urinaire_interventions: string[];
  tegumentaire: string[];
  tegumentaire_medicament: string;
  tegumentaire_interventions: string[];
  geriatrie: string[];
  soinsPalliatifs: string[];
  soinsPalliatifs_autres: string;
  observations: string[];
  visites: string;
  particularites: string;
  douleur: PainState;
  morse: MorseScaleState;
  braden: BradenScaleState;
  ciwa: CIWAScaleState;
}

// Explicit type for section IDs to improve stability and prevent transpilation issues.
export type FormSectionId =
  | 'position'
  | 'etatEveil'
  | 'signesNeuro'
  | 'respiratoire'
  | 'signesVitaux'
  | 'digestif'
  | 'urinaire'
  | 'tegumentaire'
  | 'geriatrie'
  | 'soinsPalliatifs'
  | 'observations'
  | 'visites';

export interface SectionData {
  id: FormSectionId;
  title: string;
  type: SectionType;
  options: Option[];
  hasIntervention?: boolean;
  interventions?: Option[];
}

export interface NoteEntry {
  id: string;
  timestamp: string;
  content: string;
}

export interface PatientState {
  formState: FormState;
  noteEntries: NoteEntry[];
}

// Represents a saved template for a single patient state
export type SavedState = PatientState;