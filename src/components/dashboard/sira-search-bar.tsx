"use client";

import { useState, useEffect, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Mic, Bot, Loader2, Sparkles } from "lucide-react";
import { askSira } from "@/ai/flows/sira-query-flow";
import type { SiraQueryOutput } from "@/ai/schemas/sira-query-schema";
import { useToast } from "@/hooks/use-toast";

const initialState: {
  response?: SiraQueryOutput;
  error?: string;
  query?: string;
} = {};

export function SiraSearchBar() {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const query = formData.get("query") as string;
      if (!query) return { ...prevState };
      
      try {
        const response = await askSira({ query });
        return { response, query };
      } catch (e: any) {
        return { ...prevState, error: e.message || "Failed to get response from SIRA.", query };
      }
    },
    initialState
  );

  const [inputValue, setInputValue] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  useEffect(() => {
    if (!isPending && (state.response || state.error)) {
      if (state.response) {
        setIsSheetOpen(true);
      }
      if (state.error) {
        toast({
          variant: "destructive",
          title: "SIRA Error",
          description: state.error,
        });
      }
    }
  }, [state, isPending, toast]);

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setInputValue("");
      Object.assign(state, { response: undefined, error: undefined, query: undefined });
    }
  }

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 p-2 bg-slate-100/80 backdrop-blur-md border-t border-slate-200 z-50">
        <div className="container max-w-2xl mx-auto">
          <form action={formAction} className="relative">
            <Input
              type="text"
              name="query"
              placeholder="Interroger SIRA..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending}
              className="w-full h-12 pl-12 pr-28 rounded-full bg-white shadow-sm border-slate-300 text-slate-800 placeholder:text-slate-500 focus:ring-blue-500 focus:ring-2"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-slate-500" />
            </div>
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <Button
                type="submit"
                size="lg"
                disabled={isPending || !inputValue}
                className="rounded-full bg-blue-600 text-white hover:bg-blue-700 h-9"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Envoyer"}
              </Button>
            </div>
          </form>
        </div>
      </footer>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent side="bottom" className="bg-white/95 backdrop-blur-lg border-t-slate-200 text-slate-800 max-h-[75vh] flex flex-col rounded-t-lg">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-3 text-2xl text-slate-900">
              <Bot className="text-blue-600 h-7 w-7" />
              Réponse de SIRA
            </SheetTitle>
            {state.query && (
              <SheetDescription className="pt-2 text-slate-600">
                Résultats pour : "{state.query}"
              </SheetDescription>
            )}
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4 text-base">
            {state.response && (
              <p className="whitespace-pre-wrap text-slate-700">{state.response.response}</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
