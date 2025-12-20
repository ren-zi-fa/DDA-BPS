"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useState } from "react";
import { KecamatanCheckbox } from "@/components/common/ChecklistKecamatan";

export default function page() {
  const [form, setForm] = useState({
    kecamatan: "",
    penerima_bantuan_iuran: 0,
    bukan_penerima_bantuan_uran: 0,
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
      penerima_bantuan_iuran: 0,
      bukan_penerima_bantuan_uran: 0,
    });
  };
  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row border-2 space-x-2 rounded-sm p-4 ">
        <KecamatanCheckbox />
        <div className="space-y-4 w-full">
          <p className="text-sm capitalize">4.2.16 </p>
          <div>
            <KecamatanSelect
              value={form.kecamatan}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, kecamatan: val }))
              }
            />
          </div>

          <div className="flex flex-col">
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
                Bukan Penerima Bantuan Iuran (Non PBI)
              </Label>
              <Input
                type="number"
                name="bukan_penerima_bantuan_iuran"
                value={form.bukan_penerima_bantuan_uran}
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
