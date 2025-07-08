
import DashboardLayout from "@/components/layout/DashboardLayout";
import StationCard from "@/components/stations/StationCard";
import CreateStationDialog from "@/components/stations/CreateStationDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

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
            <h1 className="text-3xl font-bold tracking-tight">Mis Estaciones SHOUTcast</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona y monitorea tus estaciones de radio (Puertos 8002-8020)
            </p>
          </div>
          <CreateStationDialog />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar estaciones..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="online">En línea</SelectItem>
                <SelectItem value="offline">Fuera de línea</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="name">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="listeners">Oyentes</SelectItem>
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
