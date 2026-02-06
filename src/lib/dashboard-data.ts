import { Package, Anchor, Ship, Download, Warehouse, Truck, CheckCircle, Search, Send, FileText, LucideIcon } from 'lucide-react';

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

export type Shipment = {
  id: string;
  name: string;
  hsCode: string;
  weight: string;
  vessel: string;
  timeRemaining: string;
  controllingAuthority: string;
  tableStatus: "En transit" | "Douane" | "Retardé";
  icon: LucideIcon;
  activeWorkflowStepIndex: number;
};

export const shipmentDetails: Shipment[] = [
  {
    id: "SH-45892",
    name: "Sucre roux de canne",
    hsCode: "1701.13",
    weight: "100 tonnes",
    vessel: "MS-PORT GAIA",
    timeRemaining: "16h 20m",
    controllingAuthority: "ONSSA - Contrôle Sanitaire",
    tableStatus: "En transit",
    icon: Package,
    activeWorkflowStepIndex: 4,
  },
  {
    id: "SH-97254",
    name: "Ordinateurs portables",
    hsCode: "8471.30",
    weight: "5 tonnes",
    vessel: "MSC FLAVIA",
    timeRemaining: "2h 15m",
    controllingAuthority: "Douane - Contrôle de Valeur",
    tableStatus: "Douane",
    icon: Package,
    activeWorkflowStepIndex: 2,
  },
  {
    id: "SH-15873",
    name: "Huiles moteur",
    hsCode: "2710.19",
    weight: "20 tonnes",
    vessel: "CMA CGM A. LINCOLN",
    timeRemaining: "48h 05m",
    controllingAuthority: "Ministère de l'Énergie",
    tableStatus: "Retardé",
    icon: Package,
    activeWorkflowStepIndex: 3,
  },
];


export const crisisData = {
  title: "Crisis Room",
  alert: "Écart de poids constaté sur le conteneur #C-745-120",
  actions: [
    {
      title: "Informer le transitaire",
      description: "Envoyer une notification immédiate",
      icon: Send,
    },
    {
      title: "Rédiger une lettre à la douane",
      description: "Préparer le document officiel",
      icon: FileText,
    },
  ]
};

export const surchargesData = {
    title: "Surestaries",
    daysRemaining: 2,
    costPerDay: "-2000 MAD / Jour",
    action: "Prioriser avec l'agent SIRA"
};
