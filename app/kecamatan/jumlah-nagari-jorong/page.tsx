"use client";
import { Button } from "@/components/ui/button";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useState } from "react";
import { KecamatanCheckboxSection } from "@/components/common/loading/KecamatanCheckBoxSection";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { InputForm } from "@/components/common/boilerplate/InputForm";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";

export default function PageJumlahNagariJorong() {
  const {
    data: kecamatanSubmitted,
    loading,
    refetch,
  } = useDataSubmitted("/api/kecamatan/jumlah-nagari-jorong");

  const [form, setForm] = useState({
    kecamatan: "",
    jumlah_nagari: "",
    jumlah_jorong: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/kecamatan/jumlah-nagari-jorong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        jumlah_nagari: Number(form.jumlah_nagari),
        jumlah_jorong: Number(form.jumlah_jorong),
      }),
    });
    await refetch();
    setForm({
      kecamatan: "",
      jumlah_nagari: "",
      jumlah_jorong: "",
    });
  };
  const kelasFields = [
    { label: "Jumlah Nagari", name: "jumlah_nagari" },
    { label: "Jumlah Jorong", name: "jumlah_jorong" },
  ];
  return (
    <div className="mt-10 w-xl mx-auto">
      <h1 className="text-xl text-center font-semibold">
        JUMLAH NAGARI DAN JORONG KECAMATAN
      </h1>
      <ButtonBack linkUrl="/kecamatan" />
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <KecamatanCheckboxSection loading={loading} data={kecamatanSubmitted} />

        <div className="space-y-4 w-full">
          <div>
            <KecamatanSelect
              submittedItem={kecamatanSubmitted}
              value={form.kecamatan}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, kecamatan: val }))
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {kelasFields.map((item) => (
              <InputForm
                key={item.name}
                label={item.label}
                name={item.name}
                value={form[item.name as keyof typeof form]}
                onChange={handleChange}
              />
            ))}
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Simpan Data
          </Button>
        </div>
      </div>
    </div>
  );
}
