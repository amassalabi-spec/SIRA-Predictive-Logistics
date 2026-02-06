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
  "En transit": "text-blue-400",
  "Douane": "text-amber-400",
  "Retardé": "text-red-400",
};

interface ShipmentsTableProps {
  shipments: Shipment[];
  onShipmentSelect: (id: string) => void;
}

export function ShipmentsTable({ shipments, onShipmentSelect }: ShipmentsTableProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Suivi des Expéditions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-foreground/80">Marchandise</TableHead>
              <TableHead className="text-foreground/80">ID</TableHead>
              <TableHead className="text-foreground/80">Status</TableHead>
              <TableHead className="text-right text-foreground/80">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow 
                key={shipment.id}
                onClick={() => onShipmentSelect(shipment.id)}
                className="border-white/10 hover:bg-white/5 cursor-pointer"
              >
                <TableCell className="font-medium flex items-center gap-2">
                  <shipment.icon className="h-4 w-4 text-primary" />
                  {shipment.name}
                </TableCell>
                <TableCell className="text-foreground/80">{shipment.id}</TableCell>
                <TableCell>
                  <span className={cn("font-semibold", statusColors[shipment.tableStatus])}>
                    {shipment.tableStatus}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="bg-transparent border-primary/50 text-primary/80 hover:bg-primary/10 hover:text-primary">
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
