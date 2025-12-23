import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IbnuSinaRawatJalan } from "@/lib/generated/prisma/client";

interface Iprops {
  rawatJalan: IbnuSinaRawatJalan[];
}
export default function RawatJalan({ rawatJalan }: Iprops) {
  return (
    <>
      <h2>Rawat Jalan</h2>
      <Table className="border p-2 rounded-sm mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Bulan</TableHead>
            <TableHead>Bedah</TableHead>
            <TableHead>Gigi</TableHead>
            <TableHead>Kesehatan Anak</TableHead>
            <TableHead>Poli Kebidanan</TableHead>
            <TableHead>Umum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rawatJalan.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.bulan}</TableCell>
              <TableCell>{item.bedah.toLocaleString()}</TableCell>
              <TableCell>{item.kesehatan_anak.toLocaleString()}</TableCell>
              <TableCell>{item.poli_kebidanan.toLocaleString()}</TableCell>
              <TableCell>{item.gigi.toLocaleString()}</TableCell>
              <TableCell>{item.umum.toLocaleString()}</TableCell>
            </TableRow>
          ))}

          <TableRow className="font-bold">
            <TableCell colSpan={1}>Jumlah</TableCell>
            <TableCell></TableCell>
            <TableCell>
              {rawatJalan
                .reduce((sum, item) => sum + item.bedah, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {rawatJalan
                .reduce((sum, item) => sum + item.kesehatan_anak, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {rawatJalan
                .reduce((sum, item) => sum + item.poli_kebidanan, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {rawatJalan
                .reduce((sum, item) => sum + item.gigi, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {rawatJalan
                .reduce((sum, item) => sum + item.umum, 0)
                .toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
