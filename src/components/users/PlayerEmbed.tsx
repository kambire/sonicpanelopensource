
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

export const PlayerEmbed = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Summer Nights",
    artist: "The Radio Band",
    duration: "3:45",
    elapsed: "1:22"
  });

  // Simulate track changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        // Simulate track changes by cycling through some tracks
        const tracks = [
          { title: "Summer Nights", artist: "The Radio Band", duration: "3:45", elapsed: "1:22" },
          { title: "Ocean Waves", artist: "Chill Time", duration: "4:12", elapsed: "2:05" },
          { title: "City Lights", artist: "Urban Beats", duration: "3:28", elapsed: "0:45" }
        ];
        
        const currentIndex = tracks.findIndex(t => t.title === currentTrack.title);
        const nextIndex = (currentIndex + 1) % tracks.length;
        
        setCurrentTrack(tracks[nextIndex]);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  return (
    <div className="border rounded-md p-4 bg-card">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary text-lg">GS</span>
            </div>
            <div>
              <p className="font-medium">{currentTrack.title}</p>
              <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTrack.elapsed} / {currentTrack.duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider 
              value={volume} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={setVolume} 
              className="w-24"
            />
          </div>
        </div>
        
        <div className="relative pt-1">
          <div className="overflow-hidden h-1.5 flex rounded-full bg-secondary">
            <div 
              className="bg-primary" 
              style={{ width: `${Math.random() * 60 + 20}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
