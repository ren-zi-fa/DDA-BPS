"use client";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { KecamatanCheckboxSection } from "@/components/common/loading/KecamatanCheckBoxSection";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import {
  BPJSKelompokKecamatanForm,
  BPJSKelompokKecamatanSchema,
} from "@/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputNumericField } from "@/components/common/boilerplate/InputField";
import { SelectInput } from "@/components/common/SelectInput";
import { kecamatan } from "@/constant/menu";

const URL = "/api/bumn-swasta/bpjs_kelompok_kecamatan";
export default function Page() {
  const [open, setOpen] = useState(false);
  const { data: kecamatanSubmitted, loading, refetch } = useDataSubmitted(URL);

  const form = useForm<BPJSKelompokKecamatanForm>({
    resolver: zodResolver(BPJSKelompokKecamatanSchema),
    defaultValues: {
      kecamatan: "",
      bukan_penerima_bantuan_iuran: 0,
      penerima_bantuan_iuran: 0,
    },
  });

  const onSubmit = async (data: BPJSKelompokKecamatanForm) => {
    const payload = {
      kecamatan: data.kecamatan,
      bukan_penerima_bantuan_iuran: data.bukan_penerima_bantuan_iuran,
      penerima_bantuan_iuran: data.penerima_bantuan_iuran,
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
    <div className="mt-10">
      <h1 className="text-xl text-center font-semibold">
        BPJS KELOMPOK KECAMATAN
      </h1>
      <ButtonBack linkUrl="/bumn-dan-swasta" />
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <KecamatanCheckboxSection loading={loading} data={kecamatanSubmitted} />
        <div className="space-y-4 w-full">
          <p className="text-sm text-red-700">
            Tabel_Badan Penyelenggara Jaminan Sosial
          </p>
          <p className="text-sm capitalize">
            Tabel 4.2.16 Jumlah Peserta BPJS Kesehatan Menurut Kelompok dan
            Kecamatan di Kabupaten Pasaman Barat, 2024
          </p>
          <div>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <SelectInput
                  label="Kecamatan"
                  name="kecamatan"
                  valueSelect={kecamatan}
                  form={form}
                  open={open}
                  setOpen={setOpen}
                  submittedItem={kecamatanSubmitted}
                />
                <InputNumericField
                  form={form}
                  name="bukan_penerima_bantuan_iuran"
                  label="Bukan Penerima Bantuan Iuran"
                />
                <InputNumericField
                  form={form}
                  name="penerima_bantuan_iuran"
                  label="Penerima Bantuan Iuran"
                />

                <Button type="submit" className="w-full">
                  Simpan Data
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
