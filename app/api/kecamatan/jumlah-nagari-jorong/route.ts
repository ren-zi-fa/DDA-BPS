import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.jumlahNagariJorong.findMany()).map(
      (item) => item.kecamatan
    );
    return NextResponse.json({ message: "Data kecamatan ", data: data });
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { kecamatan, jumlah_nagari, jumlah_jorong } = body;

    if (!kecamatan) {
      return NextResponse.json(
        { message: "Kecamatan wajib diisi" },
        { status: 400 }
      );
    }

    const data = await prisma.jumlahNagariJorong.create({
      data: {
        kecamatan,
        jumlah_jorong,
        jumlah_nagari,
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
