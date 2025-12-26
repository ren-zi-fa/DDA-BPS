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
import { FieldValues, useFieldArray, UseFormReturn } from "react-hook-form";

interface FieldProps<T extends FieldValues = any> {
  nama_kec: string;
  form: UseFormReturn<T>;
}
export default function PasarField({ nama_kec, form }: FieldProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pasar",
  });
  return (
    <>
      <section>
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Informasi Pasar {nama_kec}
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2 border p-4 ">
              <FormField
                control={form.control}
                name={`pasar.${index}.nama`}
                render={({ field }) => (
                  <>
                    <h1>{index + 1} </h1>
                    <FormItem className="border-t pt-2">
                      <FormLabel>Nama Pasar</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name={`pasar.${index}.hari`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari Pasar</FormLabel>
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
            className="hover:text-white bg-purple-600 hover:bg-purple-500 text-white"
            onClick={() =>
              append({
                nama: "",
                hari: "",
              })
            }
          >
            + Tambah Pasar
          </Button>
        </div>
      </section>
    </>
  );
}
