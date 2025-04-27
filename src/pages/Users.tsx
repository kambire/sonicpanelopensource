
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Search, Plus, Play, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { PlayerEmbed } from "@/components/users/PlayerEmbed";

const usersList = [
  { id: 1, name: "Carlos Mendoza", email: "carlos@ejemplo.com", status: "active", plan: "Premium", lastLogin: "2023-04-26" },
  { id: 2, name: "María López", email: "maria@ejemplo.com", status: "active", plan: "Básico", lastLogin: "2023-04-25" },
  { id: 3, name: "Juan Rodríguez", email: "juan@ejemplo.com", status: "inactive", plan: "Premium", lastLogin: "2023-04-20" },
  { id: 4, name: "Ana Torres", email: "ana@ejemplo.com", status: "active", plan: "Empresarial", lastLogin: "2023-04-24" },
  { id: 5, name: "Roberto Sánchez", email: "roberto@ejemplo.com", status: "suspended", plan: "Básico", lastLogin: "2023-04-15" },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-muted-foreground mt-1">
              Administra usuarios y configura opciones de reproductor
            </p>
          </div>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
        
        <Tabs defaultValue="list">
          <TabsList className="mb-6">
            <TabsTrigger value="list">Lista de Usuarios</TabsTrigger>
            <TabsTrigger value="player">Opciones de Reproductor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Usuarios</CardTitle>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar usuarios..."
                      className="w-full pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Último Acceso</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === "active" ? "success" : 
                            user.status === "inactive" ? "secondary" : 
                            "destructive"
                          }>
                            {user.status === "active" ? "Activo" : 
                             user.status === "inactive" ? "Inactivo" : 
                             "Suspendido"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="player">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Reproductor Web</CardTitle>
                  <CardDescription>
                    Configura y obtén códigos para integrar el reproductor en tu sitio web
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="player-type">Tipo de Reproductor</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="flex-1">HTML5</Button>
                        <Button variant="outline" className="flex-1">Flash</Button>
                        <Button variant="outline" className="flex-1">Popup</Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="player-color">Color Principal</Label>
                      <div className="flex gap-2">
                        <Input type="color" id="player-color" defaultValue="#0066ff" className="w-16 h-10" />
                        <Input type="text" defaultValue="#0066ff" className="flex-1" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="player-size">Tamaño</Label>
                      <div className="flex gap-2">
                        <Input type="number" id="player-width" placeholder="Ancho" defaultValue={320} />
                        <span className="flex items-center">x</span>
                        <Input type="number" id="player-height" placeholder="Alto" defaultValue={120} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label>Opciones</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="enable-volume" defaultChecked />
                          <Label htmlFor="enable-volume">Control de volumen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="enable-song-info" defaultChecked />
                          <Label htmlFor="enable-song-info">Información de canción</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="autoplay" />
                          <Label htmlFor="autoplay">Reproducción automática</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="show-history" defaultChecked />
                          <Label htmlFor="show-history">Mostrar historial</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Generar Reproductor
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Códigos de Integración</CardTitle>
                  <CardDescription>
                    Copia y pega estos códigos en tu sitio web para integrar el reproductor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="html-code">HTML (SSL)</Label>
                      <div className="relative">
                        <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm">
                          <code>{`<iframe src="https://player.geeksstreaming.com/player/embed/1" 
  width="320" height="120" frameborder="0" 
  allow="autoplay" scrolling="no"></iframe>`}</code>
                        </pre>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyCode('html-ssl')}
                        >
                          {copiedCode === 'html-ssl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="js-code">JavaScript (Responsive)</Label>
                      <div className="relative">
                        <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm">
                          <code>{`<script src="https://player.geeksstreaming.com/js/embed.js" 
  data-station="1" data-theme="dark" 
  data-autoplay="false"></script>`}</code>
                        </pre>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyCode('js-responsive')}
                        >
                          {copiedCode === 'js-responsive' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="popup-code">Reproductor Popup</Label>
                      <div className="relative">
                        <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm">
                          <code>{`<a href="javascript:void(0)" 
  onclick="window.open('https://player.geeksstreaming.com/popup/1', 
  'player', 'width=400,height=150')">Abrir Reproductor</a>`}</code>
                        </pre>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyCode('popup')}
                        >
                          {copiedCode === 'popup' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Vista Previa</CardTitle>
                    <CardDescription>Así se verá tu reproductor integrado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PlayerEmbed />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Users;
