import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.infoKecamatan.findMany({
      select: {
        id: true,
        kecamatan: true,
      },
      orderBy: {
        kecamatan: "asc",
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Gagal mengambil data kecamatan" },
      { status: 500 }
    );
  }
}
