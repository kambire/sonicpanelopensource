
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ListenersChart from "@/components/dashboard/ListenersChart";
import ServerStatus from "@/components/dashboard/ServerStatus";
import CurrentlyPlaying from "@/components/autodj/CurrentlyPlaying";
import { Radio, Users, Music, Clock, Server, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your radio stations and monitor performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Radio}
          title="Active Stations"
          value="12"
          description="+2 from last month"
        />
        <StatsCard
          icon={Users}
          title="Current Listeners"
          value="845"
          description="+18.7% from yesterday"
        />
        <StatsCard
          icon={Music}
          title="Tracks Played"
          value="1,203"
          description="Last 24 hours"
        />
        <StatsCard
          icon={Clock}
          title="Uptime"
          value="99.9%"
          description="Last 30 days"
        />
      </div>

      <div className="grid gap-4 mt-8 md:grid-cols-4">
        <ListenersChart />
        <ServerStatus />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <CurrentlyPlaying />
        <div className="col-span-3 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              className="h-auto flex-col items-start gap-1 p-4 justify-start"
              variant="outline"
              onClick={() => window.location.href = '/stations'}
            >
              <div className="flex w-full items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                <span className="font-semibold">Add New Station</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Configure a new radio station with custom settings
              </p>
            </Button>
            <Button
              className="h-auto flex-col items-start gap-1 p-4 justify-start"
              variant="outline"
              onClick={() => window.location.href = '/autodj'}
            >
              <div className="flex w-full items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                <span className="font-semibold">Manage Playlists</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Upload music and create AutoDJ playlists
              </p>
            </Button>
            <Button
              className="h-auto flex-col items-start gap-1 p-4 justify-start"
              variant="outline"
              onClick={() => window.location.href = '/streaming'}
            >
              <div className="flex w-full items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <span className="font-semibold">Server Configuration</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Configure SHOUTcast or Icecast server settings
              </p>
            </Button>
            <Button
              className="h-auto flex-col items-start gap-1 p-4 justify-start"
              variant="outline"
              onClick={() => window.location.href = '/database'}
            >
              <div className="flex w-full items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <span className="font-semibold">Database Management</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Manage your MySQL database configuration
              </p>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
