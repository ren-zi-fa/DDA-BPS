import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const data = await prisma.ibnuSinaRawatInap.findMany({
      select: {
        id: true,
        hari_rawat:true,
        jumlah_pasien:true,
        uraian:true,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching lanjutan ibnu sina rawat jalan:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}
