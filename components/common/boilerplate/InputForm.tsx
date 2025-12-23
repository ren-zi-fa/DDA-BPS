import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string;
  label: string;
  type?: string;
  disable?: boolean;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export function InputForm({
  name,
  placeholder,
  value,
  label,
  disable,
  type = "number",
  onChange,
}: InputProps) {
  return (
    <div>
      <Label className="my-3" htmlFor={name}>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        disabled={disable}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
