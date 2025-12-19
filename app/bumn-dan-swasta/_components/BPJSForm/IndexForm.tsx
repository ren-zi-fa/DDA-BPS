"use client";

import { useEffect, useState } from "react";
import BpjsKecamatanStats from "./BpjsKecamatanStats";
import BpjsKelompokKecamatanStats from "./BpjsKelompokKecamatanStats";

export default function IndexFormBPJS() {
  const [kecamatanSubmitted, setKecamatanSubmitted] = useState<string[]>([]);
  useEffect(() => {
    const fetchKecamatanSubmitted = async () => {
      const resp = await fetch("/api/bumn/bpjs_kecamatan", { method: "GET" });
      const result = await resp.json();
      setKecamatanSubmitted(result.data);
    };
    fetchKecamatanSubmitted();
  }, []);

  return (
    <div className="space-y-4 mx-auto">
      <p>
        Jumlah Peserta BPJS Kesehatan dan Rata-rata Iuran Per Peserta Menurut
        Kecamatan di Kabupaten Pasaman Barat, 2025
      </p>
      <BpjsKecamatanStats kecamatanSubmitted={kecamatanSubmitted} />
      <BpjsKelompokKecamatanStats />
    </div>
  );
}
