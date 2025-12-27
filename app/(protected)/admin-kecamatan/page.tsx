import { kecamatan } from "@/constant/menu";
import KecamatanList from "./_components/KecamatanList";

export default function Page() {
  return (
    <>
      <KecamatanList data={kecamatan} />
    </>
  );
}
