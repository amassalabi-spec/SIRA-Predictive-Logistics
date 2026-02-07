
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { ActiveShipment } from "@/components/dashboard/active-shipment";
import { WorkflowTimeline } from "@/components/dashboard/workflow-timeline";
import { ShipmentsTable } from "@/components/dashboard/shipments-table";
import { SurchargesWidget } from "@/components/dashboard/surcharges-widget";
import { CrisisRoomWidget } from "@/components/dashboard/crisis-room-widget";
import { SiraSearchBar } from "@/components/dashboard/sira-search-bar";
import { ClientSelector } from "@/components/dashboard/client-selector";
import { shipmentDetails as allShipmentData, workflowSteps } from "@/lib/dashboard-data";
import { clients } from "@/lib/clients-data";
import type { Shipment } from "@/lib/dashboard-data";

function formatMinutesToHours(minutes: number): string {
  if (isNaN(minutes)) return "N/A";
  if (minutes < 60) {
      return `${Math.round(minutes)}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export default function DashboardPage() {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SH-45892');
  const [selectedClientId, setSelectedClientId] = useState<string>('9901');

  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };

  const handleClientChange = (clientId: string) => {
    if (clientId) {
      setSelectedClientId(clientId);
    }
  };

  const selectedClient = clients.find(c => c.id === selectedClientId)!;
  const baseSelectedShipment = allShipmentData.find(s => s.id === selectedShipmentId)!;

  // Create a derived shipment object with calculated times
  const displayedShipment = {
      ...baseSelectedShipment,
      timeRemaining: formatMinutesToHours(baseSelectedShipment.baseTimeRemainingMinutes * selectedClient.timeMultiplier),
      totalTimeRemaining: `Prêt dans ${formatMinutesToHours(baseSelectedShipment.baseTotalTimeRemainingMinutes * selectedClient.timeMultiplier)}`,
  };

  const tableShipments = allShipmentData.filter(s => s.id !== selectedShipmentId);
  
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col pb-32">
      <Header />
      <main className="flex-1 space-y-8">
        <ClientSelector selectedClientId={selectedClientId} onClientChange={handleClientChange} />
        <div className="px-4 sm:px-6 lg:px-8 space-y-8">
            <ActiveShipment shipment={displayedShipment} />
            <WorkflowTimeline 
              key={`${selectedShipmentId}-${selectedClientId}`} // Reset timeline on change
              workflowSteps={workflowSteps}
              activeShipment={displayedShipment}
              clientTimeMultiplier={selectedClient.timeMultiplier}
            />
            <ShipmentsTable 
              shipments={tableShipments}
              onShipmentSelect={handleShipmentSelect}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SurchargesWidget 
                daysRemaining={displayedShipment.surcharges.daysRemaining}
                costPerDay={displayedShipment.surcharges.costPerDay}
              />
              <CrisisRoomWidget checklist={displayedShipment.checklist} />
            </div>
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
