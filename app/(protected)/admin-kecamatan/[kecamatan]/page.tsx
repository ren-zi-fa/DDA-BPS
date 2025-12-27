import type { Metadata } from "next";
import { TableCell } from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { KeyValueTable } from "../_components/KeyValueTable";
import { TwoColumnStatTable } from "../_components/TwoColumnStateTable";
import { SimpleListTable } from "../_components/SimpleListTable";
import { SheetData } from "@/helper/ExportExcel";
import { ExportExcelButton } from "../_components/ExportToExcelButton";

type Props = {
  params: Promise<{ kecamatan: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const kec = decodeURIComponent((await params).kecamatan);

  return {
    title: "Table " + kec,
    description: "Data kecamatan",
  };
}

export default async function Page({ params }: Props) {
  const kecamatanParam = (await params).kecamatan;
  const data = await prisma.infoKecamatan.findUnique({
    where: {
      kecamatan: decodeURIComponent(kecamatanParam),
    },
    include: {
      nagari: true,
      jorong: true,

      saranaPendidikan: true,
      saranaKesehatan: true,
      saranaPeribadatan: true,
      giziBuruk: true,
      pasar: true,
    },
  });

  console.log(data);
  if (!data) {
    return <p>Data tidak ditemukan</p>;
  }
  const pendidikan = data.saranaPendidikan[0];
  const kesehatan = data.saranaKesehatan[0];
  const peribadatan = data.saranaPeribadatan[0];
  const gizi = data.giziBuruk[0];

  const sheets: SheetData[] = [
    {
      sheetName: "Info Kecamatan",
      data: [
        { Keterangan: "Nama Camat", Nilai: data.nama_camat },
        { Keterangan: "Luas Kecamatan", Nilai: data.luas_kecamatan },
        { Keterangan: "Batas Utara", Nilai: data.batas_utara },
        { Keterangan: "Batas Selatan", Nilai: data.batas_selatan },
        { Keterangan: "Batas Barat", Nilai: data.batas_barat },
        { Keterangan: "Batas Timur", Nilai: data.batas_timur },
        {
          Keterangan: "Ketinggian DPL",
          Nilai: data.ketinggian_dari_permukaan_laut,
        },
      ],
    },
    {
      sheetName: "Nagari",
      data: data.nagari.map((n, i) => ({
        No: i + 1,
        "Nama Nagari": n.nama,
        "Wali Nagari": n.kepala_nagari,
      })),
    },
    {
      sheetName: "Jorong",
      data: data.jorong.map((j, i) => ({
        No: i + 1,
        "Nama Jorong": j.nama,
        "Kepala Jorong": j.kepala_jorong,
      })),
    },
    {
      sheetName: "Sarana Pendidikan",
      data: [
        {
          Fasilitas: "TK",
          Jumlah: pendidikan.jumlahTK,
        },
        { Fasilitas: "RA", Jumlah: pendidikan.jumlahRA },
        { Fasilitas: "SD", Jumlah: pendidikan.jumlahSD },
        { Fasilitas: "MI", Jumlah: pendidikan.jumlahMI },
        { Fasilitas: "SMP", Jumlah: pendidikan.jumlahSMP },
        { Fasilitas: "MTsN", Jumlah: pendidikan.jumlahMTsn },
        { Fasilitas: "SMA", Jumlah: pendidikan.jumlahSMA },
        { Fasilitas: "SMK", Jumlah: pendidikan.jumlahSMK },
        { Fasilitas: "MAN", Jumlah: pendidikan.jumlahMAN },
      ],
      totalFields: ["Jumlah"],
    },
    {
      sheetName: "Sarana Kesehatan",
      data: [
        { Fasilitas: "Rumah Sakit", Jumlah: kesehatan.jumlahRumahSakit },
        {
          Fasilitas: "RS Bersalin",
          Jumlah: kesehatan.jumlahRumahSakitBersalin,
        },
        {
          Fasilitas: "Poliklinik",
          Jumlah: kesehatan.jumlahPoliklinikBalaiKesehatan,
        },
        {
          Fasilitas: "Puskesmas Rawat Inap",
          Jumlah: kesehatan.jumlahPuskesmasRawatInap,
        },
        {
          Fasilitas: "Puskesmas Non Rawat Inap",
          Jumlah: kesehatan.jumlahPuskesmasTanpaRawatInap,
        },
        {
          Fasilitas: "Puskesmas Pembantu",
          Jumlah: kesehatan.jumlahPuskesmasPembantu,
        },
        { Fasilitas: "Polindes", Jumlah: kesehatan.jumlahPolindes },
        { Fasilitas: "Posyandu", Jumlah: kesehatan.jumlahPosyandu },
        { Fasilitas: "Apotik", Jumlah: kesehatan.jumlahApotik },
      ],
      totalFields: ["Jumlah"],
    },
    {
      sheetName: "Gizi Buruk",
      data: [
        {
          Uraian: "Jumlah Penderita Gizi Buruk",
          Jumlah: gizi.jumlah_gizi_buruk,
        },
      ],
    },
    {
      sheetName: "Pasar",
      data: data.pasar.map((p) => ({
        "Nama Pasar": p.nama,
        "Hari Pasar": p.hari,
      })),
    },
  ];

  return (
    <>
      {/* ================= INFORMASI KECAMATAN ================= */}
      <section>
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Informasi {data.kecamatan}
        </h2>

        <div className="border rounded-sm p-4 shadow-sm">
          <KeyValueTable
            items={[
              { label: "Kecamatan", value: data.kecamatan },
              { label: "Nama Camat", value: data.nama_camat },
              { label: "Luas Kecamatan", value: data.luas_kecamatan },
              { label: "Batas Utara", value: data.batas_utara },
              { label: "Batas Selatan", value: data.batas_selatan },
              { label: "Batas Barat", value: data.batas_barat },
              { label: "Batas Timur", value: data.batas_timur },
              {
                label: "Ketinggian dpl",
                value: data.ketinggian_dari_permukaan_laut,
              },
            ]}
          />
        </div>
      </section>
      {/* ================= JUMLAH NAGARI & JORONG ================= */}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Jumlah Nagari dan Jorong
        </h2>

        <div className="border rounded-sm p-4 shadow-sm">
          <KeyValueTable
            items={[
              { label: "Kecamatan", value: data.kecamatan },
              { label: "Jumlah Nagari", value: data.jmlh_nagari },
              { label: "Jumlah Jorong", value: data.jmlh_jorong },
            ]}
          />
        </div>
      </section>
      {/* ================= DATA NAGARI ================= */}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Data Nagari
        </h2>

        <SimpleListTable
          headers={["No", "Nama Nagari", "Nama Wali Nagari"]}
          data={data.nagari}
          renderRow={(n, i) => (
            <>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{n.nama}</TableCell>
              <TableCell>{n.kepala_nagari}</TableCell>
            </>
          )}
        />
      </section>
      {/* ================= DATA JORONG ================= */}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Data Jorong
        </h2>

        <SimpleListTable
          headers={["No", "Nama Jorong", "Nama Kepala Jorong"]}
          data={data.jorong}
          renderRow={(j, i) => (
            <>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{j.nama}</TableCell>
              <TableCell>{j.kepala_jorong}</TableCell>
            </>
          )}
        />
      </section>
      {/* ================= SARANA PENDIDIKAN ================= */}{" "}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Jumlah Sarana Pendidikan
        </h2>
        <TwoColumnStatTable
          title="Sarana Pendidikan"
          rows={[
            { label: "TK", value: pendidikan.jumlahTK },
            { label: "RA", value: pendidikan.jumlahRA },
            { label: "SD", value: pendidikan.jumlahSD },
            { label: "MI", value: pendidikan.jumlahMI },
            { label: "SMP", value: pendidikan.jumlahSMP },
            { label: "MTsN", value: pendidikan.jumlahMTsn },
            { label: "SMA", value: pendidikan.jumlahSMA },
            { label: "SMK", value: pendidikan.jumlahSMK },
            { label: "MAN", value: pendidikan.jumlahMAN },
          ]}
        />
      </section>
      {/* ================= SARANA KESEHATAN ================= */}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Jumlah Sarana Kesehatan
        </h2>
        <TwoColumnStatTable
          title="Sarana Kesehatan"
          rows={[
            { label: "Rumah Sakit", value: kesehatan.jumlahRumahSakit },
            {
              label: "Rumah Sakit Bersalin",
              value: kesehatan.jumlahRumahSakitBersalin,
            },
            {
              label: "Poliklinik / Balai Kesehatan",
              value: kesehatan.jumlahPoliklinikBalaiKesehatan,
            },
            {
              label: "Puskesmas Rawat Inap",
              value: kesehatan.jumlahPuskesmasRawatInap,
            },
            {
              label: "Puskesmas Non Rawat Inap",
              value: kesehatan.jumlahPuskesmasTanpaRawatInap,
            },
            {
              label: "Puskesmas Pembantu",
              value: kesehatan.jumlahPuskesmasPembantu,
            },
            { label: "Polindes", value: kesehatan.jumlahPolindes },
            { label: "Posyandu", value: kesehatan.jumlahPosyandu },
            { label: "Apotik", value: kesehatan.jumlahApotik },
          ]}
        />
      </section>
      {/* ================= GIZI BURUK ================= */}
      <section className="mt-6">
        <p className="font-semibold">
          Jumlah Penderita Gizi Buruk Tahun 2024 :{" "}
          <span className="text-red-600">{gizi.jumlah_gizi_buruk}</span>
        </p>
      </section>
      <TwoColumnStatTable
        title="Sarana Peribadatan"
        rows={[
          { label: "Masjid", value: peribadatan.jumlahMesjid },
          {
            label: "Mushalla",
            value: peribadatan.jumlahMushala,
          },
          {
            label: "Gereja Protestan",
            value: peribadatan.jumlahGerejaProtestan,
          },
          {
            label: "Gereja Katolik",
            value: peribadatan.jumlahGerejaKatolik,
          },
          {
            label: "Wihara",
            value: peribadatan.jumlahWihara,
          },
        ]}
      />
      {/* ================= PASAR ================= */}
      <section className="mt-6">
        <h2 className="text-lg font-medium text-slate-700 border-b pb-2">
          Pasar dan Hari Pasar
        </h2>

        <SimpleListTable
          headers={["Nama Pasar", "Hari Pasar"]}
          data={data.pasar}
          renderRow={(p) => (
            <>
              <TableCell>{p.nama}</TableCell>
              <TableCell>{p.hari}</TableCell>
            </>
          )}
        />
      </section>
      <ExportExcelButton
        sheets={sheets}
        fileName={`Data Kecamatan ${data.kecamatan}.xlsx`}
        className="my-6"
      />
    </>
  );
}
