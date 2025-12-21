"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { mainMenu } from "@/constant/menu";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tiles } from "@/components/common/Tails";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-7 overflow-hidden">
      <Tiles className="absolute inset-0 -z-10" />
      <div className="flex flex-col gap-6 z-10">
        {mainMenu.map((item) => (
          <CardMenu key={item.label} url={item.url} title={item.label} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 select-none "
      >
        <div className="flex mt-10 lg:mt-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <img
            src="/logo_bps.png"
            alt="Logo BPS"
            className="
            w-10 h-10
            sm:w-10 sm:h-10
            md:w-12 md:h-12
            lg:w-32 lg:h-32
            opacity-90
             "
          />

          <span
            className="
            font-extrabold tracking-widest
            text-[20px]
            sm:text-sm
            md:text-lg
            lg:text-5xl
            leading-none
            bg-linear-to-r from-[#005BAC] via-[#00A859] to-[#F7941D]
            bg-clip-text text-transparent
             "
          >
            BPS PASAMAN BARAT
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function CardMenu({ title, url }: { title: string; url: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-xl " />
      <Card className="relative z-10 w-90  rounded-xl ">
        <Link href={url}>
          <CardContent className="flex items-center gap-4 text-white px-6 py-4">
            <ChevronRight className="w-8 h-8 shrink-0" />
            <h1 className="text-lg font-medium">{title}</h1>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}

{
  /* <h1
        className="font-extrabold uppercase tracking-widest
 text-[clamp(3rem,10vw,4rem)]
 bg-linear-to-r from-[#005BAC] via-[#00A859] to-[#F7941D]
 bg-clip-text text-transparent"
      >
        DDA 2026
      </h1> */
}
