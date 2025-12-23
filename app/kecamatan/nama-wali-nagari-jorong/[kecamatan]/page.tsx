"use client";

import { notFound, useParams } from "next/navigation";
import { kecamatan as dataKecamatan } from "@/constant/menu";
import { useState } from "react";
import { NagariSelect } from "@/components/common/SelectNagari";
import { wilayah } from "@/constant/data";
import { InputForm } from "@/components/common/boilerplate/InputForm";
import { Button } from "@/components/ui/button";

export default function NamaWaliNagariJorong() {
  const params = useParams<{ kecamatan: string }>();
  const namaKecamatan = decodeURIComponent(params.kecamatan);

  const kecamatan = dataKecamatan.find(
    (item) => item.label.toLowerCase() === namaKecamatan.toLowerCase()
  );

  if (!kecamatan) notFound();

  const nagariList =
    wilayah.find(
      (w) => w.kecamatan.toLowerCase() === namaKecamatan.toLowerCase()
    )?.nagari ?? [];

  const [form, setForm] = useState({
    kecamatan: namaKecamatan,
    nagari: "",
    nama_wali_nagari: "",
    jorong: "",
    kepala_jorong: "",
  });
  const formField = [
    { label: "Nama  Wali Nagari", name: "nama_wali_nagari" },
    { label: "Jorong", name: "jorong" },
    { label: "Kepala Jorong", name: "kepala_jorong" },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(form);
    // await fetch("/api/kecamatan/jumlah-nagari-jorong", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...form,
    //     nagari: form.nagari,
    //     nama_wali_nagari: form.nama_wali_nagari,
    //     jorong: form.jorong,
    //   }),
    // });
    // setForm({
    //   kecamatan: "",
    //   nama_wali_nagari: "",
    //   nagari: "",
    //   jorong: "",
    // });
  };
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Kecamatan {kecamatan.label}</h1>

      <NagariSelect
        value={form.nagari}
        nagariList={nagariList}
        onChange={(val) => setForm((f) => ({ ...f, nagari: val }))}
      />
      {formField.map((item) => (
        <InputForm
          key={item.label}
          label={item.label}
          name={item.name}
          onChange={handleChange}
          value={form[item.name as keyof typeof form]}
          type="text"
        />
      ))}
      <Button onClick={handleSubmit} className="w-full">
        Simpan Data
      </Button>
    </div>
  );
}
