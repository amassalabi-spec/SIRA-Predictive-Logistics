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
  const [shipments, setShipments] = useState<Shipment[]>(allShipmentData);
  const [activeShipmentId, setActiveShipmentId] = useState<string>("SH-45892");

  const handleShipmentSelect = (shipmentId: string) => {
    setActiveShipmentId(shipmentId);
  };

  const activeShipment = shipments.find(s => s.id === activeShipmentId)!;
  const tableShipments = shipments.filter(s => s.id !== activeShipmentId);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 pb-32">
        <ActiveShipment shipment={activeShipment} />
        <WorkflowTimeline 
          workflowSteps={workflowSteps}
          activeShipment={activeShipment}
        />
        <ShipmentsTable 
          shipments={tableShipments}
          onShipmentSelect={handleShipmentSelect}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SurchargesWidget 
            daysRemaining={activeShipment.surcharges.daysRemaining}
            costPerDay={activeShipment.surcharges.costPerDay}
          />
          <CrisisRoomWidget 
            alert={activeShipment.crisis.alert}
          />
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
