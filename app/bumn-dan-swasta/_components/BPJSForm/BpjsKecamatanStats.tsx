"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useEffect, useState } from "react";
import { KecamatanCheckbox } from "@/components/common/ChecklistKecamatan";

export default function BpjsKecamatanStats() {
  const [kecamatanSubmitted, setKecamatanSubmitted] = useState<string[]>([]);
  const fetchKecamatanSubmitted = async () => {
    const resp = await fetch("/api/bumn/bpjs_kecamatan");
    const result = await resp.json();
    setKecamatanSubmitted(result.data);
  };

  useEffect(() => {
    fetchKecamatanSubmitted();
  }, []);

  const [form, setForm] = useState({
    kecamatan: "",
    kelas1: "",
    kelas2: "",
    kelas3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/bumn/bpjs_kecamatan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        kelas1: Number(form.kelas1),
        kelas2: Number(form.kelas2),
        kelas3: Number(form.kelas3),
      }),
    });
    await fetchKecamatanSubmitted();
    setForm({
      kecamatan: "",
      kelas1: "",
      kelas2: "",
      kelas3: "",
    });
  };
  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row border-2 space-x-2 rounded-sm p-4 ">
        <KecamatanCheckbox submittedItem={kecamatanSubmitted} />
        <div className="space-y-4 w-full">
          <p className="text-sm text-red-700">
             Tabel_Badan Penyelenggara Jaminan Sosial 
          </p>
          <p className="text-sm capitalize">
            Tabel 4.2.15 Jumlah Peserta BPJS Kesehatan dan Rata-rata Iuran Per
            Peserta Menurut Kecamatan di Kabupaten Pasaman Barat, 2025
          </p>
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
          <Button onClick={handleSubmit} className="w-full">
            Simpan Data
          </Button>
        </div>
      </div>
    </>
  );
}
