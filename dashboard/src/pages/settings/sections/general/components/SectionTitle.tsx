interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="h-px flex-1 bg-border ml-2" />
    </div>
  );
}
