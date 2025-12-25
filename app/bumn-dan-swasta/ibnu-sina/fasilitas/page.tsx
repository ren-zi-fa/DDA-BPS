"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { FasilitasCheckboxSection } from "@/components/common/loading/FasilitasCheckBoxSection";
import { FasilitasSelect } from "@/components/common/SelectFasilitas";
import { FasilitasIbnuSinaForm, FasilitasIbnuSinaSchema } from "@/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputNumericField } from "@/components/common/boilerplate/InputField";

const URL = "/api/bumn-swasta/ibnu-sina/fasilitas-ibnu-sina";
export default function Page() {
  const [open, setOpen] = useState(false);
  const { data: fasilitasSubmitted, loading, refetch } = useDataSubmitted(URL);

  const form = useForm<FasilitasIbnuSinaForm>({
    resolver: zodResolver(FasilitasIbnuSinaSchema),
    defaultValues: {
      fasilitas: "",
      dua_ribu_20: 0,
      dua_ribu_21: 0,
      dua_ribu_22: 0,
      dua_ribu_23: 0,
      dua_ribu_24: 0,
    },
  });

  const onSubmit = async (data: FasilitasIbnuSinaForm) => {
    const payload = {
      fasilitas: data.fasilitas,
      dua_ribu_20: data.dua_ribu_20,
      dua_ribu_21: data.dua_ribu_21,
      dua_ribu_22: data.dua_ribu_22,
      dua_ribu_23: data.dua_ribu_23,
      dua_ribu_24: data.dua_ribu_24,
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
      <div className="mt-10">
        <h1 className="text-xl text-center font-semibold">
          FASILITAS IBNU SINA YARSI
        </h1>
        <ButtonBack linkUrl="/bumn-dan-swasta?tab=ibnu-sina-yarsi" />
        <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
          <FasilitasCheckboxSection
            loading={loading}
            data={fasilitasSubmitted}
          />
          <div className="space-y-4">
            <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
            <p className="text-sm capitalize">
              Tabel 4.2.17 Banyaknya Fasilitas yang ada di RSI Ibnu Sina Simpang
              Empat, 2020-2024
            </p>
            <div>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FasilitasSelect
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    submittedItem={fasilitasSubmitted}
                  />

                  {[
                    { name: "dua_ribu_20" as const, label: "2020" as const },
                    { name: "dua_ribu_21" as const, label: "2021" as const },
                    { name: "dua_ribu_22" as const, label: "2022" as const },
                    { name: "dua_ribu_23" as const, label: "2023" as const },
                    { name: "dua_ribu_24" as const, label: "2024" as const },
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
        </div>
      </div>
    </>
  );
}
