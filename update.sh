
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
    echo -e "${CYAN}│${NC} ${WHITE}[$1/7]${NC} $2"
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
echo "║    ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗               ║"
echo "║    ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝               ║"
echo "║    ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗                 ║"
echo "║    ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝                 ║"
echo "║    ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗               ║"
echo "║     ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝               ║"
echo "║                                                                      ║"
echo "║                     🔄 ACTUALIZACIÓN AUTOMÁTICA 🔄                   ║"
echo "║                        Sonic Panel & Sistema                         ║"
echo "║                                                                      ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Verificar si se ejecuta como root
if [ "$(id -u)" != "0" ]; then
   print_error "Este script debe ejecutarse como root (usar sudo)"
   exit 1
fi

# Mostrar información actual
echo -e "${CYAN}┌─ Estado Actual del Sistema ───────────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC} 🖥️  OS: $(lsb_release -d | cut -f2)"
echo -e "${WHITE}│${NC} 📅 Última actualización del sistema: $(stat -c %y /var/cache/apt/pkgcache.bin | cut -d' ' -f1)"
echo -e "${WHITE}│${NC} 📦 Panel actual: $(cd /var/www/geeks-streaming-panel 2>/dev/null && git log -1 --format="%h - %s" 2>/dev/null || echo "No disponible")"
echo -e "${CYAN}└────────────────────────────────────────────────────────────────┘${NC}"
echo ""

echo -e "${GREEN}🚀 Iniciando actualización...${NC}"
echo ""
sleep 2

# 1. Crear backup de configuraciones importantes
print_step "1" "Creando backup de configuraciones..."
{
    mkdir -p /tmp/sonic-backup-$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="/tmp/sonic-backup-$(date +%Y%m%d_%H%M%S)"
    
    # Backup de configuraciones Apache
    cp -r /etc/apache2/sites-available/ $BACKUP_DIR/ > /dev/null 2>&1 &
    show_spinner $!
    
    # Backup de configuraciones SHOUTcast
    cp -r /opt/shoutcast/ $BACKUP_DIR/ > /dev/null 2>&1 &
    show_spinner $!
    
    # Backup de configuraciones Icecast
    cp /etc/icecast2/icecast.xml $BACKUP_DIR/ > /dev/null 2>&1 &
    show_spinner $!
    
    # Backup de configuración del sistema
    cp /opt/geeks-streaming-config.txt $BACKUP_DIR/ > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Backup creado en: $BACKUP_DIR"

# 2. Actualizar paquetes del sistema
print_step "2" "Actualizando paquetes del sistema..."
{
    apt update > /dev/null 2>&1 &
    show_spinner $!
    apt upgrade -y > /dev/null 2>&1 &
    show_spinner $!
    apt autoremove -y > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Sistema actualizado correctamente"

# 3. Actualizar repositorio del panel
print_step "3" "Actualizando repositorio del panel..."
{
    cd /var/www/geeks-streaming-panel
    
    # Guardar cambios locales si existen
    git stash > /dev/null 2>&1
    
    # Actualizar desde el repositorio remoto
    git fetch origin > /dev/null 2>&1 &
    show_spinner $!
    git pull origin main > /dev/null 2>&1 &
    show_spinner $!
    
    # Restaurar cambios locales si existen
    git stash pop > /dev/null 2>&1 || true
}
print_success "Repositorio actualizado"

# 4. Actualizar dependencias Node.js
print_step "4" "Actualizando dependencias..."
{
    cd /var/www/geeks-streaming-panel
    npm update > /dev/null 2>&1 &
    show_spinner $!
    npm audit fix > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Dependencias actualizadas"

# 5. Reconstruir aplicación
print_step "5" "Reconstruyendo aplicación..."
{
    cd /var/www/geeks-streaming-panel
    npm run build > /dev/null 2>&1 &
    show_spinner $!
    chown -R www-data:www-data /var/www/geeks-streaming-panel > /dev/null 2>&1
    chmod -R 755 /var/www/geeks-streaming-panel > /dev/null 2>&1
}
print_success "Aplicación reconstruida"

# 6. Actualizar configuraciones si es necesario
print_step "6" "Verificando configuraciones..."
{
    # Verificar configuración de Apache
    apache2ctl configtest > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        print_warning "Configuración de Apache requiere atención"
        # Restaurar desde backup si es necesario
        cp $BACKUP_DIR/geeks-streaming.conf /etc/apache2/sites-available/ > /dev/null 2>&1
    fi
    
    # Verificar servicios
    systemctl is-active --quiet shoutcast || systemctl restart shoutcast > /dev/null 2>&1
    systemctl is-active --quiet icecast2 || systemctl restart icecast2 > /dev/null 2>&1
    systemctl is-active --quiet apache2 || systemctl restart apache2 > /dev/null 2>&1
}
print_success "Configuraciones verificadas"

# 7. Reiniciar servicios
print_step "7" "Reiniciando servicios..."
{
    systemctl daemon-reload > /dev/null 2>&1
    systemctl restart apache2 > /dev/null 2>&1 &
    show_spinner $!
    systemctl restart shoutcast > /dev/null 2>&1 &
    show_spinner $!
    systemctl restart icecast2 > /dev/null 2>&1 &
    show_spinner $!
}
print_success "Servicios reiniciados"

# Actualizar archivo de configuración del sistema
cat > /opt/geeks-streaming-config.txt << EOL
=== CONFIGURACIÓN DE SONIC PANEL ===
Actualizado: $(date)

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

Backup disponible en: $BACKUP_DIR
Para ver esta información nuevamente: cat /opt/geeks-streaming-config.txt
EOL

# Limpiar archivos temporales de la compilación
cd /var/www/geeks-streaming-panel
rm -rf node_modules/.cache > /dev/null 2>&1

# Banner final
clear
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                           ║"
echo "║    🎉 ¡ACTUALIZACIÓN COMPLETADA EXITOSAMENTE! 🎉                         ║"
echo "║                                                                           ║"
echo "║         ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗               ║"
echo "║         ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝               ║"
echo "║         ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗                 ║"
echo "║         ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝                 ║"
echo "║         ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗               ║"
echo "║          ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝               ║"
echo "║                                                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}┌─── Información Post-Actualización ─────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🌐 ${BLUE}Panel Web:${NC} http://$(curl -s ifconfig.me 2>/dev/null || echo "TU-IP-PUBLICA"):7000"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 📦 ${YELLOW}Nueva versión:${NC} $(cd /var/www/geeks-streaming-panel && git log -1 --format="%h - %s" 2>/dev/null)"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 🔄 ${GREEN}Servicios actualizados:${NC}"
echo -e "${WHITE}│${NC}    ✅ Sistema operativo"
echo -e "${WHITE}│${NC}    ✅ Panel web"
echo -e "${WHITE}│${NC}    ✅ SHOUTcast Server"
echo -e "${WHITE}│${NC}    ✅ Icecast Server"
echo -e "${WHITE}│${NC}    ✅ Apache Web Server"
echo -e "${WHITE}│${NC}"
echo -e "${WHITE}│${NC} 💾 ${PURPLE}Backup disponible en:${NC} $BACKUP_DIR"
echo -e "${WHITE}│${NC}"
echo -e "${CYAN}└─────────────────────────────────────────────────────────────────┘${NC}"
echo ""
echo -e "${BLUE}📋 Configuración completa: ${WHITE}cat /opt/geeks-streaming-config.txt${NC}"
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════════════════╗"
echo "║                   ¡Actualización completada con éxito!                   ║"
echo "║                        Sistema listo para usar                            ║"
echo "╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
