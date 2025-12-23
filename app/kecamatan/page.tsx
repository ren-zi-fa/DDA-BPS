import { FileIconLink } from "@/components/common/FileIconLink";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Button asChild>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>
      <div className="flex flex-row justify-center mt-10">
        <FileIconLink
          label="Informasi Kecamatan"
          href="/kecamatan/info-kecamatan"
        />
        <FileIconLink
          label="Jumlah Nagari dan Jorong pada tiap Kecamatan"
          href="/kecamatan/jumlah-nagari-jorong"
        />
        <FileIconLink
          label="Nama Nama Wali Nagari dan Kepala Jorong"
          href="/kecamatan/nama-wali-nagari-jorong"
        />
      </div>
    </div>
  );
}
