"use client";

import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/common/SelectInput";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { UraianCheckboxSection } from "@/components/common/loading/UraianCheckBoxSection";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { RawatInapForm, RawatInapSchema } from "@/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { uraian } from "@/constant/data";
import { InputNumericField } from "@/components/common/boilerplate/InputField";

const URL = "/api/bumn-swasta/ibnu-sina/rawat-inap";
export default function Page() {
  const { data: uraianSubmitted, loading, refetch } = useDataSubmitted(URL);
  const [open, setOpen] = useState(false);

  const form = useForm<RawatInapForm>({
    resolver: zodResolver(RawatInapSchema),
    defaultValues: {
      hari_rawat: 0,
      jumlah_pasien: 0,
      uraian: "",
    },
  });

  const onSubmit = async (data: RawatInapForm) => {
    const payload = {
      uraian: data.uraian,
      jumlah_pasien: data.jumlah_pasien,
      hari_rawat: data.hari_rawat,
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
        <h1 className="text-xl text-center font-semibold">PASIEN RAWAT INAP</h1>
        <ButtonBack linkUrl="/bumn-dan-swasta?tab=ibnu-sina-yarsi" />
        <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
          <UraianCheckboxSection loading={loading} data={uraianSubmitted} />
          <div className="space-y-4">
            <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
            <p className="text-sm capitalize">
              Tabel 4.2.16 Banyaknya Pasien Yang Dirawat Inap di RSI Ibnu Sina
              Simpang Empat
            </p>
            <div>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <SelectInput
                    form={form}
                    open={open}
                    setOpen={setOpen}
                    label="Uraian"
                    name="uraian"
                    valueSelect={uraian}
                    submittedItem={uraianSubmitted}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        name: "hari_rawat" as const,
                        label: "Hari Rawat" as const,
                      },
                      {
                        name: "jumlah_pasien" as const,
                        label: "Jumlah Pasien" as const,
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
        </div>
      </div>
    </>
  );
}
