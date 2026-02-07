
export type ClientProfile = {
  id: string;
  name: string;
  profileStatus: 'Fiable' | 'Nouveau' | 'Sous Surveillance';
  timeMultiplier: number;
};

export const clients: ClientProfile[] = [
  { id: '9901', name: 'Maroc Import Logistique', profileStatus: 'Fiable', timeMultiplier: 1.0 },
  { id: '4405', name: 'Global Trade Casa', profileStatus: 'Nouveau', timeMultiplier: 1.2 },
  { id: '2210', name: 'Fast Transit', profileStatus: 'Sous Surveillance', timeMultiplier: 1.5 },
];
