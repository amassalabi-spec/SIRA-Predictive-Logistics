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
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(
    allShipmentData.find(s => s.id === 'SH-45892')!
  );

  const handleShipmentSelect = (shipmentId: string) => {
    const newSelectedShipment = allShipmentData.find(s => s.id === shipmentId)!;
    setSelectedShipment(newSelectedShipment);
  };

  const tableShipments = allShipmentData.filter(s => s.id !== selectedShipment.id);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col pb-32">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
        <ActiveShipment shipment={selectedShipment} />
        <WorkflowTimeline 
          key={selectedShipment.id}
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
