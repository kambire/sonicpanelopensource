
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Settings } from "lucide-react";

interface PortManagerProps {
  onPortSelect: (port: number, isAutomatic: boolean) => void;
  selectedPort?: number;
  isAutomatic?: boolean;
}

const PortManager = ({ onPortSelect, selectedPort, isAutomatic = true }: PortManagerProps) => {
  const [portMode, setPortMode] = useState<'auto' | 'manual'>(isAutomatic ? 'auto' : 'manual');
  const [manualPort, setManualPort] = useState<string>(selectedPort?.toString() || '');

  // Generar lista de puertos disponibles (pares desde 8002)
  const generateAvailablePorts = () => {
    const ports = [];
    for (let i = 8002; i <= 8020; i += 2) {
      ports.push(i);
    }
    return ports;
  };

  const availablePorts = generateAvailablePorts();
  
  // Simular puertos ocupados (en una implementación real vendría del backend)
  const occupiedPorts = [8004, 8008, 8012];
  
  const getNextAvailablePort = () => {
    return availablePorts.find(port => !occupiedPorts.includes(port)) || 8002;
  };

  const handleModeChange = (mode: 'auto' | 'manual') => {
    setPortMode(mode);
    if (mode === 'auto') {
      const autoPort = getNextAvailablePort();
      onPortSelect(autoPort, true);
    }
  };

  const handleManualPortSubmit = () => {
    const port = parseInt(manualPort);
    if (port >= 8002 && port <= 8020 && port % 2 === 0) {
      onPortSelect(port, false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Gestión de Puertos SHOUTcast
            </CardTitle>
            <CardDescription>
              Configura los puertos para tu estación de radio (solo pares desde 8002)
            </CardDescription>
          </div>
          <Badge variant={portMode === 'auto' ? 'default' : 'secondary'}>
            {portMode === 'auto' ? 'Automático' : 'Manual'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Selector de modo */}
          <div className="flex items-center justify-between space-y-0 pt-2">
            <Label htmlFor="port-mode">Asignación automática de puertos</Label>
            <Switch 
              id="port-mode"
              checked={portMode === 'auto'}
              onCheckedChange={(checked) => handleModeChange(checked ? 'auto' : 'manual')}
            />
          </div>

          {portMode === 'auto' ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Puerto Asignado Automáticamente</p>
                    <p className="text-sm text-muted-foreground">
                      El sistema asignará el siguiente puerto disponible
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {getNextAvailablePort()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manual-port">Puerto Manual</Label>
                <div className="flex gap-2">
                  <Input
                    id="manual-port"
                    type="number"
                    placeholder="8002"
                    value={manualPort}
                    onChange={(e) => setManualPort(e.target.value)}
                    min="8002"
                    max="8020"
                    step="2"
                  />
                  <Button onClick={handleManualPortSubmit}>
                    Asignar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Solo puertos pares entre 8002 y 8020
                </p>
              </div>

              <div className="space-y-2">
                <Label>Puertos Disponibles</Label>
                <div className="grid grid-cols-5 gap-2">
                  {availablePorts.map((port) => (
                    <Button
                      key={port}
                      variant={occupiedPorts.includes(port) ? "destructive" : "outline"}
                      size="sm"
                      disabled={occupiedPorts.includes(port)}
                      onClick={() => {
                        setManualPort(port.toString());
                        onPortSelect(port, false);
                      }}
                      className="text-xs"
                    >
                      {port}
                      {occupiedPorts.includes(port) && (
                        <span className="ml-1">🔒</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Información de estado */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Puertos Disponibles</p>
                <p className="text-muted-foreground">
                  {availablePorts.length - occupiedPorts.length} de {availablePorts.length}
                </p>
              </div>
              <div>
                <p className="font-medium">Rango de Puertos</p>
                <p className="text-muted-foreground">8002 - 8020 (pares)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortManager;
