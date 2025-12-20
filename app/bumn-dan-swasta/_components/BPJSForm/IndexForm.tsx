"use client";

import BpjsKecamatanStats from "./BpjsKecamatanStats";
import BpjsKelompokKecamatanStats from "./BpjsKelompokKecamatanStats";

export default function IndexFormBPJS() {
  return (
    <div className="space-y-4 mx-auto">
      <BpjsKecamatanStats />
      <BpjsKelompokKecamatanStats />
    </div>
  );
}
