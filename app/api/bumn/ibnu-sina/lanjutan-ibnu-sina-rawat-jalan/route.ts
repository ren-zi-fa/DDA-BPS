import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = (await prisma.lanjutanIbnuSinaRawatJalan.findMany()).map(
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
    const body = await req.json();
    const { bulan2, penyakit_dalam, jiwa, tht, mata, neurologi, fisioterapi } =
      body;

    if (!bulan2) {
      return NextResponse.json(
        { message: "bulan wajib diisi" },
        { status: 400 }
      );
    }

    const DTpenyakit_dalam = penyakit_dalam;
    const DTjiwa = jiwa;
    const DTtht = tht;
    const DTmatan = mata;
    const DTneurologi = neurologi;
    const DTfisioterapi = fisioterapi;

    const data = await prisma.lanjutanIbnuSinaRawatJalan.create({
      data: {
        bulan: bulan2,
        penyakit_dalam: DTpenyakit_dalam,
        jiwa: DTjiwa,
        tht: DTtht,
        mata: DTmatan,
        fisioterapi: DTfisioterapi,
        neurologi: DTneurologi,
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
