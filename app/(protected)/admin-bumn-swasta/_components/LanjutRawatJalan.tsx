import { LanjutanIbnuSinaRawatJalan } from "@/lib/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Iprops {
  lanjutan: LanjutanIbnuSinaRawatJalan[];
}
export default function LanjutanRawatJalan({ lanjutan }: Iprops) {
  return (
    <>
      <h2 className="mt-8">Rawat Lanjutan</h2>
      <Table className="border p-2 rounded-sm mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Bulan</TableHead>
            <TableHead>Fisioterapi</TableHead>
            <TableHead>Jiwa</TableHead>
            <TableHead>Mata</TableHead>
            <TableHead>Neurologi</TableHead>
            <TableHead>Penyakit Dalam</TableHead>
            <TableHead>THT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lanjutan.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.bulan}</TableCell>
              <TableCell>{item.penyakit_dalam.toLocaleString()}</TableCell>
              <TableCell>{item.jiwa.toLocaleString()}</TableCell>
              <TableCell>{item.tht.toLocaleString()}</TableCell>
              <TableCell>{item.mata.toLocaleString()}</TableCell>
              <TableCell>{item.neurologi.toLocaleString()}</TableCell>
              <TableCell>{item.fisioterapi.toLocaleString()}</TableCell>
            </TableRow>
          ))}

          <TableRow className="font-bold">
            <TableCell colSpan={1}>Jumlah</TableCell>
            <TableCell></TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.penyakit_dalam, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.jiwa, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.tht, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.mata, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.neurologi, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell>
              {lanjutan
                .reduce((sum, item) => sum + item.fisioterapi, 0)
                .toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
