
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Music, SkipBack, SkipForward, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CurrentlyPlaying = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Currently Playing</CardTitle>
          <Badge>LIVE</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-md">
            <Music className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl">Summer Nights</h3>
            <p className="text-muted-foreground">The Radio Band - Best Hits 2023</p>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>2:15</span>
                <span>3:45</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              <Button size="icon" variant="outline">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Pause className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next:</span>
                <span>Ocean Waves - Chill Time</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-muted-foreground">Playlist:</span>
                <span>Daytime Mix</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentlyPlaying;
