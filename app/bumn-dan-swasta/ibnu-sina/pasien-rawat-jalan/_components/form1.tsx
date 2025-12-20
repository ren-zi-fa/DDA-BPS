"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { BulanCheckbox } from "@/components/common/ChecklistBulan";
import { BulanSelect } from "@/components/common/SelectBulan";

export default function Form1() {
  const [bulanSubmitted, setBulanSubmitted] = useState<string[]>([]);
  const fetchBulanSubmitted = async () => {
    const resp = await fetch("/api/bumn/ibnu-sina/ibnu-sina-rawat-jalan");
    const result = await resp.json();
    setBulanSubmitted(result.data);
  };

  useEffect(() => {
    fetchBulanSubmitted();
  }, []);
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
    await fetch("/api/bumn/ibnu-sina/ibnu-sina-rawat-jalan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        bedah: Number(form.bedah),
        kesehatan_anak: Number(form.kesehatan_anak),
        poli_kebidanan: Number(form.poli_kebidanan),
        umum: Number(form.umum),
        gigi: Number(form.gigi),
      }),
    });
    await fetchBulanSubmitted();
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
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <BulanCheckbox submittedItem={bulanSubmitted} />
        <div className="space-y-4">
          <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
          <p className="text-sm capitalize">
            Tabel 4.2.15 Banyaknya Pasien Rawat Jalan di RSI Ibnu Sina Simpang
            Empat
          </p>
          <div>
            <BulanSelect
              submittedItem={bulanSubmitted}
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
