"use client";

import { Dispatch, SetStateAction } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import { bulan } from "@/constant/menu";
import { FieldValues, UseFormReturn } from "react-hook-form";
type Props<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submittedItem: string[];
};

export function BulanSelect({ open, setOpen, form, submittedItem }: Props) {
  return (
    <FormField
      control={form.control}
      name="bulan"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bulan</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {field.value || "Pilih Bulan"}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari Bulan..." />
                <CommandEmpty>Tidak ditemukan</CommandEmpty>
                <CommandGroup>
                  {bulan.map((bln) => {
                    const disabled = submittedItem.includes(bln.label);
                    return (
                      <CommandItem
                        key={bln.key}
                        value={bln.label}
                        disabled={disabled}
                        onSelect={() => {
                          if (disabled) return;
                          field.onChange(bln.label);
                          setOpen(false);
                        }}
                        className={cn(
                          disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {disabled ? (
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <X
                            className={cn(
                              "mr-2 h-4 w-4",
                              form.getValues().kecamatan === bln.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        )}
                        {bln.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
