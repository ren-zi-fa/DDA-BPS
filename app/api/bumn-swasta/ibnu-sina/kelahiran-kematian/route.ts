import { prisma } from "@/lib/db";
import { KelahiranKematianSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.kelahiranKematian.findMany()).map(
      (item) => item.bulan
    );
    return NextResponse.json({
      message: "data Banyaknya Kelahiran, Lahir Hidup, Lahir Mati & Keguguran ",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = KelahiranKematianSchema.parse(await req.json());

    const { bulan, bersalin, keguguran } = body;

    if (!bulan) {
      return NextResponse.json(
        { message: "bulan wajib diisi" },
        { status: 400 }
      );
    }

    const data = await prisma.kelahiranKematian.create({
      data: {
        bulan,
        keguguran,
        bersalin,
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
