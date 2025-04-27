
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Sample invoices data
const invoices = [
  {
    id: "INV-2023-001",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    description: "Plan Estándar - Abril 2023",
    amount: 29.99,
    status: "paid",
    paidDate: "2023-04-05",
  },
  {
    id: "INV-2023-002",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    description: "Plan Estándar - Mayo 2023",
    amount: 29.99,
    status: "paid",
    paidDate: "2023-05-03",
  },
  {
    id: "INV-2023-003",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    description: "Plan Estándar - Junio 2023",
    amount: 29.99,
    status: "paid",
    paidDate: "2023-06-10",
  },
  {
    id: "INV-2023-004",
    date: "2023-07-01",
    dueDate: "2023-07-15",
    description: "Plan Estándar - Julio 2023",
    amount: 29.99,
    status: "pending",
  },
];

// Sample subscription data
const subscription = {
  plan: "Plan Estándar",
  price: 29.99,
  billingCycle: "Mensual",
  nextBillingDate: "2023-07-15",
  status: "active",
  paymentMethod: "Visa terminada en 4242",
};

const Billing = () => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("creditcard");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  
  const handlePayInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };
  
  const handleProcessPayment = () => {
    // Simulate payment processing
    setIsPaymentSuccessful(true);
    
    // Reset after a few seconds
    setTimeout(() => {
      setIsPaymentDialogOpen(false);
      setIsPaymentSuccessful(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación</h1>
          <p className="text-muted-foreground mt-1">
            Administre sus subscripciones, facturas y métodos de pago
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información de Subscripción</CardTitle>
              <CardDescription>
                Detalles de su plan actual y estado de facturación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Plan Actual</div>
                    <div className="font-medium">{subscription.plan}</div>
                  </div>
                  <Badge variant="outline">{subscription.status === "active" ? "Activo" : "Inactivo"}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Precio</div>
                    <div className="font-medium">${subscription.price}/{subscription.billingCycle.toLowerCase()}</div>
                  </div>
                  <Button variant="outline" size="sm">Cambiar Plan</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Próxima Facturación</div>
                    <div className="font-medium">{subscription.nextBillingDate}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Cambiar Ciclo
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Método de Pago</div>
                    <div className="font-medium">{subscription.paymentMethod}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Actualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Facturación</CardTitle>
              <CardDescription>
                Historial de pagos y facturas pendientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">$119.96</div>
                      <p className="text-xs text-muted-foreground">Pagos Totales</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">$29.99</div>
                      <p className="text-xs text-muted-foreground">Saldo Pendiente</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Facturas Pendientes</h3>
                  {invoices.filter(inv => inv.status === "pending").map((invoice) => (
                    <div key={invoice.id} className="flex justify-between items-center p-3 border rounded-md mb-2">
                      <div>
                        <div className="font-medium">{invoice.description}</div>
                        <div className="text-sm text-muted-foreground">Vence el: {invoice.dueDate}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                        <Button size="sm" onClick={() => handlePayInvoice(invoice)}>
                          Pagar
                        </Button>
                      </div>
                    </div>
                  ))}
                  {invoices.filter(inv => inv.status === "pending").length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No hay facturas pendientes
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="invoices">
          <TabsList className="mb-6">
            <TabsTrigger value="invoices">Facturas</TabsTrigger>
            <TabsTrigger value="payment-methods">Métodos de Pago</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Historial de Facturas</CardTitle>
                  <CardDescription>
                    Gestione y descargue sus facturas
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar facturas..."
                      className="pl-8"
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        Todas
                      </DropdownMenuItem>
                      <DropdownMenuItem>Pagadas</DropdownMenuItem>
                      <DropdownMenuItem>Pendientes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Periodo</DropdownMenuLabel>
                      <DropdownMenuItem>Este mes</DropdownMenuItem>
                      <DropdownMenuItem>Último mes</DropdownMenuItem>
                      <DropdownMenuItem>Últimos 3 meses</DropdownMenuItem>
                      <DropdownMenuItem>Este año</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" size="sm" className="gap-1 -ml-4">
                          ID
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={invoice.status === "paid" ? "success" : "outline"}
                          >
                            {invoice.status === "paid" ? "Pagado" : "Pendiente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            {invoice.status === "pending" && (
                              <Button 
                                size="sm"
                                onClick={() => handlePayInvoice(invoice)}
                              >
                                Pagar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
                <CardDescription>
                  Administre sus tarjetas y otros métodos de pago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted h-10 w-16 rounded-md flex items-center justify-center">
                        <span className="font-medium">VISA</span>
                      </div>
                      <div>
                        <div className="font-medium">Visa terminada en 4242</div>
                        <div className="text-sm text-muted-foreground">Expira: 12/2025</div>
                      </div>
                    </div>
                    <Badge>Predeterminado</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted h-10 w-16 rounded-md flex items-center justify-center">
                        <span className="font-medium">MC</span>
                      </div>
                      <div>
                        <div className="font-medium">Mastercard terminada en 5678</div>
                        <div className="text-sm text-muted-foreground">Expira: 09/2024</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Establecer como predeterminada
                    </Button>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Agregar nuevo método de pago
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Pagar Factura</DialogTitle>
              <DialogDescription>
                Complete los detalles para procesar el pago de su factura.
              </DialogDescription>
            </DialogHeader>
            
            {isPaymentSuccessful ? (
              <div className="flex flex-col items-center py-6 space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">¡Pago Exitoso!</h2>
                <p className="text-center text-muted-foreground">
                  Su factura ha sido pagada. Recibirá un recibo por correo electrónico.
                </p>
              </div>
            ) : (
              <>
                {selectedInvoice && (
                  <div className="p-4 bg-muted/50 rounded-lg mb-4">
                    <div className="font-semibold">{selectedInvoice.id}</div>
                    <div className="text-sm">{selectedInvoice.description}</div>
                    <div className="mt-2 font-medium">${selectedInvoice.amount.toFixed(2)}</div>
                  </div>
                )}
                
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>Método de Pago</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="creditcard" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Visa terminada en 4242 (Predeterminada)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="newcard" id="newcard" />
                        <Label htmlFor="newcard">Usar otra tarjeta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {paymentMethod === "newcard" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Fecha de Expiración</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </>
                  )}
                </div>
                
                <DialogFooter className="sm:justify-between">
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleProcessPayment} 
                    className="gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Procesar Pago
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
