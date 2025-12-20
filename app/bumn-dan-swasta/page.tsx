"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import IndexFormIbnuSina from "./_components/IbnuSinaForm/IndexForm";
import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import { FolderIconLink } from "@/components/common/FolderIconLink";

export default function BUMNdanSwasta() {
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
          <TabsTrigger value="rawat-jalan">
            Pasien Rawat Jalan Ibnu Sina
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bpjs" className="mt-6">
          <FolderIconLink
            href="/bumn-dan-swasta/bpjs-kecamatan-stats"
            label="bpjs-kecamatan"
            popover="form bpjs kecamatan"
          />
          <FolderIconLink
            href="bpjs-kelompok-kecamatan-stats"
            label="bpjs-kelompok-kecamatan"
            popover="form bpjs kelompok kkecamatan"
          />
        </TabsContent>
        <TabsContent value="rawat-jalan" className="mt-6">
          <div className="rounded-lg  bg-background p-6 ">
            <IndexFormIbnuSina />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
