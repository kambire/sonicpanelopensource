
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server } from "lucide-react";
import FeatureCards from "@/components/install/FeatureCards";
import InstallInstructions from "@/components/install/InstallInstructions";
import ScriptDisplay from "@/components/install/ScriptDisplay";

const InstallScript = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Installation Script</h1>
          <p className="text-muted-foreground mt-1">
            Automated installation script for Ubuntu 22.04
          </p>
        </div>
        
        <Alert>
          <Server className="h-4 w-4" />
          <AlertTitle>Server Automation</AlertTitle>
          <AlertDescription>
            This script automates the installation of all required components for running a radio server on Ubuntu 22.04.
          </AlertDescription>
        </Alert>
        
        <FeatureCards />
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Installation Script</CardTitle>
                <CardDescription>
                  Copy and run this script on your Ubuntu 22.04 server
                </CardDescription>
              </div>
              <Badge>Ubuntu 22.04</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="script">
              <TabsList className="mb-4">
                <TabsTrigger value="script">Script</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="script">
                <ScriptDisplay onCopy={handleCopy} copied={copied} />
              </TabsContent>
              
              <TabsContent value="instructions">
                <InstallInstructions />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InstallScript;
