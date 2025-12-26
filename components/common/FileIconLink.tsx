"use client";

import { File, FileCheck } from "lucide-react";
import Link from "next/link";

interface FileIcon {
  label: string;
  href: string;
  size?: number;
  status?: boolean;
}

export function FileIconLink({
  label,
  href,
  size = 48,
  status = false,
}: FileIcon) {
  const Icon = status ? FileCheck : File;

  const iconClass = status
    ? "text-green-600 hover:text-green-700"
    : "text-slate-700 hover:text-slate-900";

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon size={size} className={iconClass} />
      <p className="text-sm text-center max-w-24 wrap-break-words">{label}</p>
    </Link>
  );
}
