
"use client";

import { useState, useEffect } from "react";
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
  const [selectedClientId, setSelectedClientId] = useState<string>('9901');

  const availableShipments = allShipmentData.filter(shipment => 
    clients.find(c => c.id === selectedClientId)?.shipmentIds.includes(shipment.id)
  );

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(availableShipments[0].id);

  const handleClientChange = (clientId: string) => {
    if (clientId) {
      setSelectedClientId(clientId);
      const newAvailableShipments = allShipmentData.filter(shipment => 
        clients.find(c => c.id === clientId)?.shipmentIds.includes(shipment.id)
      );
      if (newAvailableShipments.length > 0) {
        setSelectedShipmentId(newAvailableShipments[0].id);
      } else {
        setSelectedShipmentId('');
      }
    }
  };

  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };
  
  useEffect(() => {
    const currentAvailableShipments = allShipmentData.filter(shipment => 
      clients.find(c => c.id === selectedClientId)?.shipmentIds.includes(shipment.id)
    );
    if (!currentAvailableShipments.some(s => s.id === selectedShipmentId)) {
      setSelectedShipmentId(currentAvailableShipments[0]?.id || '');
    }
  }, [selectedClientId, selectedShipmentId]);


  const selectedClient = clients.find(c => c.id === selectedClientId)!;
  
  const baseSelectedShipment = 
    availableShipments.find(s => s.id === selectedShipmentId) || availableShipments[0];

  if (!baseSelectedShipment) {
    return (
      <div className="bg-slate-50 text-slate-700 min-h-screen flex flex-col">
        <Header clientName={selectedClient?.name ?? 'No Client'}/>
        <main className="flex-1 container mx-auto py-8">
          <ClientSelector selectedClientId={selectedClientId} onClientChange={handleClientChange} />
          <div className="text-center bg-white rounded-xl shadow-sm p-12 mt-8">
            <h2 className="text-xl font-semibold text-slate-800">Aucune expédition en cours</h2>
            <p className="mt-2 text-slate-500">Ce client n'a pas d'expéditions en cours de suivi.</p>
          </div>
        </main>
        <SiraSearchBar />
      </div>
    )
  }

  const displayedShipment = {
      ...baseSelectedShipment,
      timeRemaining: formatMinutesToHours(baseSelectedShipment.baseTimeRemainingMinutes * selectedClient.timeMultiplier),
      totalTimeRemaining: `Prêt dans ${formatMinutesToHours(baseSelectedShipment.baseTotalTimeRemainingMinutes * selectedClient.timeMultiplier)}`,
  };

  const tableShipments = availableShipments.filter(s => s.id !== selectedShipmentId);
  
  return (
    <div className="bg-slate-50 text-slate-700 min-h-screen flex flex-col pb-32">
      <Header clientName={selectedClient.name}/>
      <main className="flex-1 container mx-auto py-8 space-y-6">
        <ClientSelector selectedClientId={selectedClientId} onClientChange={handleClientChange} />
        <div className="space-y-6">
            <ActiveShipment shipment={displayedShipment} />
            <WorkflowTimeline 
              key={`${selectedShipmentId}-${selectedClientId}`}
              workflowSteps={workflowSteps}
              activeShipment={displayedShipment}
              clientTimeMultiplier={selectedClient.timeMultiplier}
            />
            <ShipmentsTable 
              shipments={availableShipments}
              onShipmentSelect={handleShipmentSelect}
              selectedShipmentId={selectedShipmentId}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <SurchargesWidget 
                  daysRemaining={displayedShipment.surcharges.daysRemaining}
                  costPerDay={displayedShipment.surcharges.costPerDay}
                />
              </div>
              <div className="lg:col-span-2">
                <CrisisRoomWidget checklist={displayedShipment.checklist} />
              </div>
            </div>
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
