"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Form1 from "./_components/form1";
import Form2 from "./_components/form2";

export default function Page() {
  return (
    <div className="mt-10">
      <h1 className="text-xl text-center font-semibold">PASIEN RAWAT JALAN</h1>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/bumn-dan-swasta?tab=rawat-jalan">
          <MoveLeft className="size-12" />
        </Link>
      </Button>
      <Form1 />
      <Form2 />
    </div>
  );
}
