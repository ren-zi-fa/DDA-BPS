"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { BulanCheckbox } from "@/components/common/ChecklistBulan";
import { BulanSelect } from "@/components/common/SelectBulan";

export default function Form2() {
  const [bulanSubmitted, setBulanSubmitted] = useState<string[]>([]);
  const fetchBulanSubmitted = async () => {
    const resp = await fetch(
      "/api/bumn/ibnu-sina/lanjutan-ibnu-sina-rawat-jalan"
    );
    const result = await resp.json();
    setBulanSubmitted(result.data);
  };

  useEffect(() => {
    fetchBulanSubmitted();
  }, []);
  const [form2, setForm2] = useState({
    bulan2: "",
    penyakit_dalam: 0,
    jiwa: 0,
    tht: 0,
    mata: 0,
    neurologi: 0,
    fisioterapi: 0,
  });

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const handleSubmit2 = async () => {
    await fetch("/api/bumn/ibnu-sina/lanjutan-ibnu-sina-rawat-jalan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form2,
        penyakit_dalam: Number(form2.penyakit_dalam),
        jiwa: Number(form2.jiwa),
        tht: Number(form2.tht),
        mata: Number(form2.mata),
        neurologi: Number(form2.neurologi),
        fisioterapi: Number(form2.fisioterapi),
      }),
    });
    await fetchBulanSubmitted();
    setForm2({
      bulan2: "",
      fisioterapi: 0,
      jiwa: 0,
      mata: 0,
      neurologi: 0,
      penyakit_dalam: 0,
      tht: 0,
    });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <BulanCheckbox submittedItem={bulanSubmitted} />
        <div className="space-y-4">
          <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
          <p className="text-sm capitalize">Lanjutan Tabel 4.2.15</p>
          <div>
            <BulanSelect
              submittedItem={bulanSubmitted}
              value={form2.bulan2}
              onChange={(val) => setForm2((prev) => ({ ...prev, bulan2: val }))}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="my-3">Penyakit Dalam</Label>
              <Input
                type="number"
                name="penyakit_dalam"
                value={form2.penyakit_dalam}
                onChange={handleChange2}
              />
            </div>

            <div>
              <Label className="my-3">Jiwa</Label>
              <Input
                type="number"
                name="jiwa"
                value={form2.jiwa}
                onChange={handleChange2}
              />
            </div>
            <div>
              <Label className="my-3">THT</Label>
              <Input
                type="number"
                name="tht"
                value={form2.tht}
                onChange={handleChange2}
              />
            </div>

            <div>
              <Label className="my-3">Mata</Label>
              <Input
                type="number"
                name="mata"
                value={form2.mata}
                onChange={handleChange2}
              />
            </div>
            <div>
              <Label className="my-3">Neurologi</Label>
              <Input
                type="number"
                name="neurologi"
                value={form2.neurologi}
                onChange={handleChange2}
              />
            </div>
            <div>
              <Label className="my-3">Fisioterapi</Label>
              <Input
                type="number"
                name="fisioterapi"
                value={form2.fisioterapi}
                onChange={handleChange2}
              />
            </div>
          </div>
          <Button onClick={handleSubmit2} className="w-full">
            Simpan Data
          </Button>
        </div>
      </div>
    </>
  );
}
