
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, RefreshCw, Radio } from "lucide-react";

const ServerConfig = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5" />
              Configuración SHOUTcast Server
            </CardTitle>
            <CardDescription>Configura tu servidor de streaming SHOUTcast (Solo HTTP)</CardDescription>
          </div>
          <Badge className="bg-green-500">En Línea</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sc-version">Versión SHOUTcast</Label>
              <Select defaultValue="2.6.1">
                <SelectTrigger id="sc-version">
                  <SelectValue placeholder="Seleccionar versión" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2.6.1">v2.6.1 (Última)</SelectItem>
                  <SelectItem value="2.5.5">v2.5.5</SelectItem>
                  <SelectItem value="2.4.8">v2.4.8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sc-admin-port">Puerto Administración</Label>
              <Input id="sc-admin-port" defaultValue="8000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sc-port-range">Rango de Puertos Streaming</Label>
              <Input id="sc-port-range" defaultValue="8002-8020" disabled />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sc-password">Contraseña Admin</Label>
              <Input id="sc-password" type="password" defaultValue="********" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sc-max-listeners">Máximo de Oyentes por Estación</Label>
            <Input id="sc-max-listeners" defaultValue="100" />
          </div>
          
          <div className="flex items-center justify-between space-y-0 pt-2">
            <Label htmlFor="sc-yp">Habilitar Listado en Directorio YP</Label>
            <Switch id="sc-yp" defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between space-y-0 pt-2">
            <Label htmlFor="sc-auto-restart">Reinicio Automático en Fallo</Label>
            <Switch id="sc-auto-restart" defaultChecked={true} />
          </div>

          <div className="flex items-center justify-between space-y-0 pt-2">
            <Label htmlFor="sc-auto-port">Asignación Automática de Puertos</Label>
            <Switch id="sc-auto-port" defaultChecked={true} />
          </div>
          
          {/* Información del sistema */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Protocolo</p>
                <p className="text-muted-foreground">HTTP únicamente</p>
              </div>
              <div>
                <p className="font-medium">Puertos Disponibles</p>
                <p className="text-muted-foreground">8000, 8002-8020</p>
              </div>
              <div>
                <p className="font-medium">SSL/HTTPS</p>
                <p className="text-muted-foreground">Deshabilitado</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reiniciar Servidor
          </Button>
          <Button className="gap-2">
            Guardar Configuración
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerConfig;
