"use client";

import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BpjsKelompokKecamatan } from "@/lib/generated/prisma/client";

interface BpjsKecamatan {
  id: number;
  kecamatan: string;
  kelasI: number;
  kelasII: number;
  kelasIII: number;
  jumlah: number;
}

export default function TabelYarsi() {
  const [dataKecamatan, setDataKecamatan] = useState<BpjsKecamatan[]>([]);
  const [dataKelompok, setDataKelompok] = useState<BpjsKelompokKecamatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/bumn/jumlah-peserta-bpjs-kecamatan").then((res) =>
        res.json()
      ),
      fetch("/api/dashboard/bumn/jumlah-peserta-bpjs-kelompok").then((res) =>
        res.json()
      ),
    ])
      .then(([resKecamatan, resKelompok]) => {
        setDataKecamatan(resKecamatan.data);
        setDataKelompok(resKelompok.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  const exportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Kecamatan
    const sheetKecamatan = dataKecamatan.map((item) => ({
      Kecamatan: item.kecamatan,
      KelasI: item.kelasI,
      KelasII: item.kelasII,
      KelasIII: item.kelasIII,
      Jumlah: item.jumlah,
    }));
    const totalKecamatan = dataKecamatan.reduce(
      (acc, curr) => ({
        KelasI: acc.KelasI + curr.kelasI,
        KelasII: acc.KelasII + curr.kelasII,
        KelasIII: acc.KelasIII + curr.kelasIII,
        Jumlah: acc.Jumlah + curr.jumlah,
      }),
      { KelasI: 0, KelasII: 0, KelasIII: 0, Jumlah: 0 }
    );
    sheetKecamatan.push({ Kecamatan: "Total", ...totalKecamatan });

    const ws1 = XLSX.utils.json_to_sheet(sheetKecamatan);
    XLSX.utils.book_append_sheet(workbook, ws1, "Kecamatan");

    // Sheet 2: Kelompok
    const sheetKelompok = dataKelompok.map((item) => ({
      Kecamatan: item.kecamatan,
      NonPBI: item.non_pbi,
      PBI: item.pbi,
      Jumlah: item.jumlah,
    }));
    const totalKelompok = dataKelompok.reduce(
      (acc, curr) => ({
        NonPBI: acc.NonPBI + curr.non_pbi,
        PBI: acc.PBI + curr.pbi,
        Jumlah: acc.Jumlah + curr.jumlah,
      }),
      { NonPBI: 0, PBI: 0, Jumlah: 0 }
    );
    sheetKelompok.push({ Kecamatan: "Total", ...totalKelompok });

    const ws2 = XLSX.utils.json_to_sheet(sheetKelompok);
    XLSX.utils.book_append_sheet(workbook, ws2, "Kelompok");

    XLSX.writeFile(workbook, "BPJS.xlsx");
  };

  return (
    <>
      <h2>Jumlah Peserta BPJS Menurut Kecamatan</h2>
      <Table className="border p-2 rounded-sm mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Kecamatan</TableHead>
            <TableHead>Kelas I</TableHead>
            <TableHead>Kelas II</TableHead>
            <TableHead>Kelas III</TableHead>
            <TableHead>Jumlah</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataKecamatan.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.kecamatan}</TableCell>
              <TableCell>{item.kelasI.toLocaleString()}</TableCell>
              <TableCell>{item.kelasII.toLocaleString()}</TableCell>
              <TableCell>{item.kelasIII.toLocaleString()}</TableCell>
              <TableCell>{item.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-8">Jumlah Peserta BPJS Menurut Kelompok</h2>
      <Table className="border p-2 rounded-sm mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Kecamatan</TableHead>
            <TableHead>Non PBI</TableHead>
            <TableHead>PBI</TableHead>
            <TableHead>Jumlah</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataKelompok.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.kecamatan}</TableCell>
              <TableCell>{item.non_pbi.toLocaleString()}</TableCell>
              <TableCell>{item.pbi.toLocaleString()}</TableCell>
              <TableCell>{item.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className="mt-6" onClick={exportAllToExcel}>
        Export Semua ke Excel
      </Button>
    </>
  );
}
