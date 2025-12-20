"use client";

import JumlahFasilitas from "./JumlahFasilitas";
import KehidupanForm from "./KehidupanForm";
import KelahiranForm from "./KelahiranForm";



export default function IndexFormIbnuSina() {
  return (
    <div className="space-y-4 mx-auto  gap-8 grid  grid-cols-1 md:grid-cols-2">
      <JumlahFasilitas />
      <KehidupanForm />
      <KelahiranForm />
    </div>
  );
}
