"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useEffect, useState } from "react";
import { KecamatanCheckbox } from "@/components/common/ChecklistKecamatan";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [kecamatanSubmitted, setKecamatanSubmitted] = useState<string[]>([]);
  const fetchKecamatanSubmitted = async () => {
    const resp = await fetch("/api/bumn/bpjs_kelompok_kecamatan");
    const result = await resp.json();
    setKecamatanSubmitted(result.data);
  };

  useEffect(() => {
    fetchKecamatanSubmitted();
  }, []);
  const [form, setForm] = useState({
    kecamatan: "",
    penerima_bantuan_iuran: 0,
    bukan_penerima_bantuan_iuran: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/bumn/bpjs_kelompok_kecamatan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        penerima_bantuan_iuran: Number(form.penerima_bantuan_iuran),
        bukan_penerima_bantuan_iuran: Number(form.bukan_penerima_bantuan_iuran),
      }),
    });
    await fetchKecamatanSubmitted();
    setForm({
      kecamatan: "",
      penerima_bantuan_iuran: 0,
      bukan_penerima_bantuan_iuran: 0,
    });
  };
  return (
    <div className="mt-10">
      <h1 className="text-xl text-center font-semibold">BPJS KELOMPOK KECAMATAN</h1>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/bumn-dan-swasta">
          <MoveLeft className="size-12" />
        </Link>
      </Button>
      <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
        <KecamatanCheckbox submittedItem={kecamatanSubmitted} />
        <div className="space-y-4 w-full">
          <p className="text-sm text-red-700">
            Tabel_Badan Penyelenggara Jaminan Sosial
          </p>
          <p className="text-sm capitalize">
            Tabel 4.2.16 Jumlah Peserta BPJS Kesehatan Menurut Kelompok dan
            Kecamatan di Kabupaten Pasaman Barat, 2024
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
                value={form.bukan_penerima_bantuan_iuran}
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
  );
}
