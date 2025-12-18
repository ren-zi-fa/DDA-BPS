"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useState } from "react";
import { KecamatanCheckbox } from "@/components/common/Checklist";

export default function BpjsKecamatanStats() {
  const [form, setForm] = useState({
    kecamatan: "",
    kelas1: "",
    kelas2: "",
    kelas3: "",
    jumlah: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // await fetch("", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...form,
    //     kelas1: Number(form.kelas1),
    //     kelas2: Number(form.kelas2),
    //     kelas3: Number(form.kelas3),
    //     jumlah: Number(form.jumlah),
    //   }),
    // });

    setForm({
      kecamatan: "",
      kelas1: "",
      kelas2: "",
      kelas3: "",
      jumlah: "",
    });
  };
  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row border-2 space-x-2 rounded-sm p-4 ">
        <KecamatanCheckbox />
        <div className="space-y-4">
          <p className="text-sm capitalize">
            Jumlah Peserta BPJS Kesehatan dan Rata-rata Iuran Per Peserta
            Menurut Kecamatan di Kabupaten Pasaman Barat,
          </p>
          <div>
            <KecamatanSelect
              value={form.kecamatan}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, kecamatan: val }))
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="my-3">Kelas I</Label>
              <Input
                type="number"
                name="kelas1"
                value={form.kelas1}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="my-3">Kelas II</Label>
              <Input
                type="number"
                name="kelas2"
                value={form.kelas2}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="my-3">Kelas III</Label>
              <Input
                type="number"
                name="kelas3"
                value={form.kelas3}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label className="my-3">Jumlah</Label>
            <Input
              type="number"
              name="jumlah"
              disabled
              value={form.jumlah}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Simpan Data
          </Button>
        </div>
      </div>
    </>
  );
}
