import { BulanCheckbox } from "../ChecklistBulan";

export function BulanCheckboxSection({
  loading,
  data,
}: {
  loading: boolean;
  data: string[];
}) {
  if (loading) {
    return (
      <div className="w-full md:w-1/3 space-y-2 animate-pulse">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
      </div>
    );
  }

  return <BulanCheckbox submittedItem={data} />;
}
