import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = {
  label: string;
  value: number;
};

export function TwoColumnStatTable({
  title,
  rows,
}: {
  title: string;
  rows: Row[];
}) {
  return (
    <Table className="border mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>{title}</TableHead>
          <TableHead>Jumlah</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
