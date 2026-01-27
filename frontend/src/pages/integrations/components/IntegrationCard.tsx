import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2Off, PlusCircle, type LucideIcon } from "lucide-react";

type IntegrationCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status?: "connected";
  badge?: string;
};

export function IntegrationCard({
  title,
  description,
  icon: Icon,
  color,
  status,
  badge,
}: IntegrationCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
      {status === "connected" && (
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{ backgroundColor: "#10B981" }}
        />
      )}

      <CardHeader className="flex flex-row items-start justify-between">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <span className="material-symbols-outlined text-3xl">{<Icon />}</span>
        </div>

        {status === "connected" ? (
          <Badge variant="default">Connected</Badge>
        ) : (
          <Badge variant="secondary">{badge ?? "Available"}</Badge>
        )}
      </CardHeader>

      <CardContent>
        <CardTitle className="mb-1">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>

        {status === "connected" ? (
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1">
              Configure
            </Button>
            <Button variant="outline" size="icon">
              <span className="material-symbols-outlined">
                <Link2Off />
              </span>
            </Button>
          </div>
        ) : (
          <Button className="w-full cursor-pointer">
            <span className="material-symbols-outlined mr-2">
              <PlusCircle />
            </span>
            Connect
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
