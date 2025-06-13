
export const installScript = `#!/bin/bash

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

# Configure SHOUTcast for port 11000
cat > sc_serv.conf << EOL
adminpassword=admin_password
password=source_password
portbase=11000
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

# Install Icecast with automatic configuration
echo "[5/9] Installing Icecast..."
# Preconfigurar respuestas para la instalación de Icecast2
echo 'icecast2 icecast2/icecast-setup boolean true' | debconf-set-selections
echo 'icecast2 icecast2/hostname string localhost' | debconf-set-selections
echo 'icecast2 icecast2/sourcepassword password geeks_source_2024' | debconf-set-selections
echo 'icecast2 icecast2/relaypassword password geeks_relay_2024' | debconf-set-selections
echo 'icecast2 icecast2/adminpassword password geeks_admin_2024' | debconf-set-selections

# Instalar Icecast2 de forma no interactiva
DEBIAN_FRONTEND=noninteractive apt install -y icecast2

# Configurar Icecast manualmente para mayor control
cp /etc/icecast2/icecast.xml /etc/icecast2/icecast.xml.bak

cat > /etc/icecast2/icecast.xml << EOL
<icecast>
    <location>Earth</location>
    <admin>admin@radioserver.com</admin>
    <limits>
        <clients>100</clients>
        <sources>2</sources>
        <queue-size>524288</queue-size>
        <client-timeout>30</client-timeout>
        <header-timeout>15</header-timeout>
        <source-timeout>10</source-timeout>
        <burst-on-connect>1</burst-on-connect>
        <burst-size>65535</burst-size>
    </limits>
    <authentication>
        <source-password>geeks_source_2024</source-password>
        <relay-password>geeks_relay_2024</relay-password>
        <admin-user>admin</admin-user>
        <admin-password>geeks_admin_2024</admin-password>
    </authentication>
    <hostname>localhost</hostname>
    <listen-socket>
        <port>8080</port>
    </listen-socket>
    <fileserve>1</fileserve>
    <paths>
        <basedir>/usr/share/icecast2</basedir>
        <logdir>/var/log/icecast2</logdir>
        <webroot>/usr/share/icecast2/web</webroot>
        <adminroot>/usr/share/icecast2/admin</adminroot>
        <alias source="/" destination="/status.xsl"/>
    </paths>
    <logging>
        <accesslog>access.log</accesslog>
        <errorlog>error.log</errorlog>
        <loglevel>3</loglevel>
        <logsize>10000</logsize>
    </logging>
</icecast>
EOL

# Habilitar Icecast2 para que inicie automáticamente
sed -i 's/ENABLE=false/ENABLE=true/g' /etc/default/icecast2

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
systemctl enable icecast2
systemctl start icecast2

# Final steps
echo "[9/9] Finalizing installation..."
echo "Firewall configuration..."
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8000/tcp
ufw allow 8080/tcp
ufw allow 11000/tcp

echo ""
echo "======================================================"
echo "      Installation Completed Successfully!            "
echo "======================================================"
echo ""
echo "Radio Wave Orchestrator has been installed at:"
echo "http://your-server-ip"
echo ""
echo "SHOUTcast Server:"
echo "Admin: http://your-server-ip:11000/admin.cgi"
echo "Stream: http://your-server-ip:11000/"
echo ""
echo "Icecast Server:"
echo "Admin: http://your-server-ip:8080/admin/"
echo "Stream: http://your-server-ip:8080/"
echo ""
echo "Icecast Credentials:"
echo "Admin User: admin"
echo "Admin Password: geeks_admin_2024"
echo "Source Password: geeks_source_2024"
echo "Relay Password: geeks_relay_2024"
echo ""
echo "Default admin credentials:"
echo "Username: admin@example.com"
echo "Password: password"
echo ""
echo "IMPORTANT: Please change the default credentials immediately!"
echo "======================================================"`;
