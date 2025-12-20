import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.bpjsKelompokKecamatan.findMany()).map(
      (item) => item.kecamatan
    );
    return NextResponse.json({
      message: "Data kelompok kecamatan ",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { kecamatan, penerima_bantuan_iuran, bukan_penerima_bantuan_iuran } =
      body;

    if (!kecamatan) {
      return NextResponse.json(
        { message: "Kecamatan wajib diisi" },
        { status: 400 }
      );
    }

    const pbi = penerima_bantuan_iuran;
    const non_pbi = bukan_penerima_bantuan_iuran;

    const jumlah = pbi + non_pbi;

    const data = await prisma.bpjsKelompokKecamatan.create({
      data: {
        kecamatan,
        pbi,
        non_pbi,
        jumlah,
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
