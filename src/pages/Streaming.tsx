
import DashboardLayout from "@/components/layout/DashboardLayout";
import ServerConfig from "@/components/streaming/ServerConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Radio } from "lucide-react";

const Streaming = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Streaming SHOUTcast</h1>
            <p className="text-muted-foreground mt-1">
              Configura tu servidor SHOUTcast y conexiones (Solo HTTP - Sin SSL)
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="server">
          <TabsList className="mb-6">
            <TabsTrigger value="server">Configuración del Servidor</TabsTrigger>
            <TabsTrigger value="source">Cliente Fuente</TabsTrigger>
            <TabsTrigger value="logs">Logs del Servidor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="server">
            <ServerConfig />
          </TabsContent>
          
          <TabsContent value="source">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="h-5 w-5" />
                    Configuración Cliente Fuente
                  </CardTitle>
                  <CardDescription>
                    Configura tu software de transmisión para conectar a SHOUTcast (Solo HTTP)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="source-type">Software de Transmisión</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">OBS Studio</Button>
                          <Button variant="outline" className="flex-1">BUTT</Button>
                          <Button variant="outline" className="flex-1">Mixxx</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Conexión Rápida</Label>
                        <Button className="w-full">Generar Perfil de Conexión</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Configuración Manual</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server-url">URL del Servidor</Label>
                          <Input id="server-url" defaultValue="streaming.example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="port">Puerto</Label>
                          <Input id="port" defaultValue="8002" placeholder="8002, 8004, 8006..." />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="source-password">Contraseña Fuente</Label>
                          <Input id="source-password" type="password" defaultValue="********" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bitrate">Bitrate</Label>
                          <Input id="bitrate" defaultValue="128" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="format">Formato</Label>
                          <Input id="format" defaultValue="MP3" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="protocol">Protocolo</Label>
                          <Input id="protocol" defaultValue="HTTP" disabled />
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Nota:</strong> Este sistema está configurado solo para HTTP. 
                          No se soporta SSL/HTTPS para simplificar las pruebas.
                        </p>
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
                <CardTitle>Logs del Servidor SHOUTcast</CardTitle>
                <CardDescription>
                  Ve los logs en tiempo real del servidor SHOUTcast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-md p-4 text-white font-mono text-sm">
                  <div className="flex gap-2 items-center text-green-400 mb-2">
                    <Terminal className="h-4 w-4" />
                    <span>Logs del servidor SHOUTcast:</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="leading-loose">
                        <span className="text-blue-400">[{new Date().toISOString()}]</span>{" "}
                        <span className="text-yellow-400">INFO</span>{" "}
                        {[
                          "SHOUTcast server iniciado en puerto 8000 (HTTP)",
                          "Nueva estación configurada en puerto 8002",
                          "Cliente fuente conectado en puerto 8004",
                          "Playlist cargada: Mix Diurno con 45 pistas",
                          "Reproduciendo: Summer Nights - The Radio Band",
                          "Cliente desconectado del puerto 8006",
                          "Pico de oyentes: 128 en todas las estaciones",
                          "AutoDJ programando siguiente pista",
                          "Uso de memoria: 342MB",
                          "Uso de CPU: 12%",
                          "Nuevo oyente conectado desde 203.0.113.42",
                          "Streaming en 128kbps, formato MP3",
                          "Tiempo activo: 3 días, 4 horas, 12 minutos",
                          "Estadísticas del buffer: 98% saludable",
                          "Metadatos actualizados para pista actual",
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
