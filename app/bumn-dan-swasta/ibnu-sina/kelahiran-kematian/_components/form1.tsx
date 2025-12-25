"use client";

import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { BulanCheckboxSection } from "@/components/common/loading/BulanCheckboxSection";
import { FormProvider, useForm } from "react-hook-form";
import { KelahiranKematianForm, KelahiranKematianSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "@/components/common/SelectInput";
import { bulan } from "@/constant/menu";
import { useState } from "react";
import { InputNumericField } from "@/components/common/boilerplate/InputField";
import { Button } from "@/components/ui/button";

const URL = "/api/bumn-swasta/ibnu-sina/kelahiran-kematian";

export default function Form1() {
  const [open, setOpen] = useState(false);
  const { data: bulanSubmitted, loading, refetch } = useDataSubmitted(URL);

  const form = useForm<KelahiranKematianForm>({
    resolver: zodResolver(KelahiranKematianSchema),
    defaultValues: {
      bulan: "",
      keguguran: 0,
      bersalin: 0,
    },
  });

  const onSubmit = async (data: KelahiranKematianForm) => {
    const payload = {
      bulan: data.bulan,
      keguguran: data.keguguran,
      bersalin: data.bersalin,
    };

    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    refetch();
    form.reset();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <BulanCheckboxSection loading={loading} data={bulanSubmitted} />
        <div className="space-y-4">
          <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
          <p className="text-sm capitalize">
            Tabel 4.2.18 Banyaknya Kelahiran, Lahir Hidup, Lahir Mati &
            Keguguran di RSI Ibnu Sina Simpang Empat
          </p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <SelectInput
                label="Bulan"
                name="bulan"
                valueSelect={bulan}
                form={form}
                open={open}
                setOpen={setOpen}
                submittedItem={bulanSubmitted}
              />

              {[
                { name: "bersalin" as const, label: "Bersalin" as const },
                { name: "keguguran" as const, label: "Keguguran" as const },
              ].map((field) => (
                <InputNumericField
                  key={field.name}
                  form={form}
                  name={field.name}
                  label={field.label}
                />
              ))}

              <Button type="submit" className="w-full">
                Simpan Data
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
