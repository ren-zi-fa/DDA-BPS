import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.bpjsKecamatan.findMany()).map(
      (item) => item.kecamatan
    );
    return NextResponse.json({ message: "Data kecamatan ", data: data });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { kecamatan, kelas1, kelas2, kelas3 } = body;

    if (!kecamatan) {
      return NextResponse.json(
        { message: "Kecamatan wajib diisi" },
        { status: 400 }
      );
    }

    const kelasI = Number(kelas1);
    const kelasII = Number(kelas2);
    const kelasIII = Number(kelas3);

    const jumlah = kelasI + kelasII + kelasIII;

    const data = await prisma.bpjsKecamatan.create({
      data: {
        kecamatan,
        kelasI,
        kelasII,
        kelasIII,
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
