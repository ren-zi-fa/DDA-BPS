import { NextRequest, NextResponse } from "next/server";
import { kecamatan as dataKecamatan } from "@/constant/menu";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ kecamatan: string }> }
) {
  try {
    const { kecamatan } = await params;

    const isValid = dataKecamatan.some(
      (item) => item.label.toLowerCase() === kecamatan.toLowerCase()
    );
    const body = await req.json();
    const { nama_kecamatan, jumlah_nagari, jumlah_jorong } = body;
    if (!isValid) {
      return NextResponse.json(
        { message: "Kecamatan tidak valid" },
        { status: 400 }
      );
    }
    const result = await prisma.$transaction(async (tx) => {
      const kecamatanData = await tx.kecamatan.upsert({
        where: { nama: nama_kecamatan },
        update: {},
        create: {
          nama: nama_kecamatan,
        },
      });

      const existingInfo = await tx.informasiKecamatan.findUnique({
        where: {
          kecamatanId: kecamatanData.id,
        },
      });

      if (existingInfo) {
        throw new Error("DATA_SUDAH_ADA");
      }
      const info = await tx.jumlahJorongNagariKecamatan.create({
        data: {
          kecamatanId: kecamatanData.id,
          jumlah_jorong: jumlah_jorong,
          jumlah_nagari: jumlah_nagari,
        },
      });

      return info;
    });
    return NextResponse.json(
      {
        message: "Berhasil disimpan",
        data: kecamatan,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "DATA_SUDAH_ADA") {
      return NextResponse.json(
        { message: "Data kecamatan sudah tersimpan" },
        { status: 409 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ kecamatan: string }> }
) {
  try {
    const { kecamatan } = await params;

    const kecamatanDB = await prisma.kecamatan.findFirst({
      where: {
        nama: {
          equals: kecamatan,
          mode: "insensitive",
        },
      },
      include: {
        dataInformasi: true,
      },
    });

    if (!kecamatanDB) {
      return NextResponse.json(
        { message: "Data kecamatan tidak ditemukan", data: kecamatanDB },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "data kecamatan ada",
        data: kecamatanDB,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
