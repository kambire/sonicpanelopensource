
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Radio, Settings, BarChart2, Play, Pause } from "lucide-react";
import { useState } from "react";

interface StationCardProps {
  name: string;
  listeners: number;
  status: "online" | "offline";
  mountpoint: string;
  bitrate: number;
}

const StationCard = ({
  name,
  listeners,
  status,
  mountpoint,
  bitrate,
}: StationCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-accent/10 flex flex-row items-center gap-2 p-4">
        <Radio className="h-6 w-6 text-primary" />
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant={status === "online" ? "default" : "secondary"}>
              {status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {listeners} listeners
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mountpoint:</span>
            <span>{mountpoint}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bitrate:</span>
            <span>{bitrate} kbps</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t p-4">
        <Button variant="outline" size="sm" className="gap-1">
          <Settings className="h-4 w-4" />
          Config
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <BarChart2 className="h-4 w-4" />
          Stats
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StationCard;
