"use client";

import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { FolderIconLink } from "@/components/common/FolderIconLink";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const menuFolder = [
  {
    label: "Ranah Batah",
    href: "/kecamatan/ranah-batahan",
  },
  {
    label: "Koto Balingka",
    href: "/kecamatan/koto-balingka",
  },
  {
    label: "Gunung Tuleh",
    href: "/kecamatan/gunung-tuleh",
  },
  {
    label: "Pasaman",
    href: "/kecamatan/pasaman",
  },
];
export default function KecamatanPage() {
  const [search, setSearch] = useState("");
  const filtered = menuFolder.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <ButtonBack linkUrl="/" />
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Kecamatan</h1>
      </header>
      <div className="flex flex-col space-y-10">
        <Input
          type="text"
          placeholder="Cari Kecamatan..."
          className="w-1/2 rounded-md mx-auto border px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-4">
          {filtered.map((item) => (
            <FolderIconLink
              label={item.label}
              href={item.href}
              popover="lalal"
              key={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
