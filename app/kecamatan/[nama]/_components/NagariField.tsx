"use client";
import { useState } from "react";
function capitalizeWords(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
// const kecamatanTerpilih = capitalizeWords(nama_kec);

// const nagariOptions =
//   wilayah
//     .find((w) => w.kecamatan === kecamatanTerpilih)
//     ?.nagari.map((n) => n.nama) ?? [];
export function NagariFieldCompletion({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative">
      <label htmlFor="">Nama Nagari</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="border rounded-md p-2 w-full"
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-md border bg-white shadow max-h-40 overflow-y-auto">
          {filtered.map((item) => (
            <li
              key={item}
              onMouseDown={() => onChange(item)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
