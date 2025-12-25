import { prisma } from "@/lib/db";
import { RawatInapSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.ibnuSinaRawatInap.findMany()).map(
      (item) => item.uraian
    );
    return NextResponse.json({
      message: "data rawat inap per uraian ",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = RawatInapSchema.parse(await req.json());
    const { uraian, jumlah_pasien, hari_rawat } = body;

    if (!uraian) {
      return NextResponse.json(
        { message: "uraian wajib diisi" },
        { status: 400 }
      );
    }
    const data = await prisma.ibnuSinaRawatInap.create({
      data: {
        uraian,
        hari_rawat,
        jumlah_pasien,
      },
    });

    return NextResponse.json(
      { message: "Data berhasil disimpan", data },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Data uraian untuk tahun ini sudah ada" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
