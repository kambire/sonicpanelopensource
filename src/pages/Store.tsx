
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Package, ShoppingCart, Check, Calendar } from "lucide-react";

// Sample products data
const radioProducts = [
  {
    id: 1,
    name: "Plan Básico",
    description: "Para emisoras pequeñas o personales",
    price: 9.99,
    frequency: "month",
    features: [
      "Hasta 100 oyentes simultáneos",
      "AutoDJ con 5GB de almacenamiento",
      "Estadísticas básicas",
      "Soporte por email",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Plan Estándar",
    description: "Para emisoras en crecimiento",
    price: 29.99,
    frequency: "month",
    features: [
      "Hasta 500 oyentes simultáneos",
      "AutoDJ con 25GB de almacenamiento",
      "Estadísticas completas",
      "Soporte prioritario",
      "API de integración",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Plan Profesional",
    description: "Para emisoras establecidas",
    price: 59.99,
    frequency: "month",
    features: [
      "Hasta 2000 oyentes simultáneos",
      "AutoDJ con 100GB de almacenamiento",
      "Estadísticas avanzadas y reportes",
      "Soporte 24/7",
      "API completa y webhooks",
      "Reproductor personalizado",
    ],
    popular: false,
  },
];

const resellerProducts = [
  {
    id: 4,
    name: "Revendedor Inicial",
    description: "Para comenzar a revender servicios",
    price: 99.99,
    frequency: "month",
    features: [
      "Hasta 10 emisoras",
      "Panel de administración",
      "API de integración",
      "Facturación automática",
      "Soporte técnico",
    ],
    popular: false,
  },
  {
    id: 5,
    name: "Revendedor Pro",
    description: "Para negocios en crecimiento",
    price: 199.99,
    frequency: "month",
    features: [
      "Hasta 50 emisoras",
      "Panel de administración completo",
      "API completa con webhooks",
      "Facturación y reportes avanzados",
      "Soporte prioritario 24/7",
      "Personalización de marca",
    ],
    popular: true,
  },
  {
    id: 6,
    name: "Revendedor Enterprise",
    description: "Para revendedores a gran escala",
    price: 399.99,
    frequency: "month",
    features: [
      "Emisoras ilimitadas",
      "Panel de administración personalizable",
      "API empresarial",
      "Sistema completo de facturación",
      "Soporte dedicado",
      "Personalización completa de marca",
      "Servidor dedicado",
    ],
    popular: false,
  },
];

// Sample order history
const orderHistory = [
  {
    id: "ORD-2023-001",
    date: "2023-04-01",
    product: "Plan Estándar",
    amount: 29.99,
    status: "paid",
  },
  {
    id: "ORD-2023-002",
    date: "2023-05-01",
    product: "Plan Estándar",
    amount: 29.99,
    status: "paid",
  },
  {
    id: "ORD-2023-003",
    date: "2023-06-01",
    product: "Plan Estándar",
    amount: 29.99,
    status: "paid",
  },
];

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("creditcard");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  
  const handleCheckout = (product: any) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };
  
  const handlePayment = () => {
    // Simulate payment processing
    setIsPaymentSuccessful(true);
    
    // Reset after a few seconds
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setIsPaymentSuccessful(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tienda</h1>
          <p className="text-muted-foreground mt-1">
            Adquiere servicios de streaming de radio y planes de revendedor
          </p>
        </div>
        
        <Tabs defaultValue="radio">
          <TabsList className="mb-6">
            <TabsTrigger value="radio">Servicios de Radio</TabsTrigger>
            <TabsTrigger value="reseller">Planes de Revendedor</TabsTrigger>
            <TabsTrigger value="orders">Historial de Pedidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radio">
            <div className="grid gap-6 md:grid-cols-3">
              {radioProducts.map((product) => (
                <Card key={product.id} className={product.popular ? "border-primary shadow-md" : ""}>
                  {product.popular && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge variant="default" className="shadow">Más Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {product.name}
                      {product.popular && <Check className="text-primary h-5 w-5" />}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${product.price}</span>
                      <span className="text-muted-foreground">/{product.frequency}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={product.popular ? "default" : "outline"}
                      onClick={() => handleCheckout(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar Ahora
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reseller">
            <div className="grid gap-6 md:grid-cols-3">
              {resellerProducts.map((product) => (
                <Card key={product.id} className={product.popular ? "border-primary shadow-md" : ""}>
                  {product.popular && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge variant="default" className="shadow">Recomendado</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {product.name}
                      {product.popular && <Check className="text-primary h-5 w-5" />}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${product.price}</span>
                      <span className="text-muted-foreground">/{product.frequency}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={product.popular ? "default" : "outline"}
                      onClick={() => handleCheckout(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar Ahora
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pedidos</CardTitle>
                <CardDescription>
                  Visualiza y administra tus pedidos y facturas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID de Pedido</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistory.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>${order.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === "paid" ? "success" : "default"}>
                            {order.status === "paid" ? "Pagado" : "Pendiente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Ver Factura</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Finalizar Compra</DialogTitle>
              <DialogDescription>
                Complete los detalles de pago para adquirir su servicio.
              </DialogDescription>
            </DialogHeader>
            
            {isPaymentSuccessful ? (
              <div className="flex flex-col items-center py-6 space-y-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">¡Pago Exitoso!</h2>
                <p className="text-center text-muted-foreground">
                  Su servicio ha sido activado. Recibirá un correo electrónico con los detalles.
                </p>
              </div>
            ) : (
              <>
                {selectedProduct && (
                  <div className="p-4 bg-muted/50 rounded-lg mb-4">
                    <div className="font-semibold">{selectedProduct.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedProduct.description}</div>
                    <div className="mt-2 font-medium">${selectedProduct.price}/{selectedProduct.frequency}</div>
                  </div>
                )}
                
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>Método de Pago</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="creditcard" id="creditcard" />
                        <Label htmlFor="creditcard" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="banktransfer" id="banktransfer" />
                        <Label htmlFor="banktransfer">Transferencia Bancaria</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {paymentMethod === "creditcard" && (
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
                
                <Separator />
                
                <div className="flex justify-between">
                  <div className="text-sm">Total:</div>
                  <div className="font-bold">${selectedProduct?.price}</div>
                </div>
                
                <DialogFooter className="sm:justify-between">
                  <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handlePayment} 
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

export default Store;
