import { prisma } from "@/lib/db";
import { KecamatanSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ kecamatan: string }> }
) {
  try {
    const kecamatanParam = (await params).kecamatan;
    const parsed = decodeURIComponent(kecamatanParam);

    const kecamatan = await prisma.namaKecamatan.findFirst({
      where: { label: parsed },
    });

    if (!kecamatan) {
      return NextResponse.json(
        { message: "Kecamatan tidak terdaftar" },
        { status: 404 }
      );
    }
    const body = KecamatanSchema.parse(await req.json());

    const {
      batas_kec_barat,
      gizi_buruk,
      pasar,
      sarana_kesehatan,
      sarana_pendidikan,
      sarana_peribadatan,
      batas_kec_selatan,
      batas_kec_timur,
      batas_kec_utara,
      jorong,
      jmlh_jorong,
      jmlh_nagari,
      nama_camat,
      ketinggian_permukaan_laut,
      luas_kecamatan,
      nagari,
    } = body;

    await prisma.infoKecamatan.create({
      data: {
        kecamatan: kecamatanParam,
        nama_camat,
        luas_kecamatan,
        batas_utara: batas_kec_utara,
        batas_selatan: batas_kec_selatan,
        batas_barat: batas_kec_barat,
        batas_timur: batas_kec_timur,
        ketinggian_dari_permukaan_laut: ketinggian_permukaan_laut,
        jmlh_jorong,
        jmlh_nagari,

        // ===== relasi array =====
        nagari: {
          create: nagari.map((n) => ({
            nama: n.nama_nagari,
            kepala_nagari: n.kepala_nagari,
          })),
        },

        jorong: {
          create: jorong.map((j) => ({
            nama: j.nama_jorong,
            kepala_jorong: j.kepala_jorong,
          })),
        },

        pasar: {
          create: pasar.map((p) => ({
            nama: p.nama,
            hari: p.hari,
          })),
        },

        // ===== relasi object tunggal =====
        saranaPendidikan: {
          create: {
            jumlahTK: sarana_pendidikan.jumlahTK,
            jumlahRA: sarana_pendidikan.jumlahRA,
            jumlahSD: sarana_pendidikan.jumlahSD,
            jumlahMI: sarana_pendidikan.jumlahMI,
            jumlahSMP: sarana_pendidikan.jumlahSMP,
            jumlahMTsn: sarana_pendidikan.jumlahMTsn,
            jumlahSMA: sarana_pendidikan.jumlahSMA,
            jumlahSMK: sarana_pendidikan.jumlahSMK,
            jumlahMAN: sarana_pendidikan.jumlahMAN,
          },
        },

        saranaPeribadatan: {
          create: {
            jumlahMesjid: sarana_peribadatan.jumlahMesjid,
            jumlahMushala: sarana_peribadatan.jumlahMushala,
            jumlahGerejaKatolik: sarana_peribadatan.jumlahGerejaKatolik,
            jumlahGerejaProtestan: sarana_peribadatan.jumlahGerejaProtestan,
            jumlahWihara: sarana_peribadatan.jumlahWihara,
          },
        },

        saranaKesehatan: {
          create: {
            jumlahRumahSakit: sarana_kesehatan.jumlahRumahSakit,
            jumlahRumahSakitBersalin: sarana_kesehatan.jumlahRumahSakitBersalin,
            jumlahPoliklinikBalaiKesehatan:
              sarana_kesehatan.jumlahPoliklinikBalaiKesehatan,
            jumlahPuskesmasRawatInap: sarana_kesehatan.jumlahPuskesmasRawatInap,
            jumlahPuskesmasTanpaRawatInap:
              sarana_kesehatan.jumlahPuskesmasTanpaRawatInap,
            jumlahPuskesmasPembantu: sarana_kesehatan.jumlahPuskesmasPembantu,
            jumlahPolindes: sarana_kesehatan.jumlahPolindes,
            jumlahPosyandu: sarana_kesehatan.jumlahPosyandu,
            jumlahApotik: sarana_kesehatan.jumlahApotik,
          },
        },

        giziBuruk: {
          create: {
            jumlah_gizi_buruk: gizi_buruk.jumlah_gizi_buruk,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Data berhasil disimpan", succes: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Input tidak valid", errors: error.flatten() },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server", succes: false },
      { status: 500 }
    );
  }
}
