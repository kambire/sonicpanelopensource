
#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Variables para logging
LOG_FILE="/tmp/sonic-install-$(date +%Y%m%d_%H%M%S).log"
VERBOSE=false

# Función para logging
log_info() {
    echo -e "${GRAY}[$(date '+%H:%M:%S')] $1${NC}"
    echo "[$(date '+%H:%M:%S')] $1" >> "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] ✅ $1${NC}"
    echo "[$(date '+%H:%M:%S')] SUCCESS: $1" >> "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ❌ $1${NC}"
    echo "[$(date '+%H:%M:%S')] ERROR: $1" >> "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] ⚠️  $1${NC}"
    echo "[$(date '+%H:%M:%S')] WARNING: $1" >> "$LOG_FILE"
}

# Función para ejecutar comandos con logs visibles
run_command() {
    local cmd="$1"
    local description="$2"
    local show_output="${3:-false}"
    
    log_info "$description..."
    
    if [ "$show_output" = "true" ] || [ "$VERBOSE" = "true" ]; then
        if eval "$cmd" 2>&1 | tee -a "$LOG_FILE"; then
            log_success "$description completado"
            return 0
        else
            log_error "$description falló"
            return 1
        fi
    else
        if eval "$cmd" >> "$LOG_FILE" 2>&1; then
            log_success "$description completado"
            return 0
        else
            log_error "$description falló"
            echo -e "${RED}Ver detalles en: $LOG_FILE${NC}"
            return 1
        fi
    fi
}

# Función para mostrar progreso
print_step() {
    echo ""
    echo -e "${CYAN}╭─────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}│${NC} ${WHITE}[$1/10]${NC} $2"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────╯${NC}"
    echo ""
}

# Función para mostrar progreso de descarga
show_download_progress() {
    local url="$1"
    local output="$2"
    local description="$3"
    
    log_info "Descargando $description..."
    if wget --progress=bar:force "$url" -O "$output" 2>&1 | \
        sed -u 's/.* \([0-9]\+%\)\ \+\([0-9.]\+.\) \(.*\)/\1 (\2\/s) \3/' | \
        while IFS= read -r line; do
            echo -e "${BLUE}  → $line${NC}"
        done; then
        log_success "$description descargado"
        return 0
    else
        log_error "Falló la descarga de $description"
        return 1
    fi
}

# Verificar argumentos
if [[ "$1" == "-v" ]] || [[ "$1" == "--verbose" ]]; then
    VERBOSE=true
    log_info "Modo verbose activado"
fi

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
echo -e "${WHITE}│${NC} 📋 Log: $LOG_FILE"
echo -e "${CYAN}└────────────────────────────────────────────────────────────────┘${NC}"
echo ""

log_info "Iniciando instalación de Sonic Panel"

# Verificar si se ejecuta como root
if [ "$(id -u)" != "0" ]; then
   log_error "Este script debe ejecutarse como root (usar sudo)"
   exit 1
fi

# Verificar versión de Ubuntu
if ! grep -q "22.04" /etc/os-release; then
    log_warning "Este script está optimizado para Ubuntu 22.04 LTS"
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
log_info "Actualizando lista de paquetes..."
if ! run_command "apt update" "Actualización de lista de paquetes"; then
    log_error "Falló la actualización de paquetes"
    exit 1
fi

log_info "Actualizando paquetes instalados (esto puede tomar varios minutos)..."
if ! run_command "apt upgrade -y" "Actualización de paquetes del sistema"; then
    log_error "Falló la actualización del sistema"
    exit 1
fi

# 2. Instalar dependencias básicas
print_step "2" "Instalando dependencias básicas..."
BASIC_DEPS="curl wget unzip git build-essential software-properties-common debconf-utils"
log_info "Instalando: $BASIC_DEPS"
if ! run_command "apt install -y $BASIC_DEPS" "Instalación de dependencias básicas"; then
    log_error "Falló la instalación de dependencias básicas"
    exit 1
fi

# 3. Instalar Apache y PHP
print_step "3" "Instalando servidor web (Apache + PHP)..."
PHP_PACKAGES="apache2 php php-cli php-fpm php-mysql php-mbstring php-xml php-curl php-zip php-gd php-json"
log_info "Instalando Apache y PHP con extensiones necesarias..."
if ! run_command "apt install -y $PHP_PACKAGES" "Instalación de Apache y PHP"; then
    log_error "Falló la instalación de Apache/PHP"
    exit 1
fi

# 4. Instalar MySQL
print_step "4" "Instalando y configurando MySQL..."
log_info "Instalando MySQL Server..."
if ! run_command "apt install -y mysql-server" "Instalación de MySQL"; then
    log_error "Falló la instalación de MySQL"
    exit 1
fi

log_info "Iniciando y habilitando MySQL..."
run_command "systemctl start mysql" "Inicio de MySQL"
run_command "systemctl enable mysql" "Habilitación de MySQL"

# 5. Configurar base de datos
print_step "5" "Configurando base de datos..."
log_info "Creando base de datos geeks_streaming..."
run_command "mysql -e \"CREATE DATABASE IF NOT EXISTS geeks_streaming CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\"" "Creación de base de datos"

log_info "Creando usuario de base de datos..."
run_command "mysql -e \"CREATE USER IF NOT EXISTS 'geeks_user'@'localhost' IDENTIFIED BY 'GeeksStreaming2024!';\"" "Creación de usuario MySQL"

log_info "Asignando permisos..."
run_command "mysql -e \"GRANT ALL PRIVILEGES ON geeks_streaming.* TO 'geeks_user'@'localhost';\"" "Asignación de permisos"
run_command "mysql -e \"FLUSH PRIVILEGES;\"" "Actualización de permisos"

# 6. Instalar Node.js
print_step "6" "Instalando Node.js..."
log_info "Agregando repositorio de Node.js 18.x..."
if ! run_command "curl -fsSL https://deb.nodesource.com/setup_18.x | bash -" "Configuración del repositorio Node.js"; then
    log_error "Falló la configuración del repositorio Node.js"
    exit 1
fi

log_info "Instalando Node.js..."
if ! run_command "apt install -y nodejs" "Instalación de Node.js"; then
    log_error "Falló la instalación de Node.js"
    exit 1
fi

log_info "Node.js instalado: $(node --version), NPM: $(npm --version)"

# 7. Instalar SHOUTcast
print_step "7" "Instalando SHOUTcast..."
log_info "Creando directorio para SHOUTcast..."
run_command "mkdir -p /opt/shoutcast" "Creación de directorio SHOUTcast"

cd /opt/shoutcast
log_info "Descargando SHOUTcast Server..."
if ! show_download_progress "http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz" "sc_serv.tar.gz" "SHOUTcast Server"; then
    log_error "Falló la descarga de SHOUTcast"
    exit 1
fi

log_info "Extrayendo SHOUTcast..."
run_command "tar -xzf sc_serv.tar.gz" "Extracción de SHOUTcast"
run_command "chmod +x sc_serv" "Configuración de permisos SHOUTcast"

log_info "Creando configuración de SHOUTcast..."
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

log_info "Creando servicio systemd para SHOUTcast..."
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

log_success "SHOUTcast configurado correctamente"

# 8. Instalar Icecast de forma no interactiva
print_step "8" "Instalando Icecast de forma automática..."
log_info "Preconfiguración de Icecast2 para instalación no interactiva..."

# Preconfigurar respuestas para evitar prompts interactivos
echo 'icecast2 icecast2/icecast-setup boolean true' | debconf-set-selections
echo 'icecast2 icecast2/hostname string localhost' | debconf-set-selections
echo 'icecast2 icecast2/sourcepassword password geeks_source_2024' | debconf-set-selections
echo 'icecast2 icecast2/relaypassword password geeks_relay_2024' | debconf-set-selections
echo 'icecast2 icecast2/adminpassword password geeks_admin_2024' | debconf-set-selections

log_info "Instalando Icecast2 de forma no interactiva..."
if ! run_command "DEBIAN_FRONTEND=noninteractive apt install -y icecast2" "Instalación de Icecast2"; then
    log_error "Falló la instalación de Icecast2"
    exit 1
fi

log_info "Respaldando configuración original de Icecast..."
run_command "cp /etc/icecast2/icecast.xml /etc/icecast2/icecast.xml.backup" "Backup de configuración Icecast"

log_info "Configurando Icecast con parámetros personalizados..."
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

# Habilitar Icecast2 para que inicie automáticamente
log_info "Habilitando Icecast2 para inicio automático..."
run_command "sed -i 's/ENABLE=false/ENABLE=true/g' /etc/default/icecast2" "Habilitación de inicio automático Icecast2"

log_success "Icecast configurado correctamente"

# 9. Clonar e instalar el panel
print_step "9" "Instalando Sonic Panel..."
log_info "Limpiando instalación anterior si existe..."
cd /var/www
run_command "rm -rf geeks-streaming-panel" "Limpieza de instalación anterior"

log_info "Clonando repositorio del panel..."
if ! run_command "git clone https://github.com/kambire/sonicpanelopensource.git geeks-streaming-panel" "Clonación del repositorio"; then
    log_error "Falló la clonación del repositorio"
    exit 1
fi

cd geeks-streaming-panel
log_info "Instalando dependencias Node.js (esto puede tomar varios minutos)..."
if ! run_command "npm install" "Instalación de dependencias Node.js" true; then
    log_error "Falló la instalación de dependencias"
    exit 1
fi

log_info "Construyendo aplicación..."
if ! run_command "npm run build" "Construcción de la aplicación" true; then
    log_error "Falló la construcción de la aplicación"
    exit 1
fi

log_info "Configurando permisos..."
run_command "chown -R www-data:www-data /var/www/geeks-streaming-panel" "Configuración de propietarios"
run_command "chmod -R 755 /var/www/geeks-streaming-panel" "Configuración de permisos"

# Configurar Apache
log_info "Configurando Apache en puerto 7000..."
if ! grep -q "Listen 7000" /etc/apache2/ports.conf; then
    echo "Listen 7000" >> /etc/apache2/ports.conf
    log_info "Puerto 7000 agregado a Apache"
fi

log_info "Deshabilitando sitio por defecto..."
run_command "a2dissite 000-default" "Deshabilitación del sitio por defecto"

log_info "Creando configuración del sitio..."
cat > /etc/apache2/sites-available/geeks-streaming.conf << EOL
<VirtualHost *:7000>
    ServerName _
    DocumentRoot /var/www/geeks-streaming-panel/dist
    DirectoryIndex index.html
    
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

# Verificar que el directorio dist existe
if [ ! -d "/var/www/geeks-streaming-panel/dist" ]; then
    log_warning "Directorio dist no encontrado, usando carpeta principal"
    sed -i 's|/var/www/geeks-streaming-panel/dist|/var/www/geeks-streaming-panel|g' /etc/apache2/sites-available/geeks-streaming.conf
fi

log_info "Habilitando módulos de Apache..."
run_command "a2enmod rewrite" "Habilitación de mod_rewrite"
run_command "a2enmod proxy" "Habilitación de mod_proxy"
run_command "a2enmod proxy_http" "Habilitación de mod_proxy_http"

log_info "Habilitando sitio..."
run_command "a2ensite geeks-streaming.conf" "Habilitación del sitio"

log_success "Panel instalado y configurado"

# 10. Configurar firewall y servicios
print_step "10" "Configurando firewall y servicios..."
log_info "Configurando firewall UFW..."
run_command "ufw --force enable" "Habilitación de UFW"
run_command "ufw allow 22/tcp" "Permitir SSH"
run_command "ufw allow 7000/tcp" "Permitir puerto 7000 (Panel)"
run_command "ufw allow 443/tcp" "Permitir HTTPS"
run_command "ufw allow 8000/tcp" "Permitir puerto 8000 (SHOUTcast)"
run_command "ufw allow 8080/tcp" "Permitir puerto 8080 (Icecast)"

log_info "Configurando servicios del sistema..."
run_command "systemctl daemon-reload" "Recarga de demonios systemd"
run_command "systemctl enable shoutcast.service" "Habilitación de SHOUTcast"
run_command "systemctl start shoutcast.service" "Inicio de SHOUTcast"
run_command "systemctl enable icecast2" "Habilitación de Icecast2"
run_command "systemctl start icecast2" "Inicio de Icecast2"
run_command "systemctl restart apache2" "Reinicio de Apache"

log_info "Verificando estado de servicios..."
if systemctl is-active --quiet apache2; then
    log_success "Apache ejecutándose correctamente"
else
    log_error "Apache no está ejecutándose"
fi

if systemctl is-active --quiet shoutcast; then
    log_success "SHOUTcast ejecutándose correctamente"
else
    log_warning "SHOUTcast no está ejecutándose"
fi

if systemctl is-active --quiet icecast2; then
    log_success "Icecast ejecutándose correctamente"
else
    log_warning "Icecast no está ejecutándose"
fi

# Crear archivo de configuración del sistema
log_info "Creando archivo de configuración del sistema..."
cat > /opt/geeks-streaming-config.txt << EOL
=== CONFIGURACIÓN DE SONIC PANEL ===
Instalado: $(date)

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

Log de instalación: $LOG_FILE
Para ver esta información nuevamente: cat /opt/geeks-streaming-config.txt
EOL

# Limpiar archivos temporales
log_info "Limpiando archivos temporales..."
cd /tmp
run_command "rm -rf /tmp/geeks-*" "Limpieza de archivos temporales"

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
echo -e "${WHITE}│${NC} 🔐 ${CYAN}Credenciales Icecast:${NC}"
echo -e "${WHITE}│${NC}    Admin User: admin"
echo -e "${WHITE}│${NC}    Admin Password: geeks_admin_2024"
echo -e "${WHITE}│${NC}    Source Password: geeks_source_2024"
echo -e "${WHITE}│${NC}    Relay Password: geeks_relay_2024"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 📋 ${GRAY}Log detallado:${NC} $LOG_FILE"
echo -e "${WHITE}│${NC}"
echo -e "${CYAN}└─────────────────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${RED}⚠️  IMPORTANTE: ${YELLOW}Cambia las credenciales inmediatamente${NC}"
echo ""
echo -e "${BLUE}📋 Configuración completa: ${WHITE}cat /opt/geeks-streaming-config.txt${NC}"
echo -e "${BLUE}📄 Ver log completo: ${WHITE}cat $LOG_FILE${NC}"
echo ""
echo -e "${PURPLE}🆘 ¿Necesitas ayuda? ${WHITE}https://github.com/kambire/sonicpanelopensource${NC}"
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                     ¡Gracias por usar Sonic Panel!                       ║"
echo "║              Usa 'sudo ./install.sh -v' para modo verbose                ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

log_success "Instalación de Sonic Panel completada exitosamente"
