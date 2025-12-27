import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

type Item = {
  label: string
  value: React.ReactNode
}

export function KeyValueTable({ items }: { items: Item[] }) {
  return (
    <Table className="border rounded-sm">
      <TableBody>
        {items.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium w-1/3">
              {item.label}
            </TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
