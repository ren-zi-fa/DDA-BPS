"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BulanSelect } from "@/components/common/SelectBulan";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { BulanCheckboxSection } from "@/components/common/loading/BulanCheckboxSection";
import { RawatJalanForm, RawatJalanSchema } from "@/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputNumericField } from "@/components/common/boilerplate/InputField";

const URL = "/api/bumn-swasta/ibnu-sina/ibnu-sina-rawat-jalan";
export default function Form1() {
  const { data: bulanSubmitted, loading, refetch } = useDataSubmitted(URL);
  const [open, setOpen] = useState(false);

  const form = useForm<RawatJalanForm>({
    resolver: zodResolver(RawatJalanSchema),
    defaultValues: {
      bulan: "",
      gigi: 0,
      kesehatan_anak: 0,
      poli_kebidanan: 0,
      umum: 0,
      bedah: 0,
    },
  });

  const onSubmit = async (data: RawatJalanForm) => {
    const payload = {
      bulan: data.bulan,
      gigi: data.gigi,
      kesehatan_anak: data.kesehatan_anak,
      poli_kebidanan: data.poli_kebidanan,
      umum: data.umum,
      bedah: data.bedah,
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
            Tabel 4.2.15 Banyaknya Pasien Rawat Jalan di RSI Ibnu Sina Simpang
            Empat
          </p>
          <div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <BulanSelect
                  form={form}
                  open={open}
                  setOpen={setOpen}
                  submittedItem={bulanSubmitted}
                />
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "bedah" as const, label: "Bedah" as const },
                    { name: "gigi" as const, label: "Gigi" as const },
                    {
                      name: "kesehatan_anak" as const,
                      label: "Kesehatan Anak" as const,
                    },
                    {
                      name: "poli_kebidanan" as const,
                      label: "Poli Kebidanan" as const,
                    },
                    { name: "umum" as const, label: "UMUM" as const },
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
    </>
  );
}
