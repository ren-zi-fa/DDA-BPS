"use client";
import { Button } from "@/components/ui/button";
import { KecamatanSelect } from "@/components/common/SelectKecamatan";
import { useState } from "react";
import { KecamatanCheckboxSection } from "@/components/common/loading/KecamatanCheckBoxSection";
import { useDataSubmitted } from "@/hooks/useDataSubmitted";
import { InputForm } from "@/components/common/boilerplate/InputForm";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { InformasiKecamatanProps } from "@/type";
import {
  dataGunungTuleh,
  dataKinali,
  dataKotoBalingka,
  dataPasaman,
  dataRanahBatahan,
  dataTalamau,
} from "@/constant/informasi";

const KECAMATAN_MAP: Record<string, InformasiKecamatanProps> = {
  "Ranah Batahan": dataRanahBatahan,
  Kinali: dataKinali,
  Pasaman: dataPasaman,
  "Gunung Tuleh": dataGunungTuleh,
  "Koto Balingka": dataKotoBalingka,
  Talamau: dataTalamau,
};

export default function InfoPageKecamatan() {
  const {
    data: kecamatanSubmitted,
    loading,
    refetch,
  } = useDataSubmitted("/api/kecamatan/informasi-kecamatan");

  const [form, setForm] = useState({
    kecamatan: "",
    luas_kecamatan: "",
    batas_kecamatan_utara: "",
    batas_kecamatan_selatan: "",
    batas_kecamatan_barat: "",
    batas_kecamatan_timur: "",
    ketinggian_mdl: "",
    nama_camat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/kecamatan/informasi-kecamatan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        luas_kecamatan: form.luas_kecamatan,
        batas_kecamatan_utara: form.batas_kecamatan_utara,
        batas_kecamatan_selatan: form.batas_kecamatan_selatan,
        batas_kecamatan_barat: form.batas_kecamatan_barat,
        batas_kecamatan_timur: form.batas_kecamatan_timur,
        ketinggian_mdl: form.ketinggian_mdl,
        nama_camat: form.nama_camat,
      }),
    });
    await refetch();
    setForm({
      kecamatan: "",
      nama_camat: "",
      luas_kecamatan: "",
      batas_kecamatan_utara: "",
      batas_kecamatan_selatan: "",
      batas_kecamatan_barat: "",
      batas_kecamatan_timur: "",
      ketinggian_mdl: "",
    });
  };

  const kelasFields = [
    { label: "Luas Kecamatan", name: "luas_kecamatan" },
    { label: "Batas Utara", name: "batas_kecamatan_utara" },
    { label: "Batas Selatan", name: "batas_kecamatan_selatan" },
    { label: "Batas Barat", name: "batas_kecamatan_barat" },
    { label: "Batas Timur", name: "batas_kecamatan_timur" },
    { label: "Ketinggian dari Permukaan Laut", name: "ketinggian_mdl" },
    { label: "Nama Camat", name: "nama_camat" },
  ];
  const EMPTY_FORM = {
    luas_kecamatan: "",
    batas_kecamatan_utara: "",
    batas_kecamatan_selatan: "",
    batas_kecamatan_barat: "",
    batas_kecamatan_timur: "",
    ketinggian_mdl: "",
  };

  return (
    <>
      <div className="mt-10 w-xl mx-auto">
        <h1 className="text-xl text-center font-semibold">KECAMATAN</h1>
        <ButtonBack linkUrl="/kecamatan" />
        <div className="flex flex-col md:flex-row gap-3 border rounded-sm p-4 mt-20">
          <KecamatanCheckboxSection
            loading={loading}
            data={kecamatanSubmitted}
          />

          <div className="space-y-4 w-full">
            <div>
              <KecamatanSelect
                value={form.kecamatan}
                submittedItem={kecamatanSubmitted}
                onChange={(val) => {
                  const data = KECAMATAN_MAP[val];

                  if (!data) {
                    setForm({
                      ...EMPTY_FORM,
                      kecamatan: val,
                      nama_camat: "",
                    });
                    return;
                  }

                  setForm((prev) => ({
                    ...prev,
                    kecamatan: val,
                    luas_kecamatan: data.luas_kecamatan || "",
                    batas_kecamatan_utara: data.batas_kecamatan.utara || "",
                    batas_kecamatan_selatan: data.batas_kecamatan.selatan || "",
                    batas_kecamatan_barat: data.batas_kecamatan.barat || "",
                    batas_kecamatan_timur: data.batas_kecamatan.timur || "",
                    ketinggian_mdl: data.ketinggian_dari_permukaan_laut || "",
                  
                  }));
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {kelasFields.map((item) => (
                <InputForm
                  key={item.name}
                  label={item.label}
                  type="text"
                  name={item.name}
                  value={form[item.name as keyof typeof form]}
                  onChange={handleChange}
                />
              ))}
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
