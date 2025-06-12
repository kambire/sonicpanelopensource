
#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Función para mostrar spinner
show_spinner() {
    local -r pid="${1}"
    local -r delay='0.75'
    local spinstr='\|/-'
    local temp
    while ps a | awk '{print $1}' | grep -q "${pid}"; do
        temp="${spinstr#?}"
        printf " [%c]  " "${spinstr}"
        spinstr=${temp}${spinstr%"${temp}"}
        sleep "${delay}"
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# Función para mostrar progreso
print_step() {
    echo -e "${CYAN}╭─────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}│${NC} ${WHITE}[$1/10]${NC} $2"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────╯${NC}"
    echo ""
}

# Función para mostrar éxito
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    echo ""
}

# Función para mostrar error
print_error() {
    echo -e "${RED}❌ Error: $1${NC}"
    echo ""
}

# Función para mostrar advertencia
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    echo ""
}

# Banner principal
clear
echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║                                                                      ║"
echo "║    ███████╗ ██████╗ ███╗   ██╗██╗ ██████╗    ██████╗  █████╗ ███╗   ██║"
echo "║    ██╔════╝██╔═══██╗████╗  ██║██║██╔════╝    ██╔══██╗██╔══██╗████╗  ██║"
echo "║    ███████╗██║   ██║██╔██╗ ██║██║██║         ██████╔╝███████║██╔██╗ ██║"
echo "║    ╚════██║██║   ██║██║╚██╗██║██║██║         ██╔═══╝ ██╔══██║██║╚██╗██║"
echo "║    ███████║╚██████╔╝██║ ╚████║██║╚██████╗    ██║     ██║  ██║██║ ╚████║"
echo "║    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚═════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝"
echo "║                                                                      ║"
echo "║                     🎵 INSTALACIÓN AUTOMÁTICA 🎵                     ║"
echo "║                        Panel de Radio Streaming                      ║"
echo "║                                                                      ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}┌─ Información del Sistema ─────────────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC} 🖥️  OS: $(lsb_release -d | cut -f2)"
echo -e "${WHITE}│${NC} 🔧 Arquitectura: $(uname -m)"
echo -e "${WHITE}│${NC} 💾 RAM: $(free -h | awk '/^Mem:/ {print $2}')"
echo -e "${WHITE}│${NC} 💿 Disco: $(df -h / | awk 'NR==2 {print $4}') disponibles"
echo -e "${CYAN}└────────────────────────────────────────────────────────────────┘${NC}"
echo ""

# Verificar si se ejecuta como root
if [ "$(id -u)" != "0" ]; then
   print_error "Este script debe ejecutarse como root (usar sudo)"
   exit 1
fi

# Verificar versión de Ubuntu
if ! grep -q "22.04" /etc/os-release; then
    print_warning "Este script está optimizado para Ubuntu 22.04 LTS"
    echo -e "${YELLOW}¿Desea continuar? (y/N): ${NC}"
    read -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}🚀 Iniciando instalación...${NC}"
echo ""
sleep 2

# 1. Actualizar sistema
print_step "1" "Actualizando paquetes del sistema..."
{
    apt update > /dev/null 2>&1 &
    show_spinner $!
    apt upgrade -y > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Sistema actualizado correctamente"

# 2. Instalar dependencias básicas
print_step "2" "Instalando dependencias básicas..."
{
    apt install -y curl wget unzip git build-essential software-properties-common > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Dependencias básicas instaladas"

# 3. Instalar Apache y PHP
print_step "3" "Instalando servidor web (Apache + PHP)..."
{
    apt install -y apache2 php php-cli php-fpm php-mysql php-mbstring php-xml php-curl php-zip php-gd php-json > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Servidor web instalado"

# 4. Instalar MySQL
print_step "4" "Instalando y configurando MySQL..."
{
    apt install -y mysql-server > /dev/null 2>&1 &
    show_spinner $!
    systemctl start mysql > /dev/null 2>&1
    systemctl enable mysql > /dev/null 2>&1
}
print_success "MySQL instalado y configurado"

# 5. Configurar base de datos
print_step "5" "Configurando base de datos..."
{
    mysql -e "CREATE DATABASE IF NOT EXISTS geeks_streaming CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" > /dev/null 2>&1
    mysql -e "CREATE USER IF NOT EXISTS 'geeks_user'@'localhost' IDENTIFIED BY 'GeeksStreaming2024!';" > /dev/null 2>&1
    mysql -e "GRANT ALL PRIVILEGES ON geeks_streaming.* TO 'geeks_user'@'localhost';" > /dev/null 2>&1
    mysql -e "FLUSH PRIVILEGES;" > /dev/null 2>&1
}
print_success "Base de datos configurada"

# 6. Instalar Node.js
print_step "6" "Instalando Node.js..."
{
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1 &
    show_spinner $!
    apt install -y nodejs > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Node.js instalado"

# 7. Instalar SHOUTcast
print_step "7" "Instalando SHOUTcast..."
{
    mkdir -p /opt/shoutcast
    cd /opt/shoutcast
    wget -O sc_serv.tar.gz "http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz" > /dev/null 2>&1 &
    show_spinner $!
    tar -xzf sc_serv.tar.gz > /dev/null 2>&1
    chmod +x sc_serv
}

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

print_success "SHOUTcast instalado"

# 8. Instalar Icecast
print_step "8" "Instalando Icecast..."
{
    apt install -y icecast2 > /dev/null 2>&1 &
    show_spinner $!
}

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

print_success "Icecast instalado"

# 9. Clonar e instalar el panel
print_step "9" "Instalando Sonic Panel..."
{
    cd /var/www
    rm -rf geeks-streaming-panel > /dev/null 2>&1
    git clone https://github.com/kambire/sonicpanelopensource.git geeks-streaming-panel > /dev/null 2>&1 &
    show_spinner $!
    cd geeks-streaming-panel
    npm install > /dev/null 2>&1 &
    show_spinner $!
    npm run build > /dev/null 2>&1 &
    show_spinner $!
    chown -R www-data:www-data /var/www/geeks-streaming-panel
    chmod -R 755 /var/www/geeks-streaming-panel
}
print_success "Panel instalado"

# Configurar Apache en puerto 7000
echo "Listen 7000" >> /etc/apache2/ports.conf

cat > /etc/apache2/sites-available/geeks-streaming.conf << EOL
<VirtualHost *:7000>
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
a2enmod rewrite > /dev/null 2>&1
a2enmod proxy > /dev/null 2>&1
a2enmod proxy_http > /dev/null 2>&1

# Habilitar el sitio
a2dissite 000-default > /dev/null 2>&1
a2ensite geeks-streaming.conf > /dev/null 2>&1

# 10. Configurar firewall y servicios
print_step "10" "Configurando firewall y servicios..."
{
    ufw --force enable > /dev/null 2>&1
    ufw allow 22/tcp > /dev/null 2>&1
    ufw allow 7000/tcp > /dev/null 2>&1
    ufw allow 443/tcp > /dev/null 2>&1
    ufw allow 8000/tcp > /dev/null 2>&1
    ufw allow 8080/tcp > /dev/null 2>&1
    
    systemctl daemon-reload > /dev/null 2>&1
    systemctl enable shoutcast.service > /dev/null 2>&1
    systemctl start shoutcast.service > /dev/null 2>&1
    systemctl enable icecast2 > /dev/null 2>&1
    systemctl start icecast2 > /dev/null 2>&1
    systemctl restart apache2 > /dev/null 2>&1
}
print_success "Servicios configurados"

# Crear archivo de configuración del sistema
cat > /opt/geeks-streaming-config.txt << EOL
=== CONFIGURACIÓN DE SONIC PANEL ===

Panel Web: http://$(curl -s ifconfig.me || echo "TU-IP-PUBLICA"):7000
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

Para ver esta información nuevamente: cat /opt/geeks-streaming-config.txt
EOL

# Limpiar archivos temporales
cd /tmp
rm -rf /tmp/geeks-* > /dev/null 2>&1

# Banner final
clear
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                           ║"
echo "║    🎉 ¡INSTALACIÓN COMPLETADA EXITOSAMENTE! 🎉                           ║"
echo "║                                                                           ║"
echo "║         ███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗         ║"
echo "║         ██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝         ║"
echo "║         ███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗         ║"
echo "║         ╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║         ║"
echo "║         ███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║         ║"
echo "║         ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝         ║"
echo "║                                                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}┌─── Información de Acceso ──────────────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🌐 ${BLUE}Panel Web:${NC} http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA"):7000"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🔑 ${YELLOW}Credenciales por defecto:${NC}"
echo -e "${WHITE}│${NC}    Usuario: admin@geeksstreaming.com"
echo -e "${WHITE}│${NC}    Contraseña: admin123"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 📡 ${PURPLE}Servidores de Streaming:${NC}"
echo -e "${WHITE}│${NC}    SHOUTcast: http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA"):8000/admin.cgi"
echo -e "${WHITE}│${NC}    Icecast: http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA"):8080/admin/"
echo -e "${WHITE}│${NC}"
echo -e "${CYAN}└─────────────────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${RED}⚠️  IMPORTANTE: ${YELLOW}Cambia las credenciales inmediatamente${NC}"
echo ""
echo -e "${BLUE}📋 Configuración completa: ${WHITE}cat /opt/geeks-streaming-config.txt${NC}"
echo ""
echo -e "${PURPLE}🆘 ¿Necesitas ayuda? ${WHITE}https://github.com/kambire/sonicpanelopensource${NC}"
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                     ¡Gracias por usar Sonic Panel!                       ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
