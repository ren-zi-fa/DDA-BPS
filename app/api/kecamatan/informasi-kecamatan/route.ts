import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.infoKecamatan.findMany()).map(
      (item) => item.kecamatan
    );
    return NextResponse.json({ message: "Data kecamatan ", data: data });
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      kecamatan,
      luas_kecamatan,
      batas_kecamatan_utara,
      batas_kecamatan_selatan,
      batas_kecamatan_barat,
      batas_kecamatan_timur,
      nama_camat,
      ketinggian_mdl,
    } = body;

    if (!kecamatan) {
      return NextResponse.json(
        { message: "Kecamatan wajib diisi" },
        { status: 400 }
      );
    }

    const data = await prisma.infoKecamatan.create({
      data: {
        kecamatan,
        batas_barat: batas_kecamatan_barat,
        batas_selatan: batas_kecamatan_selatan,
        batas_timur: batas_kecamatan_timur,
        nama_camat: nama_camat,
        batas_utara: batas_kecamatan_utara,
        ketinggian_dari_permukaan_laut: ketinggian_mdl,
        luas_kecamatan: luas_kecamatan,
      },
    });

    return NextResponse.json(
      { message: "Data berhasil disimpan", data },
      { status: 201 }
    );
  } catch (error: any) {
    // Error unik constraint (tahun + kecamatan)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Data kecamatan untuk tahun ini sudah ada" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
