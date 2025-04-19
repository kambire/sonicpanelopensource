
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Music, Play, Settings } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

interface PlaylistCardProps {
  name: string;
  active: boolean;
  trackCount: number;
  totalDuration: string;
  tracks: Track[];
}

const PlaylistCard = ({
  name,
  active,
  trackCount,
  totalDuration,
  tracks,
}: PlaylistCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={active ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{name}</CardTitle>
            {active && <Badge>Active</Badge>}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">{trackCount} tracks</span>
          <span className="text-muted-foreground">{totalDuration}</span>
        </div>
        <Progress value={active ? 45 : 0} className="h-1 mb-4" />
        
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Play className="h-4 w-4" />
            Play Now
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="gap-1 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 border rounded-md">
            <div className="bg-muted p-2 text-sm font-medium grid grid-cols-10">
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Artist</div>
              <div className="col-span-2 text-right">Duration</div>
            </div>
            <div className="divide-y">
              {tracks.map((track) => (
                <div key={track.id} className="p-2 text-sm grid grid-cols-10 hover:bg-muted/50">
                  <div className="col-span-5 truncate">{track.title}</div>
                  <div className="col-span-3 truncate">{track.artist}</div>
                  <div className="col-span-2 text-right">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
