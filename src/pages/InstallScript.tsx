
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Copy, Download, CheckCircle2, Server, Database, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

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
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Server Setup
              </CardTitle>
              <CardDescription>
                Configures the server environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Ubuntu 22.04 dependency installation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Apache/Nginx web server setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  PHP configuration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  System user creation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Security hardening
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Database Setup
              </CardTitle>
              <CardDescription>
                Configures MySQL database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  MySQL installation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Database creation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  User privileges setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Schema migration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Backup configuration
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                Streaming Setup
              </CardTitle>
              <CardDescription>
                Configures streaming servers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  SHOUTcast installation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Icecast installation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  AutoDJ setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Service configuration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Startup automation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
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
                <div className="relative">
                  <div className="absolute right-4 top-4 z-10">
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <div className="bg-black rounded-md p-4 text-white font-mono text-sm overflow-auto max-h-96">
                    <pre className="whitespace-pre-wrap">
{`#!/bin/bash

# Radio Wave Orchestrator - Installation Script
# For Ubuntu 22.04 LTS
# This script automates the installation of all required components

echo "======================================================"
echo "      Radio Wave Orchestrator Installation Script     "
echo "======================================================"
echo "Starting installation on Ubuntu 22.04..."
echo ""

# Check if running as root
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

# Update system
echo "[1/9] Updating system packages..."
apt update && apt upgrade -y

# Install dependencies
echo "[2/9] Installing dependencies..."
apt install -y curl wget unzip git build-essential apache2 mysql-server php php-cli php-fpm php-mysql php-mbstring php-xml php-curl

# Configure MySQL
echo "[3/9] Configuring MySQL..."
mysql -e "CREATE DATABASE radiodb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER 'radiouser'@'localhost' IDENTIFIED BY 'securepassword';"
mysql -e "GRANT ALL PRIVILEGES ON radiodb.* TO 'radiouser'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Install SHOUTcast
echo "[4/9] Installing SHOUTcast..."
mkdir -p /opt/shoutcast
cd /opt/shoutcast
wget -O sc_serv.tar.gz http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz
tar -xzf sc_serv.tar.gz
chmod +x sc_serv
cp sc_serv.conf sc_serv.conf.bak
# Configure SHOUTcast
cat > sc_serv.conf << EOL
adminpassword=admin_password
password=source_password
portbase=8000
maxuser=100
logfile=/var/log/sc_serv.log
w3clog=/var/log/sc_w3c.log
banfile=/opt/shoutcast/banlist.txt
ripfile=/opt/shoutcast/riplist.txt
EOL

# Create SHOUTcast systemd service
cat > /etc/systemd/system/shoutcast.service << EOL
[Unit]
Description=SHOUTcast Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/shoutcast
ExecStart=/opt/shoutcast/sc_serv
Restart=always

[Install]
WantedBy=multi-user.target
EOL

# Install Icecast
echo "[5/9] Installing Icecast..."
apt install -y icecast2
# Configure Icecast
cp /etc/icecast2/icecast.xml /etc/icecast2/icecast.xml.bak

# Clone and install Laravel app
echo "[6/9] Setting up Radio Wave Orchestrator..."
cd /var/www
git clone https://github.com/example/radio-wave-orchestrator.git
cd radio-wave-orchestrator
composer install --no-dev
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
chown -R www-data:www-data /var/www/radio-wave-orchestrator
chmod -R 755 /var/www/radio-wave-orchestrator
chmod -R 777 /var/www/radio-wave-orchestrator/storage

# Configure Apache
echo "[7/9] Configuring web server..."
cat > /etc/apache2/sites-available/radio.conf << EOL
<VirtualHost *:80>
    ServerName radio.yourdomain.com
    DocumentRoot /var/www/radio-wave-orchestrator/public
    
    <Directory /var/www/radio-wave-orchestrator/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog \${APACHE_LOG_DIR}/radio-error.log
    CustomLog \${APACHE_LOG_DIR}/radio-access.log combined
</VirtualHost>
EOL

a2ensite radio.conf
a2enmod rewrite
systemctl restart apache2

# Start services
echo "[8/9] Starting services..."
systemctl enable shoutcast.service
systemctl start shoutcast.service
systemctl restart icecast2

# Final steps
echo "[9/9] Finalizing installation..."
echo "Firewall configuration..."
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8000/tcp
ufw allow 8001/tcp

echo ""
echo "======================================================"
echo "      Installation Completed Successfully!            "
echo "======================================================"
echo ""
echo "Radio Wave Orchestrator has been installed at:"
echo "http://your-server-ip"
echo ""
echo "Default admin credentials:"
echo "Username: admin@example.com"
echo "Password: password"
echo ""
echo "IMPORTANT: Please change the default credentials immediately!"
echo "======================================================"
`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Script
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="instructions">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Installation Steps</h3>
                    <ol className="mt-2 space-y-2 pl-6 list-decimal">
                      <li>Connect to your Ubuntu 22.04 server via SSH</li>
                      <li>Create a new file named <code className="bg-muted px-1 py-0.5 rounded">install.sh</code></li>
                      <li>Copy and paste the script into this file</li>
                      <li>Make the script executable with: <code className="bg-muted px-1 py-0.5 rounded">chmod +x install.sh</code></li>
                      <li>Run the script with: <code className="bg-muted px-1 py-0.5 rounded">sudo ./install.sh</code></li>
                      <li>Follow the on-screen instructions</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">System Requirements</h3>
                    <ul className="mt-2 space-y-2 pl-6 list-disc">
                      <li>Ubuntu 22.04 LTS (fresh installation recommended)</li>
                      <li>Minimum 2GB RAM</li>
                      <li>At least 20GB free disk space</li>
                      <li>Root or sudo access</li>
                      <li>Public IP address (for internet-facing installations)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Post-Installation</h3>
                    <ul className="mt-2 space-y-2 pl-6 list-disc">
                      <li>Change the default admin password immediately</li>
                      <li>Configure your domain DNS if you're using a domain name</li>
                      <li>Set up SSL certificates for secure connections</li>
                      <li>Review and update firewall settings as needed</li>
                      <li>Set up automatic backups for your database</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InstallScript;
