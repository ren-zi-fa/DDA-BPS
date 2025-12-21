"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { File, Folder } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface FolderIconLinkProps {
  label: string;
  popover: string;
  href: string;
  size?: number;
}

export function FolderIconLink({
  label,
  popover,
  href,
  size = 48,
}: FolderIconLinkProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          onDoubleClick={() => {
            setOpen(false);
            router.push(href);
          }}
          className="inline-flex flex-col items-center gap-1 cursor-pointer"
        >
          <Folder size={size} className="text-slate-700  hover:text-slate-900" />
          <p className="text-sm text-center max-w-24 wrap-break-words">
            {label}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent side="left" sideOffset={10}>
        {popover}
      </PopoverContent>
    </Popover>
  );
}
