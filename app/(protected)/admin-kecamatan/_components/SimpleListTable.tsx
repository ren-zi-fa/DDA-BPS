import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SimpleListTable<T>({
  headers,
  data,
  renderRow,
}: {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <Table className="border rounded-sm mt-4">
      <TableHeader>
        <TableRow>
          {headers.map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>{renderRow(item, i)}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
