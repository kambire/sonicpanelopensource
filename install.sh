
#!/bin/bash

# Geeks Streaming Panel - Script de Instalación Automática
# Para Ubuntu 22.04 LTS
# Este script automatiza la instalación de todos los componentes necesarios

echo "======================================================"
echo "    Geeks Streaming Panel - Instalación Automática   "
echo "======================================================"
echo "Iniciando instalación en Ubuntu 22.04..."
echo ""

# Verificar si se ejecuta como root
if [ "$(id -u)" != "0" ]; then
   echo "Este script debe ejecutarse como root (usar sudo)" 1>&2
   exit 1
fi

# Verificar versión de Ubuntu
if ! grep -q "22.04" /etc/os-release; then
    echo "⚠️  Advertencia: Este script está optimizado para Ubuntu 22.04 LTS"
    read -p "¿Desea continuar? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Actualizar sistema
echo "[1/10] Actualizando paquetes del sistema..."
apt update && apt upgrade -y

# Instalar dependencias básicas
echo "[2/10] Instalando dependencias básicas..."
apt install -y curl wget unzip git build-essential software-properties-common

# Instalar Apache y PHP
echo "[3/10] Instalando servidor web (Apache + PHP)..."
apt install -y apache2 php php-cli php-fpm php-mysql php-mbstring php-xml php-curl php-zip php-gd php-json

# Instalar MySQL
echo "[4/10] Instalando y configurando MySQL..."
apt install -y mysql-server
systemctl start mysql
systemctl enable mysql

# Configurar base de datos
echo "[5/10] Configurando base de datos..."
mysql -e "CREATE DATABASE IF NOT EXISTS geeks_streaming CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS 'geeks_user'@'localhost' IDENTIFIED BY 'GeeksStreaming2024!';"
mysql -e "GRANT ALL PRIVILEGES ON geeks_streaming.* TO 'geeks_user'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Instalar Node.js y npm (para el frontend)
echo "[6/10] Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Instalar SHOUTcast
echo "[7/10] Instalando SHOUTcast..."
mkdir -p /opt/shoutcast
cd /opt/shoutcast
wget -O sc_serv.tar.gz "http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz"
tar -xzf sc_serv.tar.gz
chmod +x sc_serv

# Configurar SHOUTcast
cat > sc_serv.conf << EOL
adminpassword=admin_geeks_2024
password=source_geeks_2024
portbase=8000
maxuser=100
logfile=/var/log/sc_serv.log
w3clog=/var/log/sc_w3c.log
banfile=/opt/shoutcast/banlist.txt
ripfile=/opt/shoutcast/riplist.txt
EOL

# Crear servicio systemd para SHOUTcast
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
RestartSec=5

[Install]
WantedBy=multi-user.target
EOL

# Instalar Icecast
echo "[8/10] Instalando Icecast..."
apt install -y icecast2

# Configurar Icecast
cp /etc/icecast2/icecast.xml /etc/icecast2/icecast.xml.backup
cat > /etc/icecast2/icecast.xml << EOL
<icecast>
    <location>Earth</location>
    <admin>admin@geeksstreaming.com</admin>
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

# Clonar e instalar el panel
echo "[9/10] Instalando Geeks Streaming Panel..."
cd /var/www
rm -rf geeks-streaming-panel
git clone https://github.com/kambire/sonicpanelopensource.git geeks-streaming-panel
cd geeks-streaming-panel

# Instalar dependencias del frontend
npm install

# Construir el proyecto
npm run build

# Configurar permisos
chown -R www-data:www-data /var/www/geeks-streaming-panel
chmod -R 755 /var/www/geeks-streaming-panel

# Configurar Apache
cat > /etc/apache2/sites-available/geeks-streaming.conf << EOL
<VirtualHost *:80>
    ServerName _
    DocumentRoot /var/www/geeks-streaming-panel/dist
    
    <Directory /var/www/geeks-streaming-panel/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Configuración para SPA (Single Page Application)
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Proxy para APIs de streaming
    ProxyPreserveHost On
    ProxyPass /shoutcast/ http://localhost:8000/
    ProxyPassReverse /shoutcast/ http://localhost:8000/
    ProxyPass /icecast/ http://localhost:8080/
    ProxyPassReverse /icecast/ http://localhost:8080/
    
    ErrorLog \${APACHE_LOG_DIR}/geeks-streaming-error.log
    CustomLog \${APACHE_LOG_DIR}/geeks-streaming-access.log combined
</VirtualHost>
EOL

# Habilitar módulos de Apache necesarios
a2enmod rewrite
a2enmod proxy
a2enmod proxy_http

# Habilitar el sitio
a2dissite 000-default
a2ensite geeks-streaming.conf
systemctl restart apache2

# Configurar firewall
echo "[10/10] Configurando firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8000/tcp
ufw allow 8080/tcp

# Iniciar servicios
systemctl daemon-reload
systemctl enable shoutcast.service
systemctl start shoutcast.service
systemctl enable icecast2
systemctl start icecast2
systemctl enable apache2
systemctl start apache2

# Crear archivo de configuración del sistema
cat > /opt/geeks-streaming-config.txt << EOL
=== CONFIGURACIÓN DE GEEKS STREAMING PANEL ===

Panel Web: http://$(curl -s ifconfig.me || echo "TU-IP-PUBLICA")
Usuario por defecto: admin@geeksstreaming.com
Contraseña por defecto: admin123

SHOUTcast:
- Puerto: 8000
- Admin: http://$(curl -s ifconfig.me || echo "TU-IP-PUBLICA"):8000/admin.cgi
- Contraseña Admin: admin_geeks_2024
- Contraseña Source: source_geeks_2024

Icecast:
- Puerto: 8080
- Admin: http://$(curl -s ifconfig.me || echo "TU-IP-PUBLICA"):8080/admin/
- Usuario Admin: admin
- Contraseña Admin: geeks_admin_2024
- Contraseña Source: geeks_source_2024

Base de Datos MySQL:
- Base de datos: geeks_streaming
- Usuario: geeks_user
- Contraseña: GeeksStreaming2024!

Archivos de configuración:
- SHOUTcast: /opt/shoutcast/sc_serv.conf
- Icecast: /etc/icecast2/icecast.xml
- Apache: /etc/apache2/sites-available/geeks-streaming.conf
- Panel: /var/www/geeks-streaming-panel/

Para ver esta información nuevamente: cat /opt/geeks-streaming-config.txt
EOL

# Limpiar archivos temporales
cd /tmp
rm -rf /tmp/geeks-*

echo ""
echo "======================================================"
echo "       ¡INSTALACIÓN COMPLETADA EXITOSAMENTE!         "
echo "======================================================"
echo ""
echo "🎉 Geeks Streaming Panel ha sido instalado correctamente"
echo ""
echo "🌐 Accede al panel en: http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA")"
echo ""
echo "🔑 Credenciales por defecto:"
echo "   Usuario: admin@geeksstreaming.com"
echo "   Contraseña: admin123"
echo ""
echo "⚠️  IMPORTANTE: Cambia las credenciales inmediatamente"
echo ""
echo "📋 Para ver la configuración completa:"
echo "   cat /opt/geeks-streaming-config.txt"
echo ""
echo "🆘 ¿Necesitas ayuda? Visita: https://github.com/kambire/sonicpanelopensource"
echo "======================================================"
echo ""
