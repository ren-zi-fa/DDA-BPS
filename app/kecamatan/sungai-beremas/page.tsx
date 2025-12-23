"use client";

import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import InformasikecamatanForm from "@/components/common/boilerplate/InformasiKecamatanForm";

import JumlahNagariForm from "@/components/common/boilerplate/JumlahNagariForm";
import { NagariSelect } from "@/components/common/SelectNagari";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { wilayah } from "@/constant/data";

import { useState } from "react";

const initialForm = {
  nama_kecamatan: "",
  luas_kecamatan: "",
  batas_kecamatan_utara: "",
  batas_kecamatan_selatan: "",
  batas_kecamatan_barat: "",
  batas_kecamatan_timur: "",
  ketinggian_permukaan_laut: "",
};
export default function Page() {
  return (
    <div className=" space-y-4 mt-10">
      <ButtonBack linkUrl="/kecamatan" />
      <InformasikecamatanForm
        initialForm={initialForm}
        url="/api/kecamatan/Sungai Beremas"
      />

      <div className="flex flex-col space-y-5 justify-center items-center">
        <div className="w-2xl space-y-8 border-2 rounded-sm p-4">
          <JumlahNagariForm kecamatan={"sungai beremas"} />
        </div>

        <div className="w-xl space-y-8 border-2 rounded-xl p-4">
          <h1>7. Nama Camat </h1>
          <div className="space-y-4">
            <Label>nama</Label>
            <Input type="text" defaultValue="" disabled />
          </div>
        </div>
        <div className="w-xl space-y-8 border-2 rounded-xl p-4"></div>
      </div>
    </div>
  );
}
