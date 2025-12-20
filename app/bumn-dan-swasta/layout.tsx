import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUMN dan Swasta",
  description:
    "sebuah system yang berfungsi untuk membandingkan alternatif wilayah kecamatan yang ada di pasaman barat untuk keperluan pemilihan lahan kosong ",
};
export default async function BUMNdanSwastaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl px-4">{children}</div>
    </div>
  );
}
