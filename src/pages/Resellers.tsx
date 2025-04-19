
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { UserPlus, Users } from "lucide-react";

interface Reseller {
  id: number;
  name: string;
  email: string;
  stations: number;
  status: "active" | "inactive";
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Revendedores</h1>
            <p className="text-muted-foreground mt-1">
              Administra los revendedores y sus estaciones
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Nuevo Revendedor
          </Button>
        </div>

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
                  {resellers.map((reseller) => (
                    <TableRow key={reseller.id}>
                      <TableCell>{reseller.id}</TableCell>
                      <TableCell>{reseller.name}</TableCell>
                      <TableCell>{reseller.email}</TableCell>
                      <TableCell>{reseller.stations}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reseller.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {reseller.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Resellers;
