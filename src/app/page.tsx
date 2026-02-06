"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { ActiveShipment } from "@/components/dashboard/active-shipment";
import { WorkflowTimeline } from "@/components/dashboard/workflow-timeline";
import { ShipmentsTable } from "@/components/dashboard/shipments-table";
import { SurchargesWidget } from "@/components/dashboard/surcharges-widget";
import { CrisisRoomWidget } from "@/components/dashboard/crisis-room-widget";
import { SiraSearchBar } from "@/components/dashboard/sira-search-bar";
import { shipmentDetails as allShipmentData, workflowSteps } from "@/lib/dashboard-data";
import type { Shipment } from "@/lib/dashboard-data";

const marchandiseData = {
  '1701.13': { t: '14h 20m', j: 2, c: "Analyse d'humidité requise", cost: '-5000 MAD / Jour' },
  '2710.19': { t: '6h 45m', j: 4, c: 'Non-conformité des hydrocarbures', cost: '-3500 MAD / Jour' },
  '8471.30': { t: '3h 10m', j: 5, c: 'Batteries Lithium non déclarées', cost: '-8000 MAD / Jour' },
  '3002.20': { t: '1h 15m', j: 7, c: 'Alerte Chaîne du Froid', cost: '-12000 MAD / Jour' }
};

export default function DashboardPage() {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SH-45892');

  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };
  
  const selectedShipment = allShipmentData.find(s => s.id === selectedShipmentId)!;
  const dynamicData = marchandiseData[selectedShipment.hsCode as keyof typeof marchandiseData];

  const tableShipments = allShipmentData.filter(s => s.id !== selectedShipmentId);
  
  const displayShipment: Shipment = {
      ...selectedShipment,
      timeRemaining: dynamicData.t,
      surcharges: {
          daysRemaining: dynamicData.j,
          costPerDay: dynamicData.cost,
      },
      crisis: {
          alert: dynamicData.c,
      }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col pb-32">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
        <ActiveShipment shipment={displayShipment} />
        <WorkflowTimeline 
          key={displayShipment.id}
          workflowSteps={workflowSteps}
          activeShipment={displayShipment}
        />
        <ShipmentsTable 
          shipments={tableShipments}
          onShipmentSelect={handleShipmentSelect}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SurchargesWidget 
            daysRemaining={displayShipment.surcharges.daysRemaining}
            costPerDay={displayShipment.surcharges.costPerDay}
          />
          <CrisisRoomWidget 
            alert={displayShipment.crisis.alert}
          />
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
