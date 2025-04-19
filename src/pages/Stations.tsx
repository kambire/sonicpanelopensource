
import DashboardLayout from "@/components/layout/DashboardLayout";
import StationCard from "@/components/stations/StationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

const stationsData = [
  {
    id: 1,
    name: "Main Radio",
    listeners: 128,
    status: "online" as const,
    mountpoint: "/mainstream",
    bitrate: 128,
  },
  {
    id: 2,
    name: "Jazz Lounge",
    listeners: 42,
    status: "online" as const,
    mountpoint: "/jazz",
    bitrate: 192,
  },
  {
    id: 3,
    name: "Classical FM",
    listeners: 18,
    status: "online" as const,
    mountpoint: "/classical",
    bitrate: 320,
  },
  {
    id: 4,
    name: "Rock Channel",
    listeners: 56,
    status: "online" as const,
    mountpoint: "/rock",
    bitrate: 128,
  },
  {
    id: 5,
    name: "Techno Beats",
    listeners: 35,
    status: "online" as const,
    mountpoint: "/techno",
    bitrate: 192,
  },
  {
    id: 6,
    name: "Test Station",
    listeners: 0,
    status: "offline" as const,
    mountpoint: "/test",
    bitrate: 64,
  },
];

const Stations = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Stations</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your radio stations
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Station
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stations..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="name">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="listeners">Listeners</SelectItem>
                <SelectItem value="bitrate">Bitrate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stationsData.map((station) => (
            <StationCard
              key={station.id}
              name={station.name}
              listeners={station.listeners}
              status={station.status}
              mountpoint={station.mountpoint}
              bitrate={station.bitrate}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stations;
