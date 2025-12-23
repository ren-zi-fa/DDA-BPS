"use client";

import { useState } from "react";
import { FileIconLink } from "@/components/common/FileIconLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { kecamatan } from "@/constant/menu";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageJumlahNagariJorong() {
  const [search, setSearch] = useState("");

  const filteredKecamatan = kecamatan.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Button asChild>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>

      <Input
        type="text"
        placeholder="Cari kecamatan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-4 gap-4 mt-10">
        {filteredKecamatan.map((item) => (
          <FileIconLink
            key={item.label}
            label={item.label}
            href={`/kecamatan/nama-wali-nagari-jorong/${item.label}`}
          />
        ))}
      </div>
    </div>
  );
}
