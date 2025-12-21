"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileIconLink } from "@/components/common/FileIconLink";
import ButtonBack from "@/components/common/boilerplate/ButtonBack";

export default function BUMNdanSwastaPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "bpjs";

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <ButtonBack linkUrl="/" />
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Data BUMN dan Swasta
        </h1>
        <p className="text-sm text-muted-foreground">
          Input dan pengelolaan data BPJS serta pasien rawat jalan
        </p>
      </header>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bpjs">Penyelenggara BPJS</TabsTrigger>
          <TabsTrigger value="ibnu-sina-yarsi">Ibnu Sina Yarsi</TabsTrigger>
        </TabsList>
        <TabsContent value="bpjs" className="mt-6">
          <h1 className="my-4">Sheet :</h1>
          <div className="flex ">
            <FileIconLink
              href="/bumn-dan-swasta/bpjs-kecamatan-stats"
              label="bpjs-kecamatan"
            />
            <FileIconLink
              href="/bumn-dan-swasta/bpjs-kelompok-kecamatan-stats"
              label="bpjs-kelompok-kecamatan"
            />
          </div>
        </TabsContent>
        <TabsContent value="ibnu-sina-yarsi" className="mt-6 space-x-5">
          <h1 className="my-4">Sheet :</h1>
          <div className="grid grid-cols-3 lg:grid-cols-5">
            <FileIconLink
              href="/bumn-dan-swasta/ibnu-sina/pasien-rawat-jalan"
              label="pasien-rawat-jalan"
            />
            <FileIconLink
              href="/bumn-dan-swasta/ibnu-sina/pasien-rawat-inap"
              label="pasien-rawat-inap"
            />
            <FileIconLink
              href="/bumn-dan-swasta/ibnu-sina/fasilitas"
              label="fasilitas"
            />
            <FileIconLink
              href="/bumn-dan-swasta/ibnu-sina/kelahiran-kematian"
              label="kelahiran dan kematian"
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
