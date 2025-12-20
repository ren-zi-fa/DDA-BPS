"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { BulanCheckbox } from "@/components/common/ChecklistBulan";
import { BulanSelect } from "@/components/common/SelectBulan";

export default function page() {
  const [form, setForm] = useState({
    bulan: "",
    bedah: "",
    kesehatan_anak: "",
    poli_kebidanan: "",
    umum: "",
    gigi: "",
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
      bulan: "",
      bedah: "",
      gigi: "",
      kesehatan_anak: "",
      poli_kebidanan: "",
      umum: "",
    });
  };

  return (
    <>
      {/* Lanjutan Tabel 4.2.15 */}
      <div className="flex gap-3 flex-col md:flex-row border-2 space-x-2 rounded-sm p-4 ">
        <BulanCheckbox />
        <div className="space-y-4">
          <p className="text-sm capitalize">
            Jumlah Peserta BPJS Kesehatan dan Rata-rata Iuran Per Peserta
            Menurut Kecamatan di Kabupaten Pasaman Barat,
          </p>
          <div>
            <BulanSelect
              value={form.bulan}
              onChange={(val) => setForm((prev) => ({ ...prev, bulan: val }))}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="my-3">Bedah</Label>
              <Input
                type="number"
                name="bedah"
                value={form.bedah}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="my-3">Kesehatan Anak</Label>
              <Input
                type="number"
                name="kesehatan_anak"
                value={form.kesehatan_anak}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="my-3">Gigi</Label>
              <Input
                type="number"
                name="gigi"
                value={form.gigi}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="my-3">Poli Kebidanan</Label>
              <Input
                type="number"
                name="poli_kebidanan"
                value={form.poli_kebidanan}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="my-3">Umum</Label>
              <Input
                type="number"
                name="umum"
                value={form.umum}
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
