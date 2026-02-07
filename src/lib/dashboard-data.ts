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
  timeRemaining: string;
  totalTimeRemaining: string;
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
};

export const shipmentDetails: Shipment[] = [
  {
    id: "SH-45892",
    name: "Sucre roux de canne",
    hsCode: "1701.13",
    weight: "100 tonnes",
    vessel: "MS-PORT GAIA",
    timeRemaining: "15min",
    totalTimeRemaining: "Prêt dans 45min",
    currentStepDescription: "Analyse Labo ONSSA",
    controllingAuthority: "ONSSA - Contrôle Sanitaire",
    agencyShortName: "ONSSA",
    tableStatus: "En transit",
    icon: Package,
    activeWorkflowStepIndex: 4,
    surcharges: {
      daysRemaining: 7,
      costPerDay: "-5000 MAD / Jour",
    },
    checklist: [
      { text: "Prélèvement échantillon", status: "completed" },
      { text: "Analyse microbiologique", status: "action-required" },
      { text: "Certificat sanitaire", status: "pending" },
    ]
  },
  {
    id: "SH-97254",
    name: "Ordinateurs portables",
    hsCode: "8471.30",
    weight: "5 tonnes",
    vessel: "MSC FLAVIA",
    timeRemaining: "4h 20m",
    totalTimeRemaining: "Prêt dans 6h 45m",
    currentStepDescription: "Passage au Scanner",
    controllingAuthority: "Douane - Contrôle de Valeur",
    agencyShortName: "DOUANE",
    tableStatus: "Douane",
    icon: Laptop,
    activeWorkflowStepIndex: 2,
    surcharges: {
      daysRemaining: 4,
      costPerDay: "-8000 MAD / Jour",
    },
    checklist: [
      { text: "Scanner Rayons-X", status: "completed" },
      { text: "Inventaire Batteries", status: "action-required" },
      { text: "Taxation", status: "pending" },
    ]
  },
  {
    id: "SH-15873",
    name: "Huile moteur",
    hsCode: "2710.19",
    weight: "50 tonnes",
    vessel: "CMA CGM A. LINCOLN",
    timeRemaining: "1h 15m",
    totalTimeRemaining: "Prêt dans 3h 10m",
    currentStepDescription: "Vérification Conformité",
    controllingAuthority: "Ministère de l'Industrie et du Commerce",
    agencyShortName: "MCI/DOUANE",
    tableStatus: "Retardé",
    icon: Droplets,
    activeWorkflowStepIndex: 3,
    surcharges: {
      daysRemaining: 2,
      costPerDay: "-3500 MAD / Jour",
    },
    checklist: [
      { text: "Vérification viscosité", status: "completed" },
      { text: "Origine pétrolière", status: "action-required" },
      { text: "Mainlevée", status: "pending" },
    ]
  },
  {
    id: "SH-DOC-01",
    name: "Documents de transit",
    hsCode: "4901.99",
    weight: "1 kg",
    vessel: "N/A",
    timeRemaining: "18h 45m",
    totalTimeRemaining: "Prêt dans 26h 20m",
    currentStepDescription: "Validation Signature",
    controllingAuthority: "PortNet / Douane",
    agencyShortName: "PORTNET",
    tableStatus: "En transit",
    icon: FileText,
    activeWorkflowStepIndex: 1,
    surcharges: {
      daysRemaining: 5,
      costPerDay: "0 MAD / Jour",
    },
    checklist: [
      { text: "Vérification signature", status: "completed" },
      { text: "Cachet agent", status: "action-required" },
      { text: "Archivage", status: "pending" },
    ]
  },
];
