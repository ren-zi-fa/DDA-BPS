import { Fasilitas } from "@/lib/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IProps {
  fasilitas: Fasilitas[];
}

export default function FasilitasTable({ fasilitas }: IProps) {
  // Hitung total tiap kolom
  const total2020 = fasilitas.reduce((sum, item) => sum + item.dua_ribu_20, 0);
  const total2021 = fasilitas.reduce((sum, item) => sum + item.dua_ribu_21, 0);
  const total2022 = fasilitas.reduce((sum, item) => sum + item.dua_ribu_22, 0);
  const total2023 = fasilitas.reduce((sum, item) => sum + item.dua_ribu_23, 0);
  const total2024 = fasilitas.reduce((sum, item) => sum + item.dua_ribu_24, 0);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Fasilitas</h2>
      <Table className="border rounded-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2">No</TableHead>
            <TableHead className="px-4 py-2">Fasilitas</TableHead>
            <TableHead className="px-4 py-2 text-right">2020</TableHead>
            <TableHead className="px-4 py-2 text-right">2021</TableHead>
            <TableHead className="px-4 py-2 text-right">2022</TableHead>
            <TableHead className="px-4 py-2 text-right">2023</TableHead>
            <TableHead className="px-4 py-2 text-right">2024</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fasilitas.map((item, index) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-2">{index + 1}</TableCell>
              <TableCell className="px-4 py-2">{item.fasilitas}</TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.dua_ribu_20.toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.dua_ribu_21.toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.dua_ribu_22.toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.dua_ribu_23.toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                {item.dua_ribu_24.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold bg-gray-100">
            <TableCell className="px-4 py-2">Jumlah</TableCell>
            <TableCell></TableCell>
            <TableCell className="px-4 py-2 text-right">
              {total2020.toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2 text-right">
              {total2021.toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2 text-right">
              {total2022.toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2 text-right">
              {total2023.toLocaleString()}
            </TableCell>
            <TableCell className="px-4 py-2 text-right">
              {total2024.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
