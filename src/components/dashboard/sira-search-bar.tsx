"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Mic, Bot, Loader2 } from "lucide-react";
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
  const [state, formAction] = useFormState(
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (state.response || state.error) {
      setIsSubmitting(false);
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
  }, [state, toast]);
  
  const handleFormSubmit = (formData: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    formAction(formData);
  };

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setInputValue("");
      Object.assign(state, { response: undefined, error: undefined, query: undefined });
    }
  }

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 p-2 bg-background/90 backdrop-blur-md border-t border-white/10 z-50">
        <div className="container max-w-2xl mx-auto">
          <form action={handleFormSubmit} className="relative">
            <Input
              type="text"
              name="query"
              placeholder="Interroger SIRA..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-11 pl-12 pr-28 rounded-full bg-white/5 border-white/20 text-white placeholder:text-foreground/60 focus:ring-primary focus:ring-2"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mic className="h-5 w-5 text-foreground/60" />
            </div>
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || !inputValue}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Envoyer"}
              </Button>
            </div>
          </form>
        </div>
      </footer>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent side="bottom" className="bg-background/95 border-t-white/10 text-foreground max-h-[75vh] flex flex-col rounded-t-lg">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-3 text-2xl">
              <Bot className="text-primary h-7 w-7" />
              Réponse de SIRA
            </SheetTitle>
            {state.query && (
              <SheetDescription className="pt-2">
                Résultats pour : "{state.query}"
              </SheetDescription>
            )}
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4 text-base">
            {state.response && (
              <p className="whitespace-pre-wrap">{state.response.response}</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
