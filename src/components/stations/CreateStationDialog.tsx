
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import PortManager from "./PortManager";

const CreateStationDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
    port: 8002,
    isAutoPort: true,
    bitrate: 128,
    maxListeners: 100
  });

  const handlePortSelect = (port: number, isAutomatic: boolean) => {
    setFormData(prev => ({
      ...prev,
      port,
      isAutoPort: isAutomatic
    }));
  };

  const handleCreate = () => {
    console.log("Creando estación:", formData);
    // Aquí iría la lógica para crear la estación
    setOpen(false);
    // Reset form
    setFormData({
      name: "",
      description: "",
      genre: "",
      port: 8002,
      isAutoPort: true,
      bitrate: 128,
      maxListeners: 100
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Estación
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nueva Estación de Radio</DialogTitle>
          <DialogDescription>
            Configura los detalles de tu nueva estación SHOUTcast
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="station-name">Nombre de la Estación</Label>
              <Input
                id="station-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Mi Radio FM"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="station-genre">Género</Label>
              <Select value={formData.genre} onValueChange={(value) => setFormData(prev => ({ ...prev, genre: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="classical">Clásica</SelectItem>
                  <SelectItem value="electronic">Electrónica</SelectItem>
                  <SelectItem value="reggaeton">Reggaeton</SelectItem>
                  <SelectItem value="salsa">Salsa</SelectItem>
                  <SelectItem value="mixed">Variado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="station-description">Descripción</Label>
            <Input
              id="station-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción de tu estación..."
            />
          </div>

          {/* Configuración técnica */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bitrate">Bitrate (kbps)</Label>
              <Select value={formData.bitrate.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, bitrate: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="64">64 kbps</SelectItem>
                  <SelectItem value="128">128 kbps</SelectItem>
                  <SelectItem value="192">192 kbps</SelectItem>
                  <SelectItem value="320">320 kbps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-listeners">Máximo de Oyentes</Label>
              <Input
                id="max-listeners"
                type="number"
                value={formData.maxListeners}
                onChange={(e) => setFormData(prev => ({ ...prev, maxListeners: parseInt(e.target.value) }))}
                min="1"
                max="1000"
              />
            </div>
          </div>

          {/* Gestión de puertos */}
          <PortManager
            onPortSelect={handlePortSelect}
            selectedPort={formData.port}
            isAutomatic={formData.isAutoPort}
          />

          {/* Resumen */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Resumen de Configuración</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Nombre: {formData.name || "Sin definir"}</div>
              <div>Puerto: {formData.port} ({formData.isAutoPort ? "Auto" : "Manual"})</div>
              <div>Bitrate: {formData.bitrate} kbps</div>
              <div>Max. Oyentes: {formData.maxListeners}</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={!formData.name}>
              Crear Estación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStationDialog;
