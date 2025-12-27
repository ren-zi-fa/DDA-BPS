/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Fasilitas,
  IbnuSinaRawatInap,
  IbnuSinaRawatJalan,
  KelahiranKematian,
  LanjutanIbnuSinaRawatJalan,
  LanjutanKelahiranKematian,
} from "@/lib/generated/prisma/client";
import RawatJalan from "./RawatJalan";
import LanjutanRawatJalan from "./LanjutRawatJalan";
import RawatInap from "./RawatInap";
import FasilitasTable from "./Fasilitas";
import KelahiranKematianTable from "./KelahiranKematian";
import LanjutanKelahiranKematianTable from "./LanjutanKelahiranKematian";
import { exportToExcel, SheetData } from "@/helper/ExportExcel";

export default function Swasta() {
  const [rawatJalan, setRawatJalan] = useState<IbnuSinaRawatJalan[]>([]);
  const [lanjutan, setLanjutan] = useState<LanjutanIbnuSinaRawatJalan[]>([]);
  const [rawatInap, setRawatInap] = useState<IbnuSinaRawatInap[]>([]);
  const [fasilitass, setfasilitass] = useState<Fasilitas[]>([]);
  const [kelahiranKematian, setkelahiranKematian] = useState<
    KelahiranKematian[]
  >([]);
  const [lanjutanKelahiranKematian, setLanjutanKelahiranKematian] = useState<
    LanjutanKelahiranKematian[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/bumn-swasta/ibnu-sina-rawat-jalan").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn-swasta/lanjutan-ibnu-sina-rawat-jalan").then(
        (res) => res.json()
      ),
      fetch("/api/dashboard/bumn-swasta/ibnu-sina-rawat-inap").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn-swasta/fasilitas").then((res) => res.json()),
      fetch("/api/dashboard/bumn-swasta/kelahiran-kematian").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn-swasta/lanjutan-kelahiran-kematian").then(
        (res) => res.json()
      ),
    ])

      .then(
        ([
          resRawat,
          resLanjutan,
          restRawatInap,
          restFasilitas,
          restKelahrianMatian,
          restLanjutKelahrianMatian,
        ]) => {
          setRawatJalan(resRawat.data);
          setLanjutan(resLanjutan.data);
          setRawatInap(restRawatInap.data);
          setfasilitass(restFasilitas.data);
          setfasilitass(restFasilitas.data);
          setkelahiranKematian(restKelahrianMatian.data);
          setLanjutanKelahiranKematian(restLanjutKelahrianMatian.data);
        }
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  const exportAllToExcel = () => {
    const sheets: SheetData[] = [
      {
        sheetName: "Rawat Jalan",
        data: rawatJalan.map((item) => ({
          Bulan: item.bulan,
          Bedah: item.bedah,
          Gigi: item.gigi,
          "Kesehatan Anak": item.kesehatan_anak,
          "Poli Kebidanan": item.poli_kebidanan,
          Umum: item.umum,
        })),
        totalFields: [
          "Bedah",
          "Gigi",
          "Kesehatan Anak",
          "Poli Kebidanan",
          "Umum",
        ],
      },
      {
        sheetName: "Lanjutan Rawat Jalan",
        data: lanjutan.map((item) => ({
          Bulan: item.bulan,
          Fisioterapi: item.fisioterapi,
          Jiwa: item.jiwa,
          Mata: item.mata,
          Neurologi: item.neurologi,
          "Penyakit Dalam": item.penyakit_dalam,
          THT: item.tht,
        })),
        totalFields: [
          "Fisioterapi",
          "Jiwa",
          "Mata",
          "Neurologi",
          "Penyakit Dalam",
          "THT",
        ],
      },
      {
        sheetName: "Rawat Inap",
        data: rawatInap.map((item) => ({
          Uraian: item.uraian,
          "Jumlah Pasien": item.jumlah_pasien,
          "Hari Rawat": item.hari_rawat,
        })),
        totalFields: ["Jumlah Pasien", "Hari Rawat"],
      },
      {
        sheetName: "Fasilitas",
        data: fasilitass.map((item) => ({
          Fasilitas: item.fasilitas,
          "2020": item.dua_ribu_20,
          "2021": item.dua_ribu_21,
          "2022": item.dua_ribu_22,
          "2023": item.dua_ribu_23,
          "2024": item.dua_ribu_24,
        })),
        totalFields: ["2020", "2021", "2022", "2023", "2024"],
      },
      {
        sheetName: "Sheet 5",
        data: kelahiranKematian.map((item) => ({
          Bulan: item.bulan,
          Bersalin: item.bersalin,
          Keguguran: item.keguguran,
        })),
        totalFields: ["Bersalin", "Keguguran"],
      },
      {
        sheetName: "Lanjutan Sheet 5",
        data: lanjutanKelahiranKematian.map((item) => ({
          Bulan: item.bulan,
          "Hidup Laki Laki": item.hidup_laki_laki,
          "Hidup Perempuan": item.hidup_perempuan,
          "Mati Laki Laki": item.mati_laki_laki,
          "Mati Perempuan": item.mati_perempuan,
        })),
        totalFields: [
          "Hidup Laki Laki",
          "Hidup Perempuan",
          "Mati Laki Laki",
          "Mati Perempuan",
        ],
      },
    ];

    exportToExcel(sheets, "Tabel-Ibnu-Sina.xlsx");
  };

  return (
    <>
      <h1 className="text-center my-5">IBNU SINA YARSI</h1>
      <div className="border p-4 rounded-sm">
        <RawatJalan rawatJalan={rawatJalan} />
        <LanjutanRawatJalan lanjutan={lanjutan} />
      </div>
      <div className="border p-4 rounded-sm mt-4">
        <RawatInap inap={rawatInap} />
      </div>
      <div className="border p-4 rounded-sm mt-4">
        <FasilitasTable fasilitas={fasilitass} />
      </div>
      <div className="border p-4 rounded-sm">
        <KelahiranKematianTable kelahirans_kematians={kelahiranKematian} />
        <LanjutanKelahiranKematianTable
          kelahirans_kematians={lanjutanKelahiranKematian}
        />
      </div>
      <Button className="mt-6" onClick={exportAllToExcel}>
        Export ke Excel
      </Button>
    </>
  );
}
