"use client";

import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Fasilitas,
  IbnuSinaRawatInap,
  IbnuSinaRawatJalan,
  LanjutanIbnuSinaRawatJalan,
} from "@/lib/generated/prisma/client";
import RawatJalan from "./RawatJalan";
import LanjutanRawatJalan from "./LanjutRawatJalan";
import RawatInap from "./RawatInap";
import FasilitasTable from "./Fasilitas";

export default function Swasta() {
  const [rawatJalan, setRawatJalan] = useState<IbnuSinaRawatJalan[]>([]);
  const [lanjutan, setLanjutan] = useState<LanjutanIbnuSinaRawatJalan[]>([]);
  const [rawatInap, setRawatInap] = useState<IbnuSinaRawatInap[]>([]);
  const [fasilitass, setfasilitass] = useState<Fasilitas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/bumn/ibnu-sina-rawat-jalan").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn/lanjutan-ibnu-sina-rawat-jalan").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn/ibnu-sina-rawat-inap").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn/fasilitas").then((res) => res.json()),
    ])
      .then(([resRawat, resLanjutan, restRawatInap, restFasilitas]) => {
        setRawatJalan(resRawat.data);
        setLanjutan(resLanjutan.data);
        setRawatInap(restRawatInap.data);
        setfasilitass(restFasilitas.data);
      })
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
        sheetName: "Lanjutan",
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
    ];

    exportToExcelRawatJalan(sheets, "IbnuSina.xlsx");
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
      <Button className="mt-6" onClick={exportAllToExcel}>
        Export ke Excel
      </Button>
    </>
  );
}

export interface SheetData {
  sheetName: string;
  data: Record<string, any>[];
  totalFields?: string[];
}
function exportToExcelRawatJalan(sheets: SheetData[], fileName: string) {
  const workbook = XLSX.utils.book_new();

  sheets.forEach((sheet) => {
    const { sheetName, data, totalFields } = sheet;
    const sheetData = [...data];

    if (totalFields && totalFields.length > 0) {
      const totalRow = totalFields.reduce(
        (acc, key) => ({
          ...acc,
          [key]: data.reduce((sum, row) => sum + (row[key] || 0), 0),
        }),
        {} as Record<string, number>
      );

      // Jika ada kolom Bulan, beri label Total, kalau tidak cukup push totalRow
      if (data[0] && "Bulan" in data[0]) {
        sheetData.push({ Bulan: "Total", ...totalRow });
      } else {
        sheetData.push(totalRow);
      }
    }

    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
  });

  XLSX.writeFile(workbook, fileName);
}
