
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LinkIcon, Key, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ApiIntegration = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integración API</h1>
          <p className="text-muted-foreground mt-1">
            Conecta tu sistema con otras plataformas como WHMCS
          </p>
        </div>

        <Tabs defaultValue="whmcs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="whmcs">WHMCS</TabsTrigger>
            <TabsTrigger value="api-keys">Claves API</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whmcs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Configuración de WHMCS
                </CardTitle>
                <CardDescription>
                  Conecta tu sistema de streaming con WHMCS para automatizar la facturación y provisión
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="whmcs-url">URL de WHMCS</Label>
                      <Input id="whmcs-url" placeholder="https://tudominio.com/whmcs" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="api-identifier">Identificador API</Label>
                      <Input id="api-identifier" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="api-secret">Clave Secreta API</Label>
                      <Input id="api-secret" type="password" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Opciones de Sincronización</h4>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-provision" />
                      <label htmlFor="auto-provision" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Provisión automática
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-suspend" />
                      <label htmlFor="auto-suspend" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Suspensión automática
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-terminate" />
                      <label htmlFor="auto-terminate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Terminación automática
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sync-clients" />
                      <label htmlFor="sync-clients" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Sincronizar información del cliente
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Estado de la Conexión</h4>
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md mb-4">
                    No conectado. Configure los detalles de la API y haga clic en "Probar Conexión".
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Probar Conexión</Button>
                    <Button>Guardar Configuración</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Claves API
                </CardTitle>
                <CardDescription>
                  Genera y administra claves API para integrar con aplicaciones externas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Claves API Activas</h4>
                    <Button size="sm">Generar Nueva Clave</Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="border-b p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">API Key Principal</h5>
                          <p className="text-sm text-muted-foreground">Creada: 15/04/2024</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Ver</Button>
                          <Button variant="destructive" size="sm">Revocar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">API Key de Integración WHMCS</h5>
                          <p className="text-sm text-muted-foreground">Creada: 20/03/2024</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Ver</Button>
                          <Button variant="destructive" size="sm">Revocar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="text-sm font-medium">Permisos y Alcance</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure los permisos que tendrá cada clave API que genere.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-read" />
                      <label htmlFor="perm-read" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Lectura (Estaciones, Usuarios)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-write" />
                      <label htmlFor="perm-write" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Escritura (Crear/Actualizar)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-admin" />
                      <label htmlFor="perm-admin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Administración (Configuraciones)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-billing" />
                      <label htmlFor="perm-billing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Facturación
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentación API
                </CardTitle>
                <CardDescription>
                  Referencia para desarrolladores que quieren integrar con Geeks Streaming Panel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-base font-medium">Endpoints Disponibles</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="font-medium mb-2">Autenticación</h5>
                    <p className="text-sm mb-2">
                      Todas las peticiones deben incluir su clave API en el encabezado:
                    </p>
                    <pre className="bg-black text-white p-2 rounded text-xs overflow-x-auto">
                      Authorization: Bearer YOUR_API_KEY
                    </pre>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="font-medium mb-2">GET /api/v1/stations</h5>
                    <p className="text-sm">Obtener todas las estaciones</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="font-medium mb-2">POST /api/v1/stations</h5>
                    <p className="text-sm">Crear una nueva estación</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h5 className="font-medium mb-2">GET /api/v1/resellers</h5>
                    <p className="text-sm">Obtener todos los revendedores</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-base font-medium mb-3">Ejemplo de código</h4>
                  <Tabs defaultValue="curl">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="php">PHP</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="mt-2">
                      <Textarea 
                        className="font-mono text-sm" 
                        readOnly 
                        value={`curl -X GET "https://api.tuservidor.com/api/v1/stations" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                      />
                    </TabsContent>
                    <TabsContent value="php" className="mt-2">
                      <Textarea 
                        className="font-mono text-sm" 
                        readOnly 
                        value={`<?php
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.tuservidor.com/api/v1/stations",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_API_KEY",
    "Content-Type: application/json"
  ],
]);
$response = curl_exec($curl);
curl_close($curl);
echo $response;`}
                      />
                    </TabsContent>
                    <TabsContent value="python" className="mt-2">
                      <Textarea 
                        className="font-mono text-sm" 
                        readOnly 
                        value={`import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get("https://api.tuservidor.com/api/v1/stations", headers=headers)
print(response.json())`}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApiIntegration;
