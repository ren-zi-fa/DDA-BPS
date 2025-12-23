import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const data = await prisma.fasilitas.findMany({
      select: {
        id: true,
        dua_ribu_20: true,
        dua_ribu_21: true,
        dua_ribu_22: true,
        dua_ribu_23: true,
        dua_ribu_24: true,
        fasilitas: true,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching Fasilitas:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}
