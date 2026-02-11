export function TeamStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Stat title="Admins" value={3} />
      <Stat title="Managers" value={5} />
      <Stat title="Agents" value={16} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 rounded-2xl border bg-background">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
