import ButtonBack from "@/components/common/boilerplate/ButtonBack";
import { FileIconLink } from "@/components/common/FileIconLink";
import { kecamatan } from "@/constant/menu";

export default function Page() {
  return (
    <div className="min-h-screen w-xl mx-auto my-10">
      <ButtonBack linkUrl="/"/>
      <div className="grid grid-cols-4">
        {kecamatan.map((data) => (
          <FileIconLink
            key={data.label}
            href={`/kecamatan/${data.label.toLocaleLowerCase()}`}
            label={data.label}
          />
        ))}
      </div>
    </div>
  );
}
