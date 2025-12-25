import { prisma } from "@/lib/db";
import { RawatJalanSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.ibnuSinaRawatJalan.findMany()).map(
      (item) => item.bulan
    );
    return NextResponse.json({
      message: "data rawat jalan per bulan ",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = RawatJalanSchema.parse(await req.json());

    const { bulan, bedah, gigi, kesehatan_anak, poli_kebidanan, umum } = body;

    if (!bulan) {
      return NextResponse.json(
        { message: "bulan wajib diisi" },
        { status: 400 }
      );
    }

    const DTbedah = bedah;
    const DTgigi = gigi;
    const DTkesehatanAnak = kesehatan_anak;
    const DTpoli_kebidanan = poli_kebidanan;
    const DTumum = umum;

    const data = await prisma.ibnuSinaRawatJalan.create({
      data: {
        bulan,
        bedah: DTbedah,
        gigi: DTgigi,
        kesehatan_anak: DTkesehatanAnak,
        poli_kebidanan: DTpoli_kebidanan,
        umum: DTumum,
      },
    });

    return NextResponse.json(
      { message: "Data berhasil disimpan", data },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Data bulan untuk tahun ini sudah ada" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
