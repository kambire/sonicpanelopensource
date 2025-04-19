
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, DatabaseIcon, RefreshCw, Server, Shield, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Database = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
            <p className="text-muted-foreground mt-1">
              Configure MySQL database and manage data
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Test Connection
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>
                Configure your MySQL database connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input id="db-host" defaultValue="localhost" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-port">Port</Label>
                <Input id="db-port" defaultValue="3306" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input id="db-name" defaultValue="radiodb" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-user">Username</Label>
                <Input id="db-user" defaultValue="radio_user" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="db-password">Password</Label>
                <Input id="db-password" type="password" defaultValue="********" />
              </div>
              
              <Alert variant="default">
                <Check className="h-4 w-4" />
                <AlertTitle>Connected</AlertTitle>
                <AlertDescription>
                  Database connection successful. All tables are synchronized.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Database Status</CardTitle>
              <CardDescription>
                Information about your database and tables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Server Version:</span>
                  <span className="font-medium">MySQL 8.0.32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Database Size:</span>
                  <span className="font-medium">45.8 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tables:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup:</span>
                  <span className="font-medium">Today, 03:15 AM</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Backup Schedule</h3>
                <div className="flex gap-2">
                  <Badge>Daily</Badge>
                  <Badge>3:00 AM</Badge>
                  <Badge>Automatic</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1 flex-1">
                  <DatabaseIcon className="h-4 w-4" />
                  Backup Now
                </Button>
                <Button variant="outline" className="gap-1 flex-1">
                  <Shield className="h-4 w-4" />
                  Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>
              View and manage your database tables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Database tables for radio system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">users</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>1.2 MB</TableCell>
                  <TableCell>2 hours ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">stations</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>0.8 MB</TableCell>
                  <TableCell>45 minutes ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">streams</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell>1.5 MB</TableCell>
                  <TableCell>12 minutes ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">autodj_playlists</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>2.1 MB</TableCell>
                  <TableCell>3 hours ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">tracks</TableCell>
                  <TableCell>1,256</TableCell>
                  <TableCell>18.4 MB</TableCell>
                  <TableCell>35 minutes ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">listener_logs</TableCell>
                  <TableCell>15,782</TableCell>
                  <TableCell>21.8 MB</TableCell>
                  <TableCell>5 minutes ago</TableCell>
                  <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Needs Optimization</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Database;
