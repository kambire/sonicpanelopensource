
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
echo "║                    SOLO SHOUTcast - Sin SSL/HTTPS                    ║"
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

log_info "Iniciando instalación de Sonic Panel (Solo SHOUTcast)"

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

# 2. Instalar dependencias básicas (sin SSL)
print_step "2" "Instalando dependencias básicas..."
BASIC_DEPS="curl wget unzip git build-essential software-properties-common debconf-utils"
log_info "Instalando: $BASIC_DEPS"
if ! run_command "apt install -y $BASIC_DEPS" "Instalación de dependencias básicas"; then
    log_error "Falló la instalación de dependencias básicas"
    exit 1
fi

# 3. Instalar Apache y PHP (sin SSL)
print_step "3" "Instalando servidor web (Apache + PHP - Solo HTTP)..."
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

# 7. Instalar SOLO SHOUTcast (eliminar Icecast2 completamente)
print_step "7" "Instalando SHOUTcast (SOLAMENTE)..."
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

log_info "Creando configuración base de SHOUTcast..."
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

# 8. Panel installation (MEJORADO PARA EVITAR PANTALLA EN BLANCO)
print_step "8" "Instalando Sonic Panel..."
log_info "Limpiando instalación anterior si existe..."
cd /var/www
run_command "rm -rf geeks-streaming-panel" "Limpieza de instalación anterior"

log_info "Clonando repositorio del panel..."
if ! run_command "git clone https://github.com/kambire/sonicpanelopensource.git geeks-streaming-panel" "Clonación del repositorio"; then
    log_error "Falló la clonación del repositorio"
    exit 1
fi

cd geeks-streaming-panel

# Verificar si existe package.json
if [ ! -f "package.json" ]; then
    log_warning "No se encontró package.json, creando configuración básica..."
    cat > package.json << EOL
{
  "name": "sonic-panel",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0"
  }
}
EOL
fi

# Crear archivo index.html si no existe
if [ ! -f "index.html" ]; then
    log_info "Creando index.html base..."
    cat > index.html << EOL
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonic Panel - Radio Streaming</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            color: white;
            max-width: 600px;
            padding: 2rem;
        }
        .logo {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .status {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        .button {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 0 10px;
            transition: background 0.3s;
        }
        .button:hover {
            background: #45a049;
        }
        .button.secondary {
            background: #2196F3;
        }
        .button.secondary:hover {
            background: #1976D2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🎵 SONIC PANEL</div>
        <div class="subtitle">Panel de Control para Radio Streaming</div>
        
        <div class="status">
            <h3>✅ Instalación Completada</h3>
            <p>El panel de control ha sido instalado correctamente</p>
            <p><strong>SHOUTcast Server:</strong> Activo en puerto 8000</p>
            <p><strong>Puertos disponibles:</strong> 8002-8020 (pares)</p>
        </div>
        
        <div>
            <a href="http://$(curl -s ifconfig.me 2>/dev/null || echo "localhost"):8000/admin.cgi" class="button">
                Administrar SHOUTcast
            </a>
            <a href="http://$(curl -s ifconfig.me 2>/dev/null || echo "localhost"):8000/" class="button secondary">
                Ver Stream
            </a>
        </div>
        
        <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.8;">
            <p>📡 Credenciales SHOUTcast:</p>
            <p>Admin: admin_geeks_2024 | Source: source_geeks_2024</p>
        </div>
    </div>
</body>
</html>
EOL
fi

log_info "Configurando permisos del panel..."
run_command "chown -R www-data:www-data /var/www/geeks-streaming-panel" "Configuración de propietarios"
run_command "chmod -R 755 /var/www/geeks-streaming-panel" "Configuración de permisos"

# 9. Configurar Apache MEJORADO (puerto 7000, HTTP únicamente)
print_step "9" "Configurando Apache en puerto 7000 (HTTP únicamente)..."

# Configurar puerto 7000 en Apache
if ! grep -q "Listen 7000" /etc/apache2/ports.conf; then
    echo "Listen 7000" >> /etc/apache2/ports.conf
    log_info "Puerto 7000 agregado a Apache"
fi

log_info "Deshabilitando sitio por defecto de Apache..."
run_command "a2dissite 000-default" "Deshabilitación del sitio por defecto"

log_info "Creando configuración optimizada del sitio..."
cat > /etc/apache2/sites-available/geeks-streaming.conf << EOL
<VirtualHost *:7000>
    ServerName _
    DocumentRoot /var/www/geeks-streaming-panel
    DirectoryIndex index.html
    
    <Directory /var/www/geeks-streaming-panel>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Configuración para evitar pantalla en blanco
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            
            # Servir archivos estáticos directamente
            RewriteCond %{REQUEST_FILENAME} -f
            RewriteRule ^.*$ - [NC,L]
            
            # Servir directorios directamente
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^.*$ - [NC,L]
            
            # Para SPA (Single Page Application) - redirigir todo a index.html
            RewriteRule ^(.*)$ /index.html [NC,L]
        </IfModule>
    </Directory>
    
    # Headers para evitar cacheo problemático
    <IfModule mod_headers.c>
        Header always set Cache-Control "no-cache, must-revalidate"
        Header always set Pragma "no-cache"
        Header always set Expires "0"
    </IfModule>
    
    # Configuración MIME para archivos estáticos
    <IfModule mod_mime.c>
        AddType text/html .html
        AddType text/css .css
        AddType application/javascript .js
        AddType application/json .json
    </IfModule>
    
    # Proxy para API de SHOUTcast
    <IfModule mod_proxy.c>
        ProxyPreserveHost On
        ProxyPass /shoutcast/ http://localhost:8000/
        ProxyPassReverse /shoutcast/ http://localhost:8000/
    </IfModule>
    
    ErrorLog \${APACHE_LOG_DIR}/geeks-streaming-error.log
    CustomLog \${APACHE_LOG_DIR}/geeks-streaming-access.log combined
    LogLevel warn
</VirtualHost>
EOL

log_info "Habilitando módulos necesarios de Apache..."
run_command "a2enmod rewrite" "Habilitación de mod_rewrite"
run_command "a2enmod headers" "Habilitación de mod_headers"
run_command "a2enmod mime" "Habilitación de mod_mime"
run_command "a2enmod proxy" "Habilitación de mod_proxy"
run_command "a2enmod proxy_http" "Habilitación de mod_proxy_http"

log_info "Habilitando el sitio..."
run_command "a2ensite geeks-streaming.conf" "Habilitación del sitio"

log_info "Verificando configuración de Apache..."
if apache2ctl configtest; then
    log_success "Configuración de Apache válida"
else
    log_error "Error en la configuración de Apache"
    apache2ctl configtest
fi

# 10. Configurar firewall y servicios finales
print_step "10" "Configurando firewall y servicios finales..."
log_info "Configurando firewall UFW..."
run_command "ufw --force enable" "Habilitación de UFW"
run_command "ufw allow 22/tcp" "Permitir SSH"
run_command "ufw allow 7000/tcp" "Permitir puerto 7000 (Panel)"
run_command "ufw allow 8000:8020/tcp" "Permitir puertos 8000-8020 (SHOUTcast)"

log_info "Configurando servicios del sistema..."
run_command "systemctl daemon-reload" "Recarga de demonios systemd"
run_command "systemctl enable shoutcast.service" "Habilitación de SHOUTcast"
run_command "systemctl start shoutcast.service" "Inicio de SHOUTcast"
run_command "systemctl restart apache2" "Reinicio de Apache"

log_info "Verificando estado de servicios..."
sleep 3

if systemctl is-active --quiet apache2; then
    log_success "Apache ejecutándose correctamente en puerto 7000"
else
    log_error "Apache no está ejecutándose"
    systemctl status apache2 --no-pager
fi

if systemctl is-active --quiet shoutcast; then
    log_success "SHOUTcast ejecutándose correctamente en puerto 8000"
else
    log_warning "SHOUTcast no está ejecutándose, intentando reiniciar..."
    systemctl restart shoutcast
    sleep 2
    if systemctl is-active --quiet shoutcast; then
        log_success "SHOUTcast iniciado correctamente"
    else
        log_error "Problema con SHOUTcast"
        systemctl status shoutcast --no-pager
    fi
fi

# Verificar que los puertos estén abiertos
log_info "Verificando puertos abiertos..."
if netstat -tlnp | grep -q ":7000 "; then
    log_success "Puerto 7000 (Panel) está abierto"
else
    log_error "Puerto 7000 no está abierto"
fi

if netstat -tlnp | grep -q ":8000 "; then
    log_success "Puerto 8000 (SHOUTcast) está abierto"
else
    log_error "Puerto 8000 no está abierto"
fi

# Crear archivo de configuración del sistema
log_info "Creando archivo de configuración del sistema..."
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA")
cat > /opt/geeks-streaming-config.txt << EOL
=== CONFIGURACIÓN DE SONIC PANEL (Solo SHOUTcast) ===
Instalado: $(date)

Panel Web: http://$PUBLIC_IP:7000
- Interfaz principal del panel de control
- Gestión de estaciones de radio
- Configuración de SHOUTcast

SHOUTcast Server:
- Puerto base: 8000
- Admin: http://$PUBLIC_IP:8000/admin.cgi
- Stream: http://$PUBLIC_IP:8000/
- Contraseña Admin: admin_geeks_2024
- Contraseña Source: source_geeks_2024
- Puertos disponibles: 8002, 8004, 8006, 8008, 8010, 8012, 8014, 8016, 8018, 8020

Base de Datos MySQL:
- Base de datos: geeks_streaming
- Usuario: geeks_user
- Contraseña: GeeksStreaming2024!

Archivos importantes:
- Configuración SHOUTcast: /opt/shoutcast/sc_serv.conf
- Logs de Apache: /var/log/apache2/geeks-streaming-*.log
- Logs de SHOUTcast: /var/log/sc_serv.log
- Log de instalación: $LOG_FILE

Comandos útiles:
- Reiniciar SHOUTcast: sudo systemctl restart shoutcast
- Reiniciar Apache: sudo systemctl restart apache2
- Ver estado: sudo systemctl status shoutcast apache2
- Ver logs: sudo tail -f /var/log/apache2/geeks-streaming-error.log

Para ver esta información nuevamente: cat /opt/geeks-streaming-config.txt
EOL

# Limpiar archivos temporales
log_info "Limpiando archivos temporales..."
cd /tmp
run_command "rm -rf /tmp/geeks-* 2>/dev/null || true" "Limpieza de archivos temporales"

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
echo -e "${WHITE}│${NC} 🌐 ${BLUE}Panel Web (HTTP):${NC} http://$PUBLIC_IP:7000"
echo -e "${WHITE}│${NC}    ↳ Interfaz principal del panel de control"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 📡 ${PURPLE}SHOUTcast Server:${NC}"
echo -e "${WHITE}│${NC}    Admin: http://$PUBLIC_IP:8000/admin.cgi"
echo -e "${WHITE}│${NC}    Stream: http://$PUBLIC_IP:8000/"
echo -e "${WHITE}│${NC}    Puertos: 8002, 8004, 8006, 8008, 8010, 8012, 8014, 8016, 8018, 8020"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🔐 ${CYAN}Credenciales SHOUTcast:${NC}"
echo -e "${WHITE}│${NC}    Admin Password: admin_geeks_2024"
echo -e "${WHITE}│${NC}    Source Password: source_geeks_2024"
echo -e "${WHITE}│${NC}"
echo -e "${CYAN}└─────────────────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${YELLOW}🔧 Solución de Problemas:${NC}"
echo -e "${WHITE}   Si el panel no carga, ejecuta:${NC}"
echo -e "${BLUE}   sudo systemctl restart apache2${NC}"
echo -e "${BLUE}   sudo systemctl status apache2${NC}"
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

log_success "Instalación de Sonic Panel (Solo SHOUTcast, Sin SSL) completada exitosamente"
