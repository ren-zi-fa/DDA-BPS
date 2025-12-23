import { FileIconLink } from "@/components/common/FileIconLink";

export default function Page() {
  return (
    <>
      <div className="flex gap-4 sapce-x-5 mt-10">
      <FileIconLink href="/admin-bumn-swasta/bumn" label="BUMN"/>
      <FileIconLink href="/admin-bumn-swasta/swasta" label="SWASTA"/>
      </div>
    </>
  );
}
