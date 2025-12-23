import { IbnuSinaRawatInap } from "@/lib/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IProps {
  inap: IbnuSinaRawatInap[];
}

export default function RawatInap({ inap }: IProps) {
  const totalPasien = inap.reduce((sum, item) => sum + item.jumlah_pasien, 0);
  const totalHariRawat = inap.reduce((sum, item) => sum + item.hari_rawat, 0);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Rawat Inap</h2>
      <Table className="border rounded-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2">No</TableHead>
            <TableHead className="px-4 py-2">Uraian</TableHead>
            <TableHead className="px-4 py-2 text-right">
              Jumlah Pasien
            </TableHead>
            <TableHead className="px-4 py-2 text-right">Hari Rawat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inap.map((item, index) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-2">{index + 1}</TableCell>
              <TableCell className="px-4 py-2">{item.uraian}</TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.jumlah_pasien.toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.hari_rawat.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold bg-gray-100">
            <TableCell className="px-4 py-2">Jumlah</TableCell>
            <TableCell></TableCell>
            <TableCell className="px-4 py-2 text-right">
              {totalPasien.toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2 text-right">
              {totalHariRawat.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
