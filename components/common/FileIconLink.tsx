"use client";


import { File } from "lucide-react";

import Link from "next/link";

interface FolderIconLinkProps {
  label: string;
  href: string;
  size?: number;
}

export function FileIconLink({
  label,
  href,
  size = 48,
}: FolderIconLinkProps) {
  return (
    <>
      <Link href={href} className="flex flex-col items-center">
        <File size={size} className="text-slate-700  hover:text-slate-900" />
        <p className="text-sm text-center max-w-24 wrap-break-words">{label}</p>
      </Link>
    </>
  );
}
