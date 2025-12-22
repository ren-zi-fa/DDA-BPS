"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InputForm } from "@/components/common/boilerplate/InputForm";
import { dataPasaman } from "@/constant/informasi";

const initialForm = {
  nama_kecamatan: dataPasaman.nama_kecamatan,
  luas_kecamatan: dataPasaman.luas_kecamatan,
  batas_kecamatan_utara: dataPasaman.batas_kecamatan.utara,
  batas_kecamatan_selatan: dataPasaman.batas_kecamatan.selatan,
  batas_kecamatan_barat: dataPasaman.batas_kecamatan.barat,
  batas_kecamatan_timur: dataPasaman.batas_kecamatan.timur,
  ketinggian_permukaan_laut: dataPasaman.ketinggian_dari_permukaan_laut,
};

export default function InformasikecamatanForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisable] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/kecamatan/pasaman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_kecamatan: form.nama_kecamatan,
          luas_kecamatan: form.luas_kecamatan,
          batas_kecamatan_selatan: form.batas_kecamatan_selatan,
          batas_kecamatan_barat: form.batas_kecamatan_barat,
          batas_kecamatan_utara: form.batas_kecamatan_utara,
          batas_kecamatan_timur: form.batas_kecamatan_timur,
          ketinggian_permukaan_laut: form.ketinggian_permukaan_laut,
        }),
      });

      const result = await res.json();
      if (result.message == "Berhasil disimpan") {
        setMessage(result.message);
        setDisable(true);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  const formField = [
    {
      label: "Nama Kecamatan",
      name: "nama_kecamatan",
    },
    {
      label: "Luas Kecamatan",
      name: "luas_kecamatan",
    },
    {
      label: "batas Kecamatan Utara",
      name: "batas_kecamatan_utara",
    },
    {
      label: "batas Kecamatan Seletan",
      name: "batas_kecamatan_selatan",
    },
    {
      label: "batas Kecamatan Barat",
      name: "batas_kecamatan_barat",
    },
    {
      label: "batas Kecamatan Timur",
      name: "batas_kecamatan_timur",
    },
    {
      label: "Ketinggian dari Permukaan Laur",
      name: "ketinggian_permukaan_laut",
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full border-2 p-4 rounded-sm">
        <div className="space-y-4">
          <p className="text-lg capitalize">
            Informasi Kecamatan <span className="text-green-600">{message}</span>
          </p>
          <div className="">
            {formField.map((item) => (
              <InputForm
                key={item.name}
                label={item.label}
                type="text"
                name={item.name}
                disable={disabled}
                onChange={handleChange}
                value={form[item.name as keyof typeof form]}
              />
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full ${disabled ? "bg-green-600" : "bg-black"}`}
          >
            Simpan Data
          </Button>
        </div>
      </div>
    </>
  );
}
