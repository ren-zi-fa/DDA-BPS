import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FieldValues, UseFormReturn, Path } from "react-hook-form";
type FieldProps<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};
export const InputNumericField = <T extends FieldValues>({
  form,
  label,
  name,
}: FieldProps<T>) => (
  <FormField
    control={form.control}
    name={name as Path<T>}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type="number"
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

