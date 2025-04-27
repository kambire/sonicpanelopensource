
import DashboardLayout from "@/components/layout/DashboardLayout";
import CurrentlyPlaying from "@/components/autodj/CurrentlyPlaying";
import PlaylistCard from "@/components/autodj/PlaylistCard";
import { JinglesScheduler } from "@/components/autodj/JinglesScheduler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileAudio, FolderUp, Music, Plus, Search } from "lucide-react";

const sampleTracks = [
  { id: 1, title: "Summer Nights", artist: "The Radio Band", duration: "3:45" },
  { id: 2, title: "Ocean Waves", artist: "Chill Time", duration: "4:12" },
  { id: 3, title: "City Lights", artist: "Urban Beats", duration: "3:28" },
  { id: 4, title: "Mountain Echo", artist: "Nature Sounds", duration: "5:10" },
  { id: 5, title: "Midnight Drive", artist: "Night Session", duration: "4:35" },
];

const playlistsData = [
  {
    id: 1,
    name: "Daytime Mix",
    active: true,
    trackCount: 45,
    totalDuration: "2h 35m",
    tracks: sampleTracks,
  },
  {
    id: 2,
    name: "Evening Chill",
    active: false,
    trackCount: 32,
    totalDuration: "1h 48m",
    tracks: sampleTracks,
  },
  {
    id: 3,
    name: "Weekend Party",
    active: false,
    trackCount: 28,
    totalDuration: "1h 55m",
    tracks: sampleTracks,
  },
  {
    id: 4,
    name: "Morning Show",
    active: false,
    trackCount: 15,
    totalDuration: "52m",
    tracks: sampleTracks,
  },
];

const AutoDJ = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AutoDJ</h1>
            <p className="text-muted-foreground mt-1">
              Manage your playlists and automatic broadcasting
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <FolderUp className="h-4 w-4" />
              Upload Music
            </Button>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              New Playlist
            </Button>
          </div>
        </div>
        
        <CurrentlyPlaying />
        
        <Tabs defaultValue="playlists">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="playlists" className="gap-1">
                <Music className="h-4 w-4" />
                Playlists
              </TabsTrigger>
              <TabsTrigger value="tracks" className="gap-1">
                <FileAudio className="h-4 w-4" />
                All Tracks
              </TabsTrigger>
              <TabsTrigger value="jingles" className="gap-1">
                <Music className="h-4 w-4" />
                Viñetas
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search playlists or tracks..."
                className="w-full pl-8"
              />
            </div>
          </div>
          
          <TabsContent value="playlists">
            <div className="grid gap-4 sm:grid-cols-2">
              {playlistsData.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  name={playlist.name}
                  active={playlist.active}
                  trackCount={playlist.trackCount}
                  totalDuration={playlist.totalDuration}
                  tracks={playlist.tracks}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tracks">
            <div className="border rounded-md">
              <div className="bg-muted p-3 text-sm font-medium grid grid-cols-12">
                <div className="col-span-5">Title</div>
                <div className="col-span-3">Artist</div>
                <div className="col-span-2">Album</div>
                <div className="col-span-1 text-right">Duration</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              <div className="divide-y">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="p-3 text-sm grid grid-cols-12 hover:bg-muted/50 items-center">
                    <div className="col-span-5 truncate">Track Title {i + 1}</div>
                    <div className="col-span-3 truncate">Artist Name</div>
                    <div className="col-span-2 truncate">Album Name</div>
                    <div className="col-span-1 text-right">{Math.floor(Math.random() * 3 + 2)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</div>
                    <div className="col-span-1 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Music className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="jingles">
            <JinglesScheduler />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AutoDJ;
