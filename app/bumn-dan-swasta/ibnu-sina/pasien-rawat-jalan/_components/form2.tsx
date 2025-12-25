"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BulanSelect } from "@/components/common/SelectBulan";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { BulanCheckboxSection } from "@/components/common/loading/BulanCheckboxSection";
import { FormProvider, useForm } from "react-hook-form";
import {
  LanjutanIbnuSinaRawatJalanForm,
  LanjutanIbnuSinaRawatJalanSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputNumericField } from "@/components/common/boilerplate/InputField";
const URL = "/api/bumn-swasta/ibnu-sina/lanjutan-ibnu-sina-rawat-jalan";
export default function Form2() {
  const { data: bulanSubmitted, loading, refetch } = useDataSubmitted(URL);
  const [open, setOpen] = useState(false);

  const form = useForm<LanjutanIbnuSinaRawatJalanForm>({
    resolver: zodResolver(LanjutanIbnuSinaRawatJalanSchema),
    defaultValues: {
      bulan: "",
      fisioterapi: 0,
      jiwa: 0,
      mata: 0,
      penyakit_dalam: 0,
      tht: 0,
      neurologi: 0,
    },
  });

  const onSubmit = async (data: LanjutanIbnuSinaRawatJalanForm) => {
    const payload = {
      bulan: data.bulan,
      fisioterapi: data.fisioterapi,
      jiwa: data.jiwa,
      mata: data.mata,
      penyakit_dalam: data.penyakit_dalam,
      tht: data.tht,
      neurologi: data.neurologi,
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
          <p className="text-sm capitalize">Lanjutan Tabel 4.2.15</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <BulanSelect
                form={form}
                open={open}
                setOpen={setOpen}
                submittedItem={bulanSubmitted}
              />
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: "fisioterapi" as const,
                    label: "Fisioterapi" as const,
                  },
                  { name: "jiwa" as const, label: "Jiwa" as const },
                  { name: "mata" as const, label: "Mata" as const },
                  {
                    name: "penyakit_dalam" as const,
                    label: "Penyakit Dalam" as const,
                  },
                  { name: "tht" as const, label: "THT" as const },
                  { name: "neurologi" as const, label: "Neurologi" as const },
                ].map((field) => (
                  <InputNumericField
                    key={field.name}
                    form={form}
                    name={field.name}
                    label={field.label}
                  />
                ))}
              </div>

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
