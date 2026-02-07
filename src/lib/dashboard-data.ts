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

// Data re-ordered for logical progression
export const shipmentDetails: Shipment[] = [
  {
    id: "SH-45892",
    name: "Sucre roux de canne",
    hsCode: "1701.13",
    weight: "100 tonnes",
    vessel: "MS-PORT GAIA",
    timeRemaining: "18h 45m",
    totalTimeRemaining: "Prêt dans 26h 20m", // Longest time
    currentStepDescription: "Mise à quai",
    controllingAuthority: "Capitainerie",
    agencyShortName: "PORT",
    tableStatus: "En transit",
    icon: Package,
    activeWorkflowStepIndex: 1, // Earliest stage
    surcharges: {
      daysRemaining: 7, // Max days
      costPerDay: "-5000 MAD / Jour",
    },
    checklist: [
      { text: "Documents PortNet validés", status: "completed" },
      { text: "Plan de déchargement", status: "action-required" },
      { text: "Inspection coque", status: "pending" },
    ]
  },
  {
    id: "SH-15873",
    name: "Huile moteur",
    hsCode: "2710.19",
    weight: "50 tonnes",
    vessel: "CMA CGM A. LINCOLN",
    timeRemaining: "4h 20m",
    totalTimeRemaining: "Prêt dans 6h 45m",
    currentStepDescription: "Mise en Stockage",
    controllingAuthority: "Opérateur Terminal",
    agencyShortName: "TERMINAL",
    tableStatus: "En transit",
    icon: Droplets,
    activeWorkflowStepIndex: 3, // Mid stage
    surcharges: {
      daysRemaining: 4,
      costPerDay: "-3500 MAD / Jour",
    },
    checklist: [
      { text: "Vérification viscosité", status: "completed" },
      { text: "Origine pétrolière", status: "action-required" },
      { text: "Mainlevée", status: "pending" },
    ]
  },
    {
    id: "SH-97254",
    name: "Ordinateurs portables",
    hsCode: "8471.30",
    weight: "5 tonnes",
    vessel: "MSC FLAVIA",
    timeRemaining: "1h 15m",
    totalTimeRemaining: "Prêt dans 3h 10m",
    currentStepDescription: "Passage au Scanner",
    controllingAuthority: "Douane - Contrôle de Valeur",
    agencyShortName: "DOUANE",
    tableStatus: "Douane",
    icon: Laptop,
    activeWorkflowStepIndex: 4, // Late-mid stage
    surcharges: {
      daysRemaining: 2, // Fewer days
      costPerDay: "-8000 MAD / Jour",
    },
    checklist: [
      { text: "Scanner Rayons-X", status: "completed" },
      { text: "Inventaire Batteries", status: "action-required" },
      { text: "Taxation", status: "pending" },
    ]
  },
  {
    id: "SH-DOC-01",
    name: "Documents de transit",
    hsCode: "4901.99",
    weight: "1 kg",
    vessel: "N/A",
    timeRemaining: "15min",
    totalTimeRemaining: "Prêt dans 45min", // Shortest time
    currentStepDescription: "Prêt pour enlèvement",
    controllingAuthority: "Agent Maritime",
    agencyShortName: "AGENT",
    tableStatus: "En transit",
    icon: FileText,
    activeWorkflowStepIndex: 5, // Latest stage
    surcharges: {
      daysRemaining: 1, // Almost expired
      costPerDay: "0 MAD / Jour",
    },
    checklist: [
      { text: "Vérification signature", status: "completed" },
      { text: "Cachet agent", status: "completed" },
      { text: "Archivage", status: "action-required" },
    ]
  },
];
