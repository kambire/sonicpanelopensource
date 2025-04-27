
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, Search, FileText, Calendar, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Reseller {
  id: number;
  name: string;
  email: string;
  stations: number;
  status: "active" | "inactive";
}

interface Client {
  id: number;
  name: string;
  email: string;
  resellerId: number;
  plan: string;
  expiryDate: string;
  status: "active" | "inactive" | "expired";
}

const Resellers = () => {
  const [resellers] = useState<Reseller[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      stations: 5,
      status: "active"
    },
    {
      id: 2,
      name: "María García",
      email: "maria@example.com",
      stations: 3,
      status: "active"
    }
  ]);

  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: "Radio FM 95.5",
      email: "contacto@fm955.com",
      resellerId: 1,
      plan: "Premium",
      expiryDate: "2024-05-30",
      status: "active"
    },
    {
      id: 2,
      name: "Radio Latina",
      email: "info@radiolatina.com",
      resellerId: 1,
      plan: "Básico",
      expiryDate: "2024-06-15",
      status: "active"
    },
    {
      id: 3,
      name: "Radio Urbana",
      email: "admin@radiourbana.com",
      resellerId: 2,
      plan: "Estándar",
      expiryDate: "2024-04-10",
      status: "expired"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReseller, setSelectedReseller] = useState<number | null>(null);
  
  const filteredResellers = resellers.filter(
    (reseller) =>
      reseller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(
    (client) => 
      (selectedReseller === null || client.resellerId === selectedReseller) &&
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Administración de Revendedores</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona los revendedores y sus clientes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Enviar Recordatorio
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Nuevo Revendedor
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar revendedores o clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="resellers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="resellers">Revendedores</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resellers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Lista de Revendedores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Estaciones</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResellers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6">
                            No se encontraron revendedores
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredResellers.map((reseller) => (
                          <TableRow key={reseller.id}>
                            <TableCell>{reseller.id}</TableCell>
                            <TableCell>{reseller.name}</TableCell>
                            <TableCell>{reseller.email}</TableCell>
                            <TableCell>{reseller.stations}</TableCell>
                            <TableCell>
                              <Badge variant={reseller.status === 'active' ? 'success' : 'destructive'}>
                                {reseller.status === 'active' ? 'Activo' : 'Inactivo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedReseller(reseller.id === selectedReseller ? null : reseller.id)}
                                >
                                  Ver Clientes
                                </Button>
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Lista de Clientes
                  {selectedReseller !== null && (
                    <Badge variant="outline" className="ml-2">
                      Filtrando por Revendedor ID: {selectedReseller}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 ml-2 p-0" 
                        onClick={() => setSelectedReseller(null)}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Revendedor ID</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Fecha de Vencimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6">
                            No se encontraron clientes
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredClients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>{client.id}</TableCell>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.resellerId}</TableCell>
                            <TableCell>{client.plan}</TableCell>
                            <TableCell>{client.expiryDate}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  client.status === 'active' ? 'success' : 
                                  client.status === 'inactive' ? 'secondary' : 'destructive'
                                }
                              >
                                {client.status === 'active' ? 'Activo' : 
                                 client.status === 'inactive' ? 'Inactivo' : 'Vencido'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Calendar className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Resellers;
