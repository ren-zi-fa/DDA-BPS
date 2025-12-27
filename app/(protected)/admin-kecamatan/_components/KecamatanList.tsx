"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileIconLink } from "@/components/common/FileIconLink";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  1;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/kecamatan");
        const result = await res.json();
        setDbKecamatan(result);
      } catch {
        setDbKecamatan([]);
      } finally {
        setLoading(false);
      }
    })();
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

      {loading ? (
        <div className="flex items-center justify-center mt-4">
          <Loader2 className="w-20 h-20 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {filtered.map((item) => {
            const sudahDiisi = dbSet.has(item.label.toLowerCase().trim());

            return (
              <div key={item.label} className="space-y-1">
                <FileIconLink
                  status={sudahDiisi}
                  href={`/admin-kecamatan/${item.label.toLowerCase()}`}
                  label={item.label}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
