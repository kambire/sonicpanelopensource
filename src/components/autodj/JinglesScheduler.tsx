
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Music, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const JinglesScheduler = () => {
  const [date, setDate] = useState<Date>();
  
  const [jingles, setJingles] = useState([
    { id: 1, name: "Identificador de emisora", file: "id_emisora.mp3", size: "1.2 MB", duration: "12s", scheduled: "Cada hora", active: true },
    { id: 2, name: "Noticias intro", file: "noticias_intro.mp3", size: "0.8 MB", duration: "8s", scheduled: "Lun-Vie 7:00, 13:00, 19:00", active: true },
    { id: 3, name: "Promoción fin de semana", file: "promo_finde.mp3", size: "1.5 MB", duration: "15s", scheduled: "Vie-Dom", active: true },
    { id: 4, name: "Separador musical", file: "separador1.mp3", size: "0.5 MB", duration: "5s", scheduled: "Cada 30 min", active: false },
  ]);
  
  const handleDeleteJingle = (id: number) => {
    setJingles(jingles.filter(jingle => jingle.id !== id));
  };
  
  const handleToggleActive = (id: number) => {
    setJingles(jingles.map(jingle => 
      jingle.id === id ? {...jingle, active: !jingle.active} : jingle
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Viñetas y Separadores</span>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nueva Viñeta
          </Button>
        </CardTitle>
        <CardDescription>
          Programa separadores, viñetas, y efectos sonoros para tu transmisión
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Viñetas</TabsTrigger>
            <TabsTrigger value="scheduler">Programador</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Subir Viñeta
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-64">
                <Input
                  placeholder="Buscar viñetas..."
                  className="w-full pl-8"
                />
                <Music className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="border rounded-md">
              <div className="bg-muted p-3 text-sm font-medium grid grid-cols-12">
                <div className="col-span-3">Nombre</div>
                <div className="col-span-2">Archivo</div>
                <div className="col-span-1 text-center">Duración</div>
                <div className="col-span-3">Programación</div>
                <div className="col-span-1 text-center">Estado</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>
              <div className="divide-y">
                {jingles.map((jingle) => (
                  <div key={jingle.id} className="p-3 text-sm grid grid-cols-12 hover:bg-muted/50 items-center">
                    <div className="col-span-3 font-medium">{jingle.name}</div>
                    <div className="col-span-2 text-muted-foreground">{jingle.file}</div>
                    <div className="col-span-1 text-center">{jingle.duration}</div>
                    <div className="col-span-3">{jingle.scheduled}</div>
                    <div className="col-span-1 flex justify-center">
                      <Switch 
                        checked={jingle.active} 
                        onCheckedChange={() => handleToggleActive(jingle.id)}
                      />
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Music className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteJingle(jingle.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduler">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-8 gap-1">
                    <div className="col-span-1 text-muted-foreground text-xs font-medium text-center">Hora</div>
                    {daysOfWeek.map(day => (
                      <div key={day} className="col-span-1 text-muted-foreground text-xs font-medium text-center">{day}</div>
                    ))}
                    
                    {Array.from({length: 24}).map((_, hour) => (
                      <>
                        <div key={`hour-${hour}`} className="col-span-1 h-10 border-t flex items-center justify-center text-xs">
                          {hour}:00
                        </div>
                        {Array.from({length: 7}).map((_, day) => (
                          <div 
                            key={`cell-${hour}-${day}`} 
                            className="col-span-1 h-10 border-t border-l flex items-center justify-center relative group"
                          >
                            {/* Example scheduled items - would be dynamic in real app */}
                            {hour === 7 && (day === 0 || day === 1 || day === 2 || day === 3 || day === 4) && (
                              <Badge className="absolute text-[10px] bg-blue-500">Noticias</Badge>
                            )}
                            {hour === 13 && (day === 0 || day === 1 || day === 2 || day === 3 || day === 4) && (
                              <Badge className="absolute text-[10px] bg-blue-500">Noticias</Badge>
                            )}
                            {hour === 19 && (day === 0 || day === 1 || day === 2 || day === 3 || day === 4) && (
                              <Badge className="absolute text-[10px] bg-blue-500">Noticias</Badge>
                            )}
                            {hour % 2 === 0 && (
                              <Badge className="absolute text-[10px] bg-green-500 opacity-50">Identificador</Badge>
                            )}
                            {(day >= 4) && (hour >= 18 && hour <= 20) && (
                              <Badge className="absolute text-[10px] bg-purple-500">Promo</Badge>
                            )}
                            <div className="w-full h-full opacity-0 group-hover:opacity-100 absolute flex items-center justify-center bg-primary/10 cursor-pointer">
                              <Plus className="h-3 w-3" />
                            </div>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Programar Viñeta</CardTitle>
                    <CardDescription>
                      Configura cuándo se reproducirá tu viñeta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jingle-select">Selecciona Viñeta</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar viñeta" />
                        </SelectTrigger>
                        <SelectContent>
                          {jingles.map(jingle => (
                            <SelectItem key={jingle.id} value={jingle.id.toString()}>
                              {jingle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Frecuencia</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start">Diario</Button>
                        <Button variant="outline" className="justify-start">Semanal</Button>
                        <Button variant="outline" className="justify-start">Mensual</Button>
                        <Button variant="outline" className="justify-start">Una vez</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Hora</Label>
                        <div className="flex">
                          <Button variant="outline" className="w-full justify-start">
                            <Clock className="mr-2 h-4 w-4" />
                            Seleccionar hora
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Días de la semana</Label>
                      <div className="flex flex-wrap gap-1">
                        {daysOfWeek.map((day, index) => (
                          <Button key={day} variant="outline" size="sm" className={cn(
                            "flex-1 min-w-12",
                            index < 5 ? "bg-primary/10" : ""
                          )}>
                            {day.substring(0, 1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="repeat-interval">Repetir cada</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="repeat-interval"
                          type="number"
                          defaultValue="60"
                          className="w-20"
                        />
                        <Select defaultValue="minutes">
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutos</SelectItem>
                            <SelectItem value="hours">Horas</SelectItem>
                            <SelectItem value="days">Días</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Programación</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
