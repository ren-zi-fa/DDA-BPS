"use client";

import * as XLSX from "xlsx";
import clsx from "clsx";

export interface SheetData {
  sheetName: string;
  data: Record<string, any>[];
  totalFields?: string[];
}

type Props = {
  sheets: SheetData[];
  fileName: string;
  className?: string;
};

export function ExportExcelButton({
  sheets,
  fileName,
  className,
}: Props) {
  function exportToExcel() {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      const { sheetName, data, totalFields } = sheet;
      const sheetData = [...data];

      if (totalFields && totalFields.length > 0 && data.length > 0) {
        const totalRow: Record<string, any> = {};

        totalFields.forEach((key) => {
          totalRow[key] = data.reduce(
            (sum, row) => sum + (Number(row[key]) || 0),
            0
          );
        });

        const labelKeys = ["Uraian", "Fasilitas", "Nama"];
        const labelKey = labelKeys.find((k) => k in data[0]);
        if (labelKey) totalRow[labelKey] = "Total";

        sheetData.push(totalRow);
      }

      const ws = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    });

    XLSX.writeFile(workbook, fileName);
  }

  return (
    <button
      onClick={exportToExcel}
      className={clsx(
        "px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700",
        className
      )}
    >
      Export To Excel
    </button>
  );
}
