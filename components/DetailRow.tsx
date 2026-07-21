type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value || "—"}</dd>
    </div>
  );
}
