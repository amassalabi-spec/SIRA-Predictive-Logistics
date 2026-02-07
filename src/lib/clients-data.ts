
export type ClientProfile = {
  id: string;
  name: string;
  profileStatus: 'Fiable' | 'Nouveau' | 'Sous Surveillance';
  timeMultiplier: number;
  shipmentIds: string[];
};

export const clients: ClientProfile[] = [
  { 
    id: '9901', 
    name: 'Maroc Import Logistique', 
    profileStatus: 'Fiable', 
    timeMultiplier: 1.0,
    shipmentIds: ['SH-45892', 'SH-15873', 'SH-97254', 'SH-DOC-01']
  },
  { 
    id: '4405', 
    name: 'Global Trade Casa', 
    profileStatus: 'Nouveau', 
    timeMultiplier: 1.2,
    shipmentIds: ['SH-PARTS-01', 'SH-15873']
  },
  { 
    id: '2210', 
    name: 'Fast Transit', 
    profileStatus: 'Sous Surveillance', 
    timeMultiplier: 1.5,
    shipmentIds: ['SH-VAC-01', 'SH-CHEM-01']
  },
];
