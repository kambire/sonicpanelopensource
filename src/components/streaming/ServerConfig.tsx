
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, RefreshCw, Server } from "lucide-react";

const ServerConfig = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Server Configuration</CardTitle>
            <CardDescription>Configure your streaming server settings</CardDescription>
          </div>
          <Badge className="bg-green-500">Online</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="shoutcast">
          <TabsList className="mb-4">
            <TabsTrigger value="shoutcast">SHOUTcast</TabsTrigger>
            <TabsTrigger value="icecast">Icecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shoutcast" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sc-version">SHOUTcast Version</Label>
                <Select defaultValue="2.6.1">
                  <SelectTrigger id="sc-version">
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.6.1">v2.6.1 (Latest)</SelectItem>
                    <SelectItem value="2.5.5">v2.5.5</SelectItem>
                    <SelectItem value="2.4.8">v2.4.8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sc-admin-port">Admin Port</Label>
                <Input id="sc-admin-port" defaultValue="8000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sc-port">Streaming Port</Label>
                <Input id="sc-port" defaultValue="8001" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sc-password">Admin Password</Label>
                <Input id="sc-password" type="password" defaultValue="********" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sc-max-listeners">Maximum Listeners</Label>
              <Input id="sc-max-listeners" defaultValue="100" />
            </div>
            
            <div className="flex items-center justify-between space-y-0 pt-2">
              <Label htmlFor="sc-yp">Enable YP Directory Listing</Label>
              <Switch id="sc-yp" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between space-y-0 pt-2">
              <Label htmlFor="sc-auto-restart">Automatic Restart on Failure</Label>
              <Switch id="sc-auto-restart" defaultChecked={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="icecast" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ic-version">Icecast Version</Label>
                <Select defaultValue="2.4.4">
                  <SelectTrigger id="ic-version">
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.4.4">v2.4.4 (Latest)</SelectItem>
                    <SelectItem value="2.4.2">v2.4.2</SelectItem>
                    <SelectItem value="2.4.0">v2.4.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ic-port">Listening Port</Label>
                <Input id="ic-port" defaultValue="8000" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ic-admin-user">Admin Username</Label>
                <Input id="ic-admin-user" defaultValue="admin" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ic-admin-password">Admin Password</Label>
                <Input id="ic-admin-password" type="password" defaultValue="********" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ic-source-password">Source Password</Label>
                <Input id="ic-source-password" type="password" defaultValue="********" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ic-relay-password">Relay Password</Label>
                <Input id="ic-relay-password" type="password" defaultValue="********" />
              </div>
            </div>
            
            <div className="flex items-center justify-between space-y-0 pt-2">
              <Label htmlFor="ic-public">Public Server</Label>
              <Switch id="ic-public" defaultChecked={true} />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Restart Server
          </Button>
          <Button className="gap-2">
            Save Configuration
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerConfig;
