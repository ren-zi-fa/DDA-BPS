import { prisma } from "@/lib/db";
import { LanjutanKelahiranKematianSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.lanjutanKelahiranKematian.findMany()).map(
      (item) => item.bulan
    );
    return NextResponse.json({
      message: "data Banyaknya Lahir hidup dan Lahir Mati",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = LanjutanKelahiranKematianSchema.parse(await req.json());
    const {
      bulan,
      hidup_laki_laki,
      hidup_perempuan,
      mati_laki_laki,
      mati_perempuan,
    } = body;

    if (!bulan) {
      return NextResponse.json(
        { message: "bulan wajib diisi" },
        { status: 400 }
      );
    }

    const data = await prisma.lanjutanKelahiranKematian.create({
      data: {
        bulan,
        hidup_laki_laki,
        hidup_perempuan,
        mati_laki_laki,
        mati_perempuan,
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
