"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { UraianCheckbox } from "@/components/common/ChecklistUraian";
import { UraianSelect } from "@/components/common/selectUraian";

export default function Page() {
  const [UraianSubmitted, setUraianSubmitted] = useState<string[]>([]);
  const fetchUraianSubmitted = async () => {
    const resp = await fetch("/api/bumn/ibnu-sina/rawat-inap");
    const result = await resp.json();
    setUraianSubmitted(result.data);
  };
  useEffect(() => {
    fetchUraianSubmitted();
  }, []);
  const [form, setForm] = useState({
    uraian: "",
    jumlah_pasien: "",
    hari_rawat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/bumn/ibnu-sina/rawat-inap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        jumlah_pasien: Number(form.jumlah_pasien),
        hari_rawat: Number(form.hari_rawat),
      }),
    });
    await fetchUraianSubmitted();
    setForm({
      uraian: "",
      jumlah_pasien: "",
      hari_rawat: "",
    });
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="text-xl text-center font-semibold">PASIEN RAWAT INAP</h1>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/bumn-dan-swasta?tab=rawat-jalan">
            <MoveLeft className="size-12" />
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
          <UraianCheckbox submittedItem={UraianSubmitted} />
          <div className="space-y-4">
            <p className="text-sm text-red-700">Tabel_Ibnu Sina Yarsi </p>
            <p className="text-sm capitalize">
              Tabel 4.2.16 Banyaknya Pasien Yang Dirawat Inap di RSI Ibnu Sina
              Simpang Empat
            </p>
            <div>
              <UraianSelect
                submittedItem={UraianSubmitted}
                value={form.uraian}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, uraian: val }))
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="my-3">Jumlah Pasien</Label>
                <Input
                  type="number"
                  name="jumlah_pasien"
                  value={form.jumlah_pasien}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="my-3">Hari Rawat</Label>
                <Input
                  type="number"
                  name="hari_rawat"
                  value={form.hari_rawat}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Simpan Data
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
