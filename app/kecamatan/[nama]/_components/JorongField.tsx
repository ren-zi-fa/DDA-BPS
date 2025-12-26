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
export default function JorongField({ nama_kec, form }: FieldProps) {
  const {
    fields: jorongFileds,
    append: appendJorong,
    remove: removeJorong,
  } = useFieldArray({
    control: form.control,
    name: "jorong",
  });
  return (
    <>
      <section>
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Informasi Nama dan Kepala Jorong {nama_kec}
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {jorongFileds.map((item, index) => (
            <div key={item.id} className="space-y-2 border p-4 ">
              <FormField
                control={form.control}
                name={`jorong.${index}.nama_jorong`}
                render={({ field }) => (
                  <>
                    <h1>{index + 1} </h1>
                    <FormItem className="border-t pt-2">
                      <FormLabel>Nama Jorong</FormLabel>
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
                name={`jorong.${index}.kepala_jorong`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kepala Jorong</FormLabel>
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
                onClick={() => removeJorong(index)}
              >
                Hapus
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="hover:text-white bg-green-600 hover:bg-green-500 text-white"
            onClick={() =>
              appendJorong({
                nama_jorong: "",
                kepala_jorong: "",
              })
            }
          >
            + Tambah Jorong
          </Button>
        </div>
      </section>
    </>
  );
}
