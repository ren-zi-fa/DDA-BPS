"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Nagari = {
  nama: string;
  jorong: {
    nama: string;
  }[];
};
type Props = {
  value: string;
  nagariList: Nagari[];
  onChange: (val: string) => void;
  submittedItem?: string[];
};

export function NagariSelect({
  value,
  nagariList,
  submittedItem = [],
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  // Ambil semua nagari dari kecamatan Ranah Batahan

  return (
    <div>
      <Label className="my-3 block">Nagari</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {value || "Pilih nagari"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Cari nagari..." />
            <CommandEmpty>Tidak ditemukan.</CommandEmpty>

            <CommandGroup>
              {nagariList.map((nagari) => {
                const isSubmitted = submittedItem.includes(nagari.nama);

                return (
                  <CommandItem
                    key={nagari.nama}
                    value={nagari.nama}
                    disabled={isSubmitted}
                    onSelect={(val) => {
                      if (isSubmitted) return;
                      onChange(val);
                      setOpen(false);
                    }}
                    className={cn(
                      isSubmitted && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === nagari.nama ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {nagari.nama}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
