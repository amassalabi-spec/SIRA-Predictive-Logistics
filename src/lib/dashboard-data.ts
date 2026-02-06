import { Package, Anchor, Ship, Download, Warehouse, Truck, CheckCircle, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const activeShipment = {
  name: "Sucre Roux",
  weight: "100 tonnes",
  vessel: "MS-PORT GAIA",
  timeRemaining: "16h 20m",
};

export const workflowSteps = [
  { name: "En rade", icon: Anchor, status: "completed" },
  { name: "A quai", icon: Ship, status: "completed" },
  { name: "Décharge", icon: Download, status: "completed" },
  { name: "Stockage", icon: Warehouse, status: "completed" },
  { name: "Contrôle (IA/Douane)", icon: Search, status: "active" },
  { name: "Enlèvement", icon: Truck, status: "pending" },
  { name: "Sortie", icon: CheckCircle, status: "pending" },
] as const;

export type Shipment = {
  type: string;
  id: string;
  status: "En transit" | "Douane" | "Retardé";
  icon: LucideIcon;
};

export const shipments: Shipment[] = [
  { type: "Documents", id: "SH-64831", status: "En transit", icon: Package },
  { type: "Ordinateur", id: "SH-97254", status: "Douane", icon: Package },
  { type: "Produits chimiques", id: "SH-15873", status: "Retardé", icon: Package },
];

export const crisisData = {
  title: "Crisis Room",
  alert: "Écart de poids constaté sur le conteneur #C-745-120",
  actions: [
    "Informer le transitaire",
    "Rédiger une lettre à la douane"
  ]
};

export const surchargesData = {
    title: "Surestaries",
    daysRemaining: 2,
    costPerDay: "5000 XOF / Jour",
    action: "Prioriser avec l'agent SIRA"
};
