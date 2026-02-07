import { Package, Anchor, Ship, Download, Warehouse, Truck, CheckCircle, Search, Droplets, Laptop, FileText, LucideIcon } from 'lucide-react';

export type WorkflowStep = {
    name: string;
    icon: LucideIcon;
};

export const workflowSteps = [
  { name: "En rade", icon: Anchor },
  { name: "A quai", icon: Ship },
  { name: "Décharge", icon: Download },
  { name: "Stockage", icon: Warehouse },
  { name: "Contrôle (IA/Douane)", icon: Search },
  { name: "Enlèvement", icon: Truck },
  { name: "Sortie", icon: CheckCircle },
] as const;

export type ChecklistItem = {
  text: string;
  status: 'completed' | 'action-required' | 'pending';
};

export type Shipment = {
  id: string;
  name: string;
  hsCode: string;
  weight: string;
  vessel: string;
  baseTimeRemainingMinutes: number;
  baseTotalTimeRemainingMinutes: number;
  currentStepDescription: string;
  controllingAuthority: string;
  agencyShortName: string;
  tableStatus: "En transit" | "Douane" | "Retardé";
  icon: LucideIcon;
  activeWorkflowStepIndex: number;
  surcharges: {
    daysRemaining: number;
    costPerDay: string;
  };
  checklist: readonly ChecklistItem[];
  fallbackPredictionHours: number;
};

// Data re-ordered for logical progression
export const shipmentDetails: Shipment[] = [
  {
    id: "SH-45892",
    name: "Sucre roux de canne",
    hsCode: "1701.13",
    weight: "100 tonnes",
    vessel: "MS-PORT GAIA",
    baseTimeRemainingMinutes: 1125, // 18h 45m
    baseTotalTimeRemainingMinutes: 1580, // 26h 20m
    currentStepDescription: "Analyse Labo ONSSA",
    controllingAuthority: "Office National de Sécurité Sanitaire des Produits Alimentaires",
    agencyShortName: "ONSSA",
    tableStatus: "En transit",
    icon: Package,
    activeWorkflowStepIndex: 1,
    surcharges: {
      daysRemaining: 7,
      costPerDay: "-5000 MAD / Jour",
    },
    checklist: [
      { text: "Prélèvement échantillon", status: 'completed' },
      { text: "Analyse microbiologique", status: 'action-required' },
      { text: "Certificat sanitaire", status: 'pending' },
    ],
    fallbackPredictionHours: 14,
  },
  {
    id: "SH-15873",
    name: "Huile moteur",
    hsCode: "2710.19",
    weight: "50 tonnes",
    vessel: "CMA CGM A. LINCOLN",
    baseTimeRemainingMinutes: 260, // 4h 20m
    baseTotalTimeRemainingMinutes: 405, // 6h 45m
    currentStepDescription: "Vérification Conformité",
    controllingAuthority: "Ministère du Commerce et de l'Industrie",
    agencyShortName: "DOUANE",
    tableStatus: "En transit",
    icon: Droplets,
    activeWorkflowStepIndex: 3,
    surcharges: {
      daysRemaining: 4,
      costPerDay: "-3500 MAD / Jour",
    },
    checklist: [
        { text: "Vérification viscosité", status: 'completed' },
        { text: "Origine pétrolière", status: 'action-required' },
        { text: "Mainlevée", status: 'pending' },
    ],
    fallbackPredictionHours: 6.75,
  },
    {
    id: "SH-97254",
    name: "Ordinateurs portables",
    hsCode: "8471.30",
    weight: "5 tonnes",
    vessel: "MSC FLAVIA",
    baseTimeRemainingMinutes: 75, // 1h 15m
    baseTotalTimeRemainingMinutes: 190, // 3h 10m
    currentStepDescription: "Passage au Scanner",
    controllingAuthority: "Douane - Contrôle de Valeur",
    agencyShortName: "DOUANE",
    tableStatus: "Douane",
    icon: Laptop,
    activeWorkflowStepIndex: 4,
    surcharges: {
      daysRemaining: 5,
      costPerDay: "-8000 MAD / Jour",
    },
    checklist: [
        { text: "Scanner Rayons-X", status: 'completed' },
        { text: "Inventaire Batteries", status: 'action-required' },
        { text: "Taxation", status: 'pending' },
    ],
    fallbackPredictionHours: 3,
  },
  {
    id: "SH-DOC-01",
    name: "Documents de transit",
    hsCode: "4901.99",
    weight: "1 kg",
    vessel: "N/A",
    baseTimeRemainingMinutes: 15, // 15min
    baseTotalTimeRemainingMinutes: 45, // 45min
    currentStepDescription: "Validation Signature",
    controllingAuthority: "PortNet",
    agencyShortName: "AGENT",
    tableStatus: "En transit",
    icon: FileText,
    activeWorkflowStepIndex: 5,
    surcharges: {
      daysRemaining: 1,
      costPerDay: "0 MAD / Jour",
    },
    checklist: [
        { text: "Vérification signature", status: 'completed' },
        { text: "Cachet agent", status: 'action-required' },
        { text: "Archivage", status: 'pending' },
    ],
    fallbackPredictionHours: 0.75,
  },
];
