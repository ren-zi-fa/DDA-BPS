"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function JumlahNagariForm({ kecamatan }: { kecamatan: string }) {
  const [form, setForm] = useState({
    nama_kecamatan: kecamatan,
    jumlah_nagari: "",
    jumlah_jorong: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await fetch("/api/kecamatan_dua/sungai beremas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_kecamatan: form.nama_kecamatan,
        jumlah_nagari: Number(form.jumlah_nagari),
        jumlah_jorong: Number(form.jumlah_jorong),
      }),
    });

    setForm({
      nama_kecamatan: kecamatan,
      jumlah_nagari: "",
      jumlah_jorong: "",
    });
  };

  const formField = [
    {
      label: "Jumlah Nagari",
      name: "jumlah_nagari",
      type: "number",
    },
    {
      label: "Jumlah Jorong",
      name: "jumlah_jorong",
      type: "number",
    },
  ];

  return (
    <>
      <h1>5. Jumlah Nagari dan Jorong di Kecamatan {kecamatan}</h1>

      <div className="space-y-2">
        <Label>Kecamatan</Label>
        <Input value={kecamatan} disabled />
      </div>

      {formField.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label>{field.label}</Label>
          <Input
            type={field.type}
            name={field.name}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
          />
        </div>
      ))}

      <Button onClick={handleSubmit} className="w-full">
        Simpan Data
      </Button>
    </>
  );
}
