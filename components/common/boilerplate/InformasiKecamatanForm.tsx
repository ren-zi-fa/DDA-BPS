"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { InputForm } from "@/components/common/boilerplate/InputForm";

interface FormInterface {
  initialForm: {
    nama_kecamatan: string;
    luas_kecamatan: string;
    batas_kecamatan_utara: string;
    batas_kecamatan_selatan: string;
    batas_kecamatan_barat: string;
    batas_kecamatan_timur: string;
    ketinggian_permukaan_laut: string;
  };
  url: string;
}

export default function InformasikecamatanForm({
  initialForm,
  url,
}: FormInterface) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisable] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [kecamatan, setKecamatan] = useState<any>(null);
  const [nama_kecamatan, setNama_Kecamatan] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        setDisable(false);
        setKecamatan(null);
        return;
      }

      const json = await res.json();

      if (json?.dataInformasi?.dataInformasi) {
        setKecamatan(json.dataInformasi.dataInformasi);
        setNama_Kecamatan(json.dataInformasi);
        setDisable(true);
      } else {
        setKecamatan(null);
        setDisable(false);
      }
    } catch (error) {
      console.error(error);
      setDisable(false);
      setKecamatan(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!kecamatan) return;

    setForm({
      nama_kecamatan: nama_kecamatan.nama,
      luas_kecamatan: kecamatan.luas_km2 ?? "",
      batas_kecamatan_utara: kecamatan.batas_utara ?? "",
      batas_kecamatan_selatan: kecamatan.batas_selatan ?? "",
      batas_kecamatan_barat: kecamatan.batas_barat ?? "",
      batas_kecamatan_timur: kecamatan.batas_timur ?? "",
      ketinggian_permukaan_laut: kecamatan.ketinggian_dari_permukaan_laut ?? "",
    });
  }, [kecamatan]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(url, {
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
      await fetchData();
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
            Informasi Kecamatan
            <span className="text-green-600">{message}</span>
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
            disabled={loading || disabled}
            className={`w-full ${disabled ? "bg-green-600" : "bg-black"}`}
          >
            {disabled ? "Data Sudah Tersimpan" : "Simpan Data"}
          </Button>
        </div>
      </div>
    </>
  );
}
