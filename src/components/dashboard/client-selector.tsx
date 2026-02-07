
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clients } from "@/lib/clients-data";
import { Building } from "lucide-react";

interface ClientSelectorProps {
  selectedClientId: string;
  onClientChange: (clientId: string) => void;
}

export function ClientSelector({ selectedClientId, onClientChange }: ClientSelectorProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <label htmlFor="client-selector" className="block text-sm font-medium text-foreground/80 mb-2">Profil Transitaire</label>
        <Select onValueChange={onClientChange} defaultValue={selectedClientId} name="client-selector">
            <SelectTrigger className="w-full sm:w-[350px] bg-white/5 border-white/10 text-left">
                <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-foreground/70" />
                    <SelectValue placeholder="Sélectionner un client..." />
                </div>
            </SelectTrigger>
            <SelectContent>
                {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                        <div className="flex flex-col">
                            <span className="font-semibold">{client.name} (#{client.id})</span>
                            <span className="text-xs text-foreground/70">{client.profileStatus} (Malus: +{((client.timeMultiplier - 1) * 100).toFixed(0)}%)</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
}
