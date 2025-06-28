
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
echo "[1/8] Updating system packages..."
apt update && apt upgrade -y

# Install dependencies
echo "[2/8] Installing dependencies..."
apt install -y curl wget unzip git build-essential apache2 mysql-server php php-cli php-fpm php-mysql php-mbstring php-xml php-curl

# Configure MySQL
echo "[3/8] Configuring MySQL..."
mysql -e "CREATE DATABASE radiodb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER 'radiouser'@'localhost' IDENTIFIED BY 'securepassword';"
mysql -e "GRANT ALL PRIVILEGES ON radiodb.* TO 'radiouser'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Install SHOUTcast
echo "[4/8] Installing SHOUTcast..."
mkdir -p /opt/shoutcast
cd /opt/shoutcast
wget -O sc_serv.tar.gz http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz
tar -xzf sc_serv.tar.gz
chmod +x sc_serv
cp sc_serv.conf sc_serv.conf.bak

# Configure SHOUTcast for port 8000
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

# Clone and install Laravel app
echo "[5/8] Setting up Radio Wave Orchestrator..."
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
echo "[6/8] Configuring web server..."
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
echo "[7/8] Starting services..."
systemctl enable shoutcast.service
systemctl start shoutcast.service

# Final steps
echo "[8/8] Finalizing installation..."
echo "Firewall configuration..."
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8000/tcp

echo ""
echo "======================================================"
echo "      Installation Completed Successfully!            "
echo "======================================================"
echo ""
echo "Radio Wave Orchestrator has been installed at:"
echo "http://your-server-ip"
echo ""
echo "SHOUTcast Server:"
echo "Admin: http://your-server-ip:8000/admin.cgi"
echo "Stream: http://your-server-ip:8000/"
echo ""
echo "Default admin credentials:"
echo "Username: admin@example.com"
echo "Password: password"
echo ""
echo "IMPORTANT: Please change the default credentials immediately!"
echo "======================================================"`;
