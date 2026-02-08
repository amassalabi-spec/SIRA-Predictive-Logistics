import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Shipment } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const statusColors: Record<Shipment["tableStatus"], string> = {
  "En transit": "text-blue-600 bg-blue-50",
  "Douane": "text-amber-600 bg-amber-50",
  "Retardé": "text-red-600 bg-red-50",
};

interface ShipmentsTableProps {
  shipments: Shipment[];
  onShipmentSelect: (id: string) => void;
  selectedShipmentId: string;
}

export function ShipmentsTable({ shipments, onShipmentSelect, selectedShipmentId }: ShipmentsTableProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border-slate-200/60">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Suivi des Expéditions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-slate-100 hover:bg-transparent">
              <TableHead className="text-slate-500">Marchandise</TableHead>
              <TableHead className="text-slate-500">ID</TableHead>
              <TableHead className="text-slate-500">Status</TableHead>
              <TableHead className="text-right text-slate-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow 
                key={shipment.id}
                onClick={() => onShipmentSelect(shipment.id)}
                className={cn(
                  "border-b-slate-100 last:border-b-0 hover:bg-blue-50/50 cursor-pointer",
                  shipment.id === selectedShipmentId && "bg-blue-50/80"
                )}
              >
                <TableCell className={cn(
                  "font-medium text-slate-800 flex items-center gap-3 py-4 transition-all duration-300",
                  shipment.id === selectedShipmentId && "border-l-4 border-blue-600"
                )}>
                  <shipment.icon className="h-5 w-5 text-blue-600" />
                  {shipment.name}
                </TableCell>
                <TableCell className="text-slate-500">{shipment.id}</TableCell>
                <TableCell>
                  <span className={cn(
                    "font-semibold text-xs py-1 px-2 rounded-full",
                    statusColors[shipment.tableStatus])
                  }>
                    {shipment.tableStatus}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/50">
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
