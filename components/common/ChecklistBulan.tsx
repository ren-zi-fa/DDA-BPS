import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { bulan } from "@/constant/menu";

type Props = {
  submittedItem?: string[];
};
export function BulanCheckbox({ submittedItem }: Props) {
  return (
    <div>
      <Label className="mb-3 tracking-wider block text-green-500  text-xs">
        Data bulan Yang Sudah Diinputkan otomatis terceklis
      </Label>

      <div className="flex flex-col gap-3">
        {bulan.map((bln) => (
          <div key={bln.key} className="flex items-center gap-2">
            <Checkbox
              disabled
              id={`bln-${bln.key}`}
              checked={submittedItem?.includes(bln.label)}
            />
            <Label htmlFor={`bln-${bln.key}`} className="cursor-pointer">
              {bln.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
