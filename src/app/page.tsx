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

export default function DashboardPage() {
  const [shipments] = useState<Shipment[]>(allShipmentData);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SH-45892');

  const selectedShipment = shipments.find(s => s.id === selectedShipmentId)!;

  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };

  const tableShipments = shipments.filter(s => s.id !== selectedShipmentId);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 pb-32">
        <ActiveShipment shipment={selectedShipment} />
        <WorkflowTimeline 
          workflowSteps={workflowSteps}
          activeShipment={selectedShipment}
        />
        <ShipmentsTable 
          shipments={tableShipments}
          onShipmentSelect={handleShipmentSelect}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SurchargesWidget 
            daysRemaining={selectedShipment.surcharges.daysRemaining}
            costPerDay={selectedShipment.surcharges.costPerDay}
          />
          <CrisisRoomWidget 
            alert={selectedShipment.crisis.alert}
          />
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
