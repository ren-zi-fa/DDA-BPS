import { prisma } from "@/lib/db";
import { FasilitasIbnuSinaSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.fasilitas.findMany()).map(
      (item) => item.fasilitas
    );
    return NextResponse.json({
      message: "data fasilitas",
      data: data,
    });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = FasilitasIbnuSinaSchema.parse(await req.json());
    const {
      fasilitas,
      dua_ribu_20,
      dua_ribu_21,
      dua_ribu_22,
      dua_ribu_23,
      dua_ribu_24,
    } = body;

    if (!fasilitas) {
      return NextResponse.json(
        { message: "fasilitas wajib diisi" },
        { status: 400 }
      );
    }

    const data = await prisma.fasilitas.create({
      data: {
        fasilitas,
        dua_ribu_20,
        dua_ribu_21,
        dua_ribu_22,
        dua_ribu_23,
        dua_ribu_24,
      },
    });

    return NextResponse.json(
      { message: "Data berhasil disimpan", data },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Data fasilitas sudah ada" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
