"use client";

import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { wilayah } from "@/constant/data";
import { useState } from "react";
import { FieldValues, useFieldArray, UseFormReturn } from "react-hook-form";

interface FieldProps<T extends FieldValues = any> {
  nama_kec: string;
  form: UseFormReturn<T>;
}
export default function NagariField({ nama_kec, form }: FieldProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nagari",
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const kecamatanTerpilih = nama_kec.toLocaleUpperCase();

  const nagariOptions =
    wilayah
      .find((w) => w.kecamatan === kecamatanTerpilih)
      ?.nagari.map((n) => n.nama) ?? [];
  return (
    <>
      <section>
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Informasi Nama dan Kepala Nagari {nama_kec}
        </h2>
        <div className="grid grid-cols-1 gap-2 ">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2 border p-4 ">
              <FormField
                control={form.control}
                name={`nagari.${index}.nama_nagari`}
                render={({ field }) => {
                  const filtered = nagariOptions.filter((item) =>
                    item
                      .toLowerCase()
                      .includes((field.value ?? "").toLowerCase())
                  );
             
                  return (
                    <>
                      .
                      <h1 className="font-bold text-orange-600">
                        {index + 1}{" "}
                      </h1>
                      <FormItem className="relative border-t pt-2 ">
                        <FormLabel>Nama Nagari</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setOpenIndex(index);
                            }}
                            onFocus={() => setOpenIndex(index)}
                            onBlur={() =>
                              setTimeout(() => setOpenIndex(null), 100)
                            }
                          />
                        </FormControl>

                        {openIndex === index && filtered.length > 0 && (
                          <ul className="absolute left-0 right-0 top-full mt-1 z-20 rounded-md border bg-white shadow-md max-h-40 overflow-y-auto">
                            {filtered.map((item) => (
                              <li
                                key={item}
                                onMouseDown={() => {
                                  field.onChange(item);
                                  setOpenIndex(null);
                                }}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        <FormMessage />
                      </FormItem>
                    </>
                  );
                }}
              />

              <FormField
                control={form.control}
                name={`nagari.${index}.kepala_nagari`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kepala Nagari</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Hapus
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="bg-blue-600 hover:bg-blue-500 hover:text-white text-white"
            onClick={() =>
              append({
                nama_nagari: "",
                kepala_nagari: "",
              })
            }
          >
            + Tambah Nagari
          </Button>
        </div>
        {/* end nagari */}
      </section>
    </>
  );
}
