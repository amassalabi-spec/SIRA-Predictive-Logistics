import { Header } from "@/components/dashboard/header";
import { ActiveShipment } from "@/components/dashboard/active-shipment";
import { WorkflowTimeline } from "@/components/dashboard/workflow-timeline";
import { ShipmentsTable } from "@/components/dashboard/shipments-table";
import { SurchargesWidget } from "@/components/dashboard/surcharges-widget";
import { CrisisRoomWidget } from "@/components/dashboard/crisis-room-widget";
import { SiraSearchBar } from "@/components/dashboard/sira-search-bar";

export default function DashboardPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ActiveShipment />
          </div>
          <div className="lg:col-span-2">
            <WorkflowTimeline />
          </div>
        </div>
        
        <ShipmentsTable />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SurchargesWidget />
          <CrisisRoomWidget />
        </div>
      </main>
      <SiraSearchBar />
    </div>
  );
}
