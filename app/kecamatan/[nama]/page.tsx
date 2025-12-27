import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import FormKecamatan from "./_components/FormKecamatan";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ nama: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nama = (await params).nama;

  return {
    title: "Form " + decodeURIComponent(nama),
    description: "data",
  };
}

export default async function Page({ params }: Props) {
  const { nama } = await params;

  const kecamatan = await prisma.namaKecamatan.findFirst({
    where: {
      label: {
        equals: decodeURIComponent(nama),
        mode: "insensitive",
      },
    },
  });
  if (!kecamatan) {
    return notFound();
  }

  return (
    <div className="w-5xl mx-auto mt-10 mb-30 ">
      <ButtonBack linkUrl="/kecamatan" />
      <FormKecamatan nama_kec={kecamatan.label} />
    </div>
  );
}
