
import DashboardLayout from "@/components/layout/DashboardLayout";
import ServerConfig from "@/components/streaming/ServerConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";

const Streaming = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SHOUTcast Streaming</h1>
            <p className="text-muted-foreground mt-1">
              Configure your SHOUTcast server and connection settings
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="server">
          <TabsList className="mb-6">
            <TabsTrigger value="server">Server Configuration</TabsTrigger>
            <TabsTrigger value="source">Source Client</TabsTrigger>
            <TabsTrigger value="logs">Server Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="server">
            <ServerConfig />
          </TabsContent>
          
          <TabsContent value="source">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Source Client Configuration</CardTitle>
                  <CardDescription>
                    Configure your broadcasting software to connect to your SHOUTcast server
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="source-type">Broadcasting Software</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">OBS Studio</Button>
                          <Button variant="outline" className="flex-1">BUTT</Button>
                          <Button variant="outline" className="flex-1">Mixxx</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Quick Connection</Label>
                        <Button className="w-full">Generate Connection Profile</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Manual Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server-url">Server URL</Label>
                          <Input id="server-url" defaultValue="streaming.example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="port">Port</Label>
                          <Input id="port" defaultValue="8000" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="source-password">Source Password</Label>
                          <Input id="source-password" type="password" defaultValue="********" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bitrate">Bitrate</Label>
                          <Input id="bitrate" defaultValue="128" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="format">Format</Label>
                          <Input id="format" defaultValue="MP3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>SHOUTcast Server Logs</CardTitle>
                <CardDescription>
                  View real-time SHOUTcast server logs and debug information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md p-4 text-white font-mono text-sm">
                  <div className="flex gap-2 items-center text-green-400 mb-2">
                    <Terminal className="h-4 w-4" />
                    <span>SHOUTcast server logs:</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="leading-loose">
                        <span className="text-blue-400">[{new Date().toISOString()}]</span>{" "}
                        <span className="text-yellow-400">INFO</span>{" "}
                        {[
                          "SHOUTcast server started successfully on port 8000",
                          "New client connected from 192.168.1.42",
                          "Source client connected successfully",
                          "Playlist loaded: Daytime Mix with 45 tracks",
                          "Now playing: Summer Nights - The Radio Band",
                          "Client disconnected: 192.168.1.105",
                          "Peak listeners count: 128",
                          "AutoDJ scheduling next track",
                          "Memory usage: 342MB",
                          "CPU usage: 12%",
                          "New listener connected from 203.0.113.42",
                          "Streaming at 128kbps, MP3 format",
                          "Uptime: 3 days, 4 hours, 12 minutes",
                          "Buffer statistics: 98% healthy",
                          "Metadata updated for current track",
                        ][i % 15]}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Streaming;
