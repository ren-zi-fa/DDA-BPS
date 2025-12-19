import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { kecamatan as KECAMATAN } from "@/constant/menu";
type Props = {
  submittedItem?: string[];
};
export function KecamatanCheckbox({ submittedItem }: Props) {
  const toggleKecamatan = (label: string) => {};

  return (
    <div>
      <Label className="mb-3 tracking-wider block text-green-500  text-xs">
        Data Kecamatan Yang Sudah Diinputkan otomatis terceklis
      </Label>

      <div className="flex flex-col gap-3">
        {KECAMATAN.map((kec) => (
          <div key={kec.key} className="flex items-center gap-2">
            <Checkbox
              disabled
              id={`kec-${kec.key}`}
              checked={submittedItem?.includes(kec.label)}
              onCheckedChange={() => toggleKecamatan(kec.label)}
            />
            <Label htmlFor={`kec-${kec.key}`} className="cursor-pointer">
              {kec.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
