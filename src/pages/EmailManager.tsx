
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Settings, Calendar, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EmailManager = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestor de Correos</h1>
          <p className="text-muted-foreground mt-1">
            Personaliza y administra las notificaciones por correo electrónico
          </p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="logs">Historial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Plantillas de Correo
                </CardTitle>
                <CardDescription>
                  Personaliza las plantillas para diferentes eventos del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="registration">
                  <TabsList className="mb-4">
                    <TabsTrigger value="registration">Registro</TabsTrigger>
                    <TabsTrigger value="welcome">Bienvenida</TabsTrigger>
                    <TabsTrigger value="billing">Facturación</TabsTrigger>
                    <TabsTrigger value="password">Recuperación</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="registration" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="subject-registration">Asunto</Label>
                          <Input 
                            id="subject-registration" 
                            defaultValue="Confirma tu cuenta en Geeks Streaming Panel" 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="template-registration">Contenido del Correo</Label>
                          <Textarea 
                            id="template-registration" 
                            className="min-h-[300px]" 
                            defaultValue={`Hola {nombre},

Gracias por registrarte en Geeks Streaming Panel. Para activar tu cuenta, haz clic en el siguiente enlace:

{enlace_activacion}

Este enlace expirará en 24 horas.

Si no solicitaste esta cuenta, puedes ignorar este correo.

Saludos,
El equipo de Geeks Streaming Panel`} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Variables Disponibles</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <ul className="space-y-2 text-sm">
                            <li><code>{`{nombre}`}</code> - Nombre del usuario</li>
                            <li><code>{`{email}`}</code> - Correo electrónico</li>
                            <li><code>{`{enlace_activacion}`}</code> - Enlace de activación</li>
                            <li><code>{`{fecha}`}</code> - Fecha del registro</li>
                            <li><code>{`{empresa}`}</code> - Nombre de la empresa</li>
                          </ul>
                        </div>
                        
                        <h4 className="text-sm font-medium">Vista Previa</h4>
                        <div className="border rounded-md p-3 bg-white min-h-[200px]">
                          <div className="text-sm">
                            <strong>Asunto:</strong> Confirma tu cuenta en Geeks Streaming Panel
                          </div>
                          <hr className="my-2" />
                          <div className="text-sm whitespace-pre-line">
                            Hola Juan Pérez,

                            Gracias por registrarte en Geeks Streaming Panel. Para activar tu cuenta, haz clic en el siguiente enlace:

                            https://panel.geeks.com.py/activate/token12345

                            Este enlace expirará en 24 horas.

                            Si no solicitaste esta cuenta, puedes ignorar este correo.

                            Saludos,
                            El equipo de Geeks Streaming Panel
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Vista Previa</Button>
                      <Button variant="outline">Enviar Prueba</Button>
                      <Button>Guardar Cambios</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="welcome" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="subject-welcome">Asunto</Label>
                          <Input 
                            id="subject-welcome" 
                            defaultValue="Bienvenido a Geeks Streaming Panel" 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="template-welcome">Contenido del Correo</Label>
                          <Textarea 
                            id="template-welcome" 
                            className="min-h-[300px]" 
                            defaultValue={`Hola {nombre},

¡Bienvenido a Geeks Streaming Panel! Tu cuenta ha sido activada correctamente.

Puedes acceder a tu panel de control en:
{enlace_panel}

Estos son tus datos de acceso:
- Usuario: {email}
- Contraseña: La que estableciste durante el registro

Si tienes alguna pregunta, no dudes en contactarnos.

Saludos,
El equipo de Geeks Streaming Panel`} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Variables Disponibles</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <ul className="space-y-2 text-sm">
                            <li><code>{`{nombre}`}</code> - Nombre del usuario</li>
                            <li><code>{`{email}`}</code> - Correo electrónico</li>
                            <li><code>{`{enlace_panel}`}</code> - Enlace al panel</li>
                            <li><code>{`{fecha}`}</code> - Fecha actual</li>
                            <li><code>{`{empresa}`}</code> - Nombre de la empresa</li>
                          </ul>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-4">
                          <Checkbox id="enable-welcome" defaultChecked />
                          <label htmlFor="enable-welcome" className="text-sm font-medium leading-none">
                            Activar correo de bienvenida
                          </label>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Vista Previa</Button>
                          <Button variant="outline">Enviar Prueba</Button>
                          <Button>Guardar Cambios</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="billing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="subject-billing">Asunto</Label>
                          <Input 
                            id="subject-billing" 
                            defaultValue="Recordatorio de Pago - Geeks Streaming Panel" 
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="template-billing">Contenido del Correo</Label>
                          <Textarea 
                            id="template-billing" 
                            className="min-h-[300px]" 
                            defaultValue={`Hola {nombre},

Este es un recordatorio amistoso de que tu pago para el servicio de streaming está próximo a vencer.

Detalles:
- Plan: {plan}
- Fecha de vencimiento: {fecha_vencimiento}
- Monto: {monto}

Para realizar el pago, ingresa a:
{enlace_pago}

Si ya has realizado el pago, por favor ignora este mensaje.

Saludos,
El equipo de Geeks Streaming Panel`} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Configuración de Recordatorio</h4>
                        <div className="bg-gray-50 p-4 rounded-md space-y-3">
                          <div className="space-y-1">
                            <Label htmlFor="days-before">Días antes del vencimiento</Label>
                            <Input 
                              id="days-before" 
                              type="number" 
                              defaultValue="5"
                              min="1"
                              max="30"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="reminder-frequency">Frecuencia de recordatorios</Label>
                            <select 
                              id="reminder-frequency"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <option value="once">Una sola vez</option>
                              <option value="daily">Diario</option>
                              <option value="weekly">Semanal</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <Checkbox id="enable-billing" defaultChecked />
                            <label htmlFor="enable-billing" className="text-sm font-medium leading-none">
                              Activar recordatorios de pago
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Vista Previa</Button>
                          <Button variant="outline">Enviar Prueba</Button>
                          <Button>Guardar Cambios</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="password">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium">Recuperación de Contraseña</h3>
                      <p className="text-muted-foreground mt-2">
                        Esta plantilla está configurada automáticamente por el sistema.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración de Correo
                </CardTitle>
                <CardDescription>
                  Configura el servidor SMTP para el envío de correos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="smtp-server">Servidor SMTP</Label>
                      <Input id="smtp-server" placeholder="smtp.ejemplo.com" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="smtp-port">Puerto</Label>
                      <Input id="smtp-port" type="number" placeholder="587" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="smtp-username">Usuario</Label>
                      <Input id="smtp-username" placeholder="usuario@ejemplo.com" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="smtp-password">Contraseña</Label>
                      <Input id="smtp-password" type="password" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="from-email">Correo del Remitente</Label>
                      <Input id="from-email" placeholder="noreply@geeks.com.py" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="from-name">Nombre del Remitente</Label>
                      <Input id="from-name" placeholder="Geeks Streaming Panel" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="use-ssl" />
                      <label htmlFor="use-ssl" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Usar SSL/TLS
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Probar Configuración</h4>
                    <p className="text-sm text-muted-foreground">
                      Envía un correo de prueba para verificar la configuración SMTP.
                    </p>
                    
                    <div className="space-y-1">
                      <Label htmlFor="test-email">Correo de Prueba</Label>
                      <Input id="test-email" placeholder="tucorreo@ejemplo.com" />
                    </div>
                    
                    <Button className="mt-2">Enviar Correo de Prueba</Button>
                    
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md mt-4">
                      Asegúrate de guardar la configuración antes de enviar un correo de prueba.
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Configuración General de Correos</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-footer" defaultChecked />
                      <label htmlFor="email-footer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Agregar pie de página con información de contacto
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-logo" defaultChecked />
                      <label htmlFor="email-logo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Incluir logo en los correos
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-copy" />
                      <label htmlFor="email-copy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Enviar copia de todos los correos al administrador
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">Reiniciar</Button>
                    <Button>Guardar Cambios</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial de Correos
                </CardTitle>
                <CardDescription>
                  Registro de todos los correos electrónicos enviados por el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Destinatario</TableHead>
                        <TableHead>Asunto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-04-27 14:32</TableCell>
                        <TableCell>juan@example.com</TableCell>
                        <TableCell>Bienvenido a Geeks Streaming Panel</TableCell>
                        <TableCell>Bienvenida</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Entregado
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-04-25 09:15</TableCell>
                        <TableCell>maria@example.com</TableCell>
                        <TableCell>Recordatorio de Pago - Geeks Streaming Panel</TableCell>
                        <TableCell>Facturación</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Entregado
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-04-20 18:45</TableCell>
                        <TableCell>carlos@example.com</TableCell>
                        <TableCell>Confirma tu cuenta en Geeks Streaming Panel</TableCell>
                        <TableCell>Registro</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                            Fallido
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
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

export default EmailManager;
