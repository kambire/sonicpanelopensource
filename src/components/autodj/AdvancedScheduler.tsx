import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Save, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Sample playlists data
const playlists = [
  { id: 1, name: "Daytime Mix", trackCount: 45 },
  { id: 2, name: "Evening Chill", trackCount: 32 },
  { id: 3, name: "Weekend Party", trackCount: 28 },
  { id: 4, name: "Morning Show", trackCount: 15 },
  { id: 5, name: "Latin Hits", trackCount: 38 },
  { id: 6, name: "Classic Rock", trackCount: 52 },
  { id: 7, name: "Jazz Collection", trackCount: 40 },
];

// Sample scheduled events - ensure the repeat property is correctly typed as RepeatType
const initialScheduledEvents: ScheduledEvent[] = [
  { 
    id: 1, 
    playlistId: 1, 
    playlistName: "Daytime Mix", 
    startTime: "08:00", 
    endTime: "15:00", 
    days: ["Lun", "Mar", "Mie", "Jue", "Vie"],
    repeat: "weekly",
    active: true,
  },
  { 
    id: 2, 
    playlistId: 2, 
    playlistName: "Evening Chill", 
    startTime: "19:00", 
    endTime: "23:00", 
    days: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"],
    repeat: "daily",
    active: true,
  },
  { 
    id: 3, 
    playlistId: 3, 
    playlistName: "Weekend Party", 
    startTime: "21:00", 
    endTime: "02:00", 
    days: ["Vie", "Sáb"],
    repeat: "weekly",
    active: true,
  },
];

const weekdays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"];

// We now use the existing ScheduledEvent interface from types/scheduler.d.ts
// which already has the date property as optional

const AdvancedScheduler = () => {
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>(initialScheduledEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<ScheduledEvent>>({
    playlistId: playlists[0]?.id,
    startTime: "12:00",
    endTime: "13:00",
    days: [],
    repeat: "daily",
    active: true,
  });
  const [fadeVolume, setFadeVolume] = useState([25]);
  
  const handleAddEvent = () => {
    // Get the selected playlist name
    const playlist = playlists.find(p => p.id === currentEvent.playlistId);
    
    if (currentEvent.playlistId) {
      const newEvent: ScheduledEvent = {
        id: Math.max(0, ...scheduledEvents.map(e => e.id)) + 1,
        playlistId: currentEvent.playlistId,
        playlistName: playlist?.name || "",
        startTime: currentEvent.startTime || "00:00",
        endTime: currentEvent.endTime || "00:00",
        days: currentEvent.days || [],
        repeat: currentEvent.repeat as RepeatType, // Ensure we cast to the RepeatType
        active: currentEvent.active !== undefined ? currentEvent.active : true,
      };

      // Add the date property only if it exists and repeat is "once"
      if (currentEvent.date) {
        (newEvent as any).date = currentEvent.date;
      }
      
      setScheduledEvents([...scheduledEvents, newEvent]);
      setIsDialogOpen(false);
      
      // Reset form
      setCurrentEvent({
        playlistId: playlists[0]?.id,
        startTime: "12:00",
        endTime: "13:00",
        days: [],
        repeat: "daily",
        active: true,
      });
    }
  };

  const handleDeleteEvent = (id: number) => {
    setScheduledEvents(scheduledEvents.filter(event => event.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setScheduledEvents(
      scheduledEvents.map(event => 
        event.id === id ? { ...event, active: !event.active } : event
      )
    );
  };
  
  const handleDayToggle = (day: string) => {
    const days = currentEvent.days || [];
    if (days.includes(day)) {
      setCurrentEvent({ ...currentEvent, days: days.filter(d => d !== day) });
    } else {
      setCurrentEvent({ ...currentEvent, days: [...days, day] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Programación Avanzada de AutoDJ</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Programar Lista de Reproducción
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Programar Lista de Reproducción</DialogTitle>
              <DialogDescription>
                Configure cuándo y cómo reproducir una lista específica en el AutoDJ.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="playlist">Lista de Reproducción</Label>
                <Select 
                  value={currentEvent.playlistId?.toString()} 
                  onValueChange={(value) => setCurrentEvent({ ...currentEvent, playlistId: parseInt(value) })}
                >
                  <SelectTrigger id="playlist">
                    <SelectValue placeholder="Seleccionar lista" />
                  </SelectTrigger>
                  <SelectContent>
                    {playlists.map(playlist => (
                      <SelectItem key={playlist.id} value={playlist.id.toString()}>
                        {playlist.name} ({playlist.trackCount} pistas)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label>Tipo de Repetición</Label>
                <Select 
                  value={currentEvent.repeat} 
                  onValueChange={(value: RepeatType) => 
                    setCurrentEvent({ ...currentEvent, repeat: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="monthly">Mensualmente</SelectItem>
                    <SelectItem value="once">Una vez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {currentEvent.repeat === "once" && (
                <div className="grid gap-2">
                  <Label>Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentEvent.date ? (
                          format(currentEvent.date, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentEvent.date}
                        onSelect={(date) => setCurrentEvent({ ...currentEvent, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {(currentEvent.repeat === "weekly" || currentEvent.repeat === "monthly") && (
                <div className="grid gap-2">
                  <Label>Días de la Semana</Label>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map(day => (
                      <Button
                        key={day}
                        variant={currentEvent.days?.includes(day) ? "default" : "outline"}
                        className={cn(
                          "h-10 w-10 p-0",
                          currentEvent.days?.includes(day) ? "bg-primary text-primary-foreground" : ""
                        )}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      value={currentEvent.startTime}
                      onChange={(e) => setCurrentEvent({ ...currentEvent, startTime: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={currentEvent.endTime}
                      onChange={(e) => setCurrentEvent({ ...currentEvent, endTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Configuración de Transición</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Volumen de Fundido:</span>
                  <span className="text-sm font-medium">{fadeVolume[0]}%</span>
                </div>
                <Slider
                  value={fadeVolume}
                  onValueChange={setFadeVolume}
                  max={100}
                  step={5}
                  className="py-4"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={currentEvent.active}
                  onCheckedChange={(checked) => setCurrentEvent({ ...currentEvent, active: checked })}
                />
                <Label htmlFor="active">Activar inmediatamente</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleAddEvent} 
                disabled={
                  !currentEvent.playlistId || 
                  !currentEvent.startTime || 
                  !currentEvent.endTime ||
                  ((currentEvent.repeat === "weekly" || currentEvent.repeat === "monthly") && 
                    (!currentEvent.days || currentEvent.days.length === 0)) ||
                  (currentEvent.repeat === "once" && !currentEvent.date)
                }
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar Programación
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programación de Listas de Reproducción</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lista de Reproducción</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Días</TableHead>
                <TableHead>Repetición</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No hay programaciones configuradas
                  </TableCell>
                </TableRow>
              ) : (
                scheduledEvents.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.playlistName}</TableCell>
                    <TableCell>{`${event.startTime} - ${event.endTime}`}</TableCell>
                    <TableCell>
                      {event.repeat === "once" && (event as any).date 
                        ? format((event as any).date, "dd/MM/yyyy")
                        : event.days.join(", ")}
                    </TableCell>
                    <TableCell>
                      {{
                        daily: "Diariamente",
                        weekly: "Semanalmente",
                        monthly: "Mensualmente",
                        once: "Una vez"
                      }[event.repeat]}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={event.active}
                          onCheckedChange={() => handleToggleActive(event.id)}
                        />
                        <span className="ml-2">{event.active ? "Activo" : "Inactivo"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map(day => (
              <div key={day} className="font-medium p-2 bg-muted">
                {day}
              </div>
            ))}
            {weekdays.map(day => (
              <div key={`cell-${day}`} className="min-h-24 border rounded-md p-1">
                {scheduledEvents
                  .filter(event => event.active && event.days.includes(day))
                  .map(event => (
                    <div 
                      key={`event-${day}-${event.id}`} 
                      className="text-xs bg-primary/10 border border-primary/20 p-1 mb-1 rounded"
                    >
                      <div className="font-medium">{event.playlistName}</div>
                      <div>{event.startTime} - {event.endTime}</div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedScheduler;
