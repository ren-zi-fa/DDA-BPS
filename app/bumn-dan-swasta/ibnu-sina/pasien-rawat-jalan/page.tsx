"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Form1 from "./_components/form1";
import Form2 from "./_components/form2";

export default function page() {
  return (
    <div className="mt-10">
      {/* tablel 4.2.15 */}
      <Button variant="ghost" size="icon" asChild>
        <Link href="/bumn-dan-swasta?tab=rawat-jalan">
          <MoveLeft className="size-12" />
        </Link>
      </Button>
      <Form1 />
      <Form2 />
      {/* Lanjutan Tabel 4.2.15 */}
    </div>
  );
}
