"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useState } from "react";
import { KecamatanCheckbox } from "@/components/common/Checklist";

export default function BpjsKelompokKecamatanStats() {
  const [form, setForm] = useState({
    kecamatan: "",
    penerima_bantuan_iuran: "",
    bukan_penerima_bantuan_uran: "",
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
    //    bukan_penerima_bantuan_uran: Number(form.kelas2),
    //     kelas3: Number(form.kelas3),
    //     jumlah: Number(form.jumlah),
    //   }),
    // });

    setForm({
      kecamatan: "",
      penerima_bantuan_iuran: "",
      bukan_penerima_bantuan_uran: "",

      jumlah: "",
    });
  };
  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row border-2 space-x-2 rounded-sm p-4 ">
        <KecamatanCheckbox />
        <div className="space-y-4">
          <p className="text-sm capitalize">
            Jumlah Peserta BPJS Kesehatan Menurut Kelompok dan Kecamatan di
            Kabupaten Pasaman Barat
          </p>
          <div>
            <KecamatanSelect
              value={form.kecamatan}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, kecamatan: val }))
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="my-3">Penerima Bantuan Iuran (PBI)</Label>
              <Input
                type="number"
                name="penerima_bantuan_iuran"
                value={form.penerima_bantuan_iuran}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="my-3">
                umlah Peserta BPJS Kesehatan Menurut Kelompok dan Kecamatan di
                Kabupaten Pasaman Barat
              </Label>
              <Input
                type="number"
                name="bukan_penerima_bantuan_iuran"
                value={form.bukan_penerima_bantuan_uran}
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
