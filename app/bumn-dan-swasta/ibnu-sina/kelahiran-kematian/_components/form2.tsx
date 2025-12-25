"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BulanSelect } from "@/components/common/SelectBulan";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { BulanCheckboxSection } from "@/components/common/loading/BulanCheckboxSection";
import { InputForm } from "@/components/common/boilerplate/InputForm";
import { FormProvider, useForm } from "react-hook-form";
import {
  LanjutanKelahiranKematianForm,
  LanjutanKelahiranKematianSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "@/components/common/SelectInput";
import { bulan } from "@/constant/menu";
import { InputNumericField } from "@/components/common/boilerplate/InputField";

const URL = "/api/bumn-swasta/ibnu-sina/lanjutan-kelahiran-kematian";
export default function Form2() {
  const [open, setOpen] = useState(false);
  const { data: bulanSubmitted, loading, refetch } = useDataSubmitted(URL);
  const form = useForm<LanjutanKelahiranKematianForm>({
    resolver: zodResolver(LanjutanKelahiranKematianSchema),
    defaultValues: {
      bulan: "",
      hidup_laki_laki: 0,
      hidup_perempuan: 0,
      mati_laki_laki: 0,
      mati_perempuan: 0,
    },
  });

  const onSubmit = async (data: LanjutanKelahiranKematianForm) => {
    const payload = {
      bulan: data.bulan,
      hidup_laki_laki: data.hidup_laki_laki,
      hidup_perempuan: data.hidup_perempuan,
      mati_laki_laki: data.mati_laki_laki,
      mati_perempuan: data.mati_perempuan,
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
          <p className="text-sm capitalize">Lanjutan Tabel 4.2.18</p>
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

              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: "hidup_laki_laki" as const,
                    label: "Hidup Laki Laki" as const,
                  },
                  {
                    name: "hidup_perempuan" as const,
                    label: "Hidup Perempuan" as const,
                  },
                  {
                    name: "mati_laki_laki" as const,
                    label: "Mati Laki Laki" as const,
                  },
                  {
                    name: "mati_perempuan" as const,
                    label: "Mati Perempuan" as const,
                  },
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
