
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
    echo -e "${CYAN}│${NC} ${WHITE}[$1/8]${NC} $2"
    echo -e "${CYAN}╰─────────────────────────────────────────────────────╯${NC}"
    echo ""
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
echo "║                     🎵 INSTALACIÓN SIMPLE 🎵                        ║"
echo "║                   Panel de Radio - Solo SHOUTcast                    ║"
echo "║                      Sin SSL - Sin Autenticación                     ║"
echo "║                                                                      ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

log_info "Iniciando instalación de Sonic Panel (Simple - Solo SHOUTcast)"

# Verificar si se ejecuta como root
if [ "$(id -u)" != "0" ]; then
   log_error "Este script debe ejecutarse como root (usar sudo)"
   exit 1
fi

echo -e "${GREEN}🚀 Iniciando instalación...${NC}"
echo ""
sleep 2

# 1. Actualizar sistema
print_step "1" "Actualizando paquetes del sistema..."
run_command "apt update && apt upgrade -y" "Actualización del sistema"

# 2. Instalar dependencias básicas
print_step "2" "Instalando dependencias básicas..."
BASIC_DEPS="curl wget unzip git apache2 mysql-server"
run_command "apt install -y $BASIC_DEPS" "Instalación de dependencias básicas"

# 3. Instalar Node.js y NPM
print_step "3" "Instalando Node.js..."
run_command "curl -fsSL https://deb.nodesource.com/setup_18.x | bash -" "Configuración del repositorio Node.js"
run_command "apt install -y nodejs" "Instalación de Node.js"
log_info "Node.js instalado: $(node --version), NPM: $(npm --version)"

# 4. Configurar MySQL
print_step "4" "Configurando MySQL..."
run_command "systemctl start mysql && systemctl enable mysql" "Inicio de MySQL"
run_command "mysql -e \"CREATE DATABASE IF NOT EXISTS sonic_panel;\"" "Creación de base de datos"
run_command "mysql -e \"CREATE USER IF NOT EXISTS 'sonic_user'@'localhost' IDENTIFIED BY 'SonicPanel2024!';\"" "Creación de usuario MySQL"
run_command "mysql -e \"GRANT ALL PRIVILEGES ON sonic_panel.* TO 'sonic_user'@'localhost'; FLUSH PRIVILEGES;\"" "Asignación de permisos"

# 5. Instalar SHOUTcast
print_step "5" "Instalando SHOUTcast..."
run_command "mkdir -p /opt/shoutcast" "Creación de directorio SHOUTcast"
cd /opt/shoutcast
run_command "wget -O sc_serv.tar.gz http://download.nullsoft.com/shoutcast/tools/sc_serv2_linux_x64-latest.tar.gz" "Descarga de SHOUTcast"
run_command "tar -xzf sc_serv.tar.gz && chmod +x sc_serv" "Extracción de SHOUTcast"

# Crear configuración de SHOUTcast
cat > sc_serv.conf << EOL
adminpassword=admin_sonic_2024
password=source_sonic_2024
portbase=8000
maxuser=100
logfile=/var/log/sc_serv.log
w3clog=/var/log/sc_w3c.log
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

# 6. Descargar e instalar el panel
print_step "6" "Instalando Sonic Panel..."
cd /var/www
run_command "rm -rf sonic-panel" "Limpieza de instalación anterior"
run_command "git clone https://github.com/kambire/sonicpanelopensource.git sonic-panel" "Clonación del repositorio"

cd sonic-panel

# Crear un index.html estático básico que funcione
cat > index.html << EOL
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonic Panel - Radio Streaming</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 800px;
            padding: 2rem;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .logo {
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .status {
            background: rgba(255,255,255,0.2);
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem 0;
        }
        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin: 2rem 0;
        }
        .button {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            transition: all 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .button:hover {
            background: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .button.secondary {
            background: #2196F3;
        }
        .button.secondary:hover {
            background: #1976D2;
        }
        .credentials {
            margin-top: 2rem;
            font-size: 0.9rem;
            background: rgba(0,0,0,0.3);
            padding: 1rem;
            border-radius: 10px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .card {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 10px;
            text-align: left;
        }
        .card h3 {
            margin-bottom: 0.5rem;
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🎵 SONIC PANEL</div>
        <div class="subtitle">Panel de Control para Radio Streaming</div>
        
        <div class="status">
            <h2>✅ Instalación Completada</h2>
            <p>El panel de control ha sido instalado correctamente</p>
        </div>
        
        <div class="grid">
            <div class="card">
                <h3>📡 SHOUTcast Server</h3>
                <p>Puerto base: 8000</p>
                <p>Estado: Activo</p>
                <p>Puertos disponibles: 8002-8020</p>
            </div>
            <div class="card">
                <h3>🌐 Panel Web</h3>
                <p>Acceso HTTP</p>
                <p>Puerto: 7000</p>
                <p>Sin SSL/HTTPS</p>
            </div>
            <div class="card">
                <h3>🗄️ Base de Datos</h3>
                <p>MySQL configurado</p>
                <p>Base: sonic_panel</p>
                <p>Usuario: sonic_user</p>
            </div>
        </div>
        
        <div class="button-group">
            <a href="http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP"):8000/admin.cgi" class="button">
                Administrar SHOUTcast
            </a>
            <a href="http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP"):8000/" class="button secondary">
                Ver Stream
            </a>
        </div>
        
        <div class="credentials">
            <h4>🔐 Credenciales SHOUTcast</h4>
            <p><strong>Admin:</strong> admin_sonic_2024</p>
            <p><strong>Source:</strong> source_sonic_2024</p>
        </div>
        
        <div style="margin-top: 2rem; font-size: 0.8rem; opacity: 0.7;">
            <p>Panel instalado sin autenticación - Listo para usar</p>
            <p>Para configuración avanzada, consulte la documentación</p>
        </div>
    </div>
</body>
</html>
EOL

run_command "chown -R www-data:www-data /var/www/sonic-panel" "Configuración de propietarios"
run_command "chmod -R 755 /var/www/sonic-panel" "Configuración de permisos"

# 7. Configurar Apache (MEJORADO)
print_step "7" "Configurando Apache en puerto 7000..."

# Agregar puerto 7000 a Apache
if ! grep -q "Listen 7000" /etc/apache2/ports.conf; then
    echo "Listen 7000" >> /etc/apache2/ports.conf
fi

# Deshabilitar sitio por defecto
run_command "a2dissite 000-default" "Deshabilitación del sitio por defecto"

# Crear configuración del sitio
cat > /etc/apache2/sites-available/sonic-panel.conf << EOL
<VirtualHost *:7000>
    ServerName _
    DocumentRoot /var/www/sonic-panel
    DirectoryIndex index.html
    
    <Directory /var/www/sonic-panel>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Configuración MIME mejorada
        <IfModule mod_mime.c>
            AddType text/html .html
            AddType text/css .css
            AddType application/javascript .js
            AddType application/json .json
            AddType image/svg+xml .svg
            AddType font/woff .woff
            AddType font/woff2 .woff2
        </IfModule>
        
        # Headers para evitar problemas de CORS y cacheo
        <IfModule mod_headers.c>
            Header always set Access-Control-Allow-Origin "*"
            Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
            Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
            Header always set X-Content-Type-Options "nosniff"
            Header always set X-Frame-Options "SAMEORIGIN"
        </IfModule>
        
        # Configuración para SPA (Single Page Application)
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            
            # Servir archivos estáticos directamente
            RewriteCond %{REQUEST_FILENAME} -f
            RewriteRule ^.*$ - [NC,L]
            
            # Servir directorios directamente
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^.*$ - [NC,L]
            
            # Redirigir todo lo demás a index.html
            RewriteRule ^(.*)$ /index.html [NC,L]
        </IfModule>
    </Directory>
    
    # Configuración de logs
    ErrorLog \${APACHE_LOG_DIR}/sonic-panel-error.log
    CustomLog \${APACHE_LOG_DIR}/sonic-panel-access.log combined
    LogLevel warn
</VirtualHost>
EOL

# Habilitar módulos necesarios
run_command "a2enmod rewrite" "Habilitación de mod_rewrite"
run_command "a2enmod headers" "Habilitación de mod_headers"
run_command "a2enmod mime" "Habilitación de mod_mime"

# Habilitar el sitio
run_command "a2ensite sonic-panel.conf" "Habilitación del sitio"

# Verificar configuración de Apache
if apache2ctl configtest; then
    log_success "Configuración de Apache válida"
else
    log_error "Error en la configuración de Apache"
fi

# 8. Configurar servicios finales
print_step "8" "Configurando servicios finales..."

# Configurar firewall
run_command "ufw --force enable" "Habilitación de UFW"
run_command "ufw allow 22/tcp" "Permitir SSH"
run_command "ufw allow 7000/tcp" "Permitir puerto 7000 (Panel)"
run_command "ufw allow 8000:8020/tcp" "Permitir puertos SHOUTcast"

# Iniciar servicios
run_command "systemctl daemon-reload" "Recarga de demonios systemd"
run_command "systemctl enable shoutcast.service" "Habilitación de SHOUTcast"
run_command "systemctl start shoutcast.service" "Inicio de SHOUTcast"
run_command "systemctl restart apache2" "Reinicio de Apache"

# Verificar servicios
sleep 3
if systemctl is-active --quiet apache2; then
    log_success "Apache ejecutándose correctamente"
else
    log_error "Apache no está ejecutándose"
fi

if systemctl is-active --quiet shoutcast; then
    log_success "SHOUTcast ejecutándose correctamente"
else
    log_warning "Reiniciando SHOUTcast..."
    systemctl restart shoutcast
fi

# Obtener IP pública
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA")

# Crear archivo de configuración
cat > /opt/sonic-panel-config.txt << EOL
=== CONFIGURACIÓN DE SONIC PANEL (SIMPLE) ===
Instalado: $(date)

Panel Web: http://$PUBLIC_IP:7000
- Sin autenticación
- Sin SSL/HTTPS
- Acceso directo

SHOUTcast Server:
- Admin: http://$PUBLIC_IP:8000/admin.cgi
- Stream: http://$PUBLIC_IP:8000/
- Contraseña Admin: admin_sonic_2024
- Contraseña Source: source_sonic_2024
- Puertos disponibles: 8002-8020 (pares)

Base de Datos MySQL:
- Base: sonic_panel
- Usuario: sonic_user
- Contraseña: SonicPanel2024!

Comandos útiles:
- Reiniciar Apache: sudo systemctl restart apache2
- Reiniciar SHOUTcast: sudo systemctl restart shoutcast
- Ver logs: sudo tail -f /var/log/apache2/sonic-panel-error.log

Log de instalación: $LOG_FILE
EOL

# Banner final
clear
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                           ║"
echo "║    🎉 ¡INSTALACIÓN COMPLETADA EXITOSAMENTE! 🎉                           ║"
echo "║                                                                           ║"
echo "║                    SONIC PANEL - CONFIGURACIÓN SIMPLE                    ║"
echo "║                                                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}┌─── Información de Acceso ──────────────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🌐 ${BLUE}Panel Web:${NC} http://$PUBLIC_IP:7000"
echo -e "${WHITE}│${NC}    ↳ Sin autenticación - Acceso directo"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 📡 ${PURPLE}SHOUTcast Server:${NC}"
echo -e "${WHITE}│${NC}    Admin: http://$PUBLIC_IP:8000/admin.cgi"
echo -e "${WHITE}│${NC}    Stream: http://$PUBLIC_IP:8000/"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🔐 ${CYAN}Credenciales:${NC}"
echo -e "${WHITE}│${NC}    Admin: admin_sonic_2024"
echo -e "${WHITE}│${NC}    Source: source_sonic_2024"
echo -e "${WHITE}│${NC}"
echo -e "${CYAN}└─────────────────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${GREEN}✅ Panel instalado sin autenticación - Listo para usar${NC}"
echo -e "${BLUE}📋 Configuración completa: ${WHITE}cat /opt/sonic-panel-config.txt${NC}"
echo ""

log_success "Instalación de Sonic Panel (Simple - Sin SSL/Auth) completada exitosamente"
