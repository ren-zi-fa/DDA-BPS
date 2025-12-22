import { NextRequest, NextResponse } from "next/server";
import { kecamatan as dataKecamatan } from "@/constant/menu";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ kecamatan: string }> }
) {
  try {
    const { kecamatan } = await params;

    const isValid = dataKecamatan.some(
      (item) => item.label.toLowerCase() === kecamatan.toLowerCase()
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Kecamatan tidak valid" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Berhasil disimpan",
        data: kecamatan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
