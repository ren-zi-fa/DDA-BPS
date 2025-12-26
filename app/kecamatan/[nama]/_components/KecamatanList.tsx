"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileIconLink } from "@/components/common/FileIconLink";

type KecamatanItem = {
  label: string;
};

type KecamatanDB = {
  id: number;
  kecamatan: string;
};

export default function KecamatanList({ data }: { data: KecamatanItem[] }) {
  const [query, setQuery] = useState("");
  const [dbKecamatan, setDbKecamatan] = useState<KecamatanDB[]>([]);

  useEffect(() => {
    fetch("/api/kecamatan")
      .then((res) => res.json())
      .then((result) => setDbKecamatan(result))
      .catch(() => setDbKecamatan([]));
  }, []);

  const dbSet = useMemo(
    () => new Set(dbKecamatan.map((k) => k.kecamatan.toLowerCase().trim())),
    [dbKecamatan]
  );

  const filtered = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Cari Kecamatan"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {filtered.map((item) => {
          const sudahDiisi = dbSet.has(item.label.toLowerCase().trim());

          return (
            <div key={item.label} className="space-y-1">
              <FileIconLink
                status={sudahDiisi}
                href={`/kecamatan/${item.label.toLowerCase()}`}
                label={item.label}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
