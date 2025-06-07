
<div align="center">
  
# 🎧 Sonic Panel Open Source

### Panel de Control Profesional para Radio Streaming

*La solución completa y gratuita para administrar tus estaciones de radio online*

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04%20LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://ubuntu.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=for-the-badge)](https://github.com/kambire/sonicpanelopensource)

</div>

---

## ✨ Características Principales

🎵 **AutoDJ Inteligente** - Sistema automatizado de reproducción con listas personalizables  
📊 **Estadísticas en Tiempo Real** - Monitoreo de oyentes y rendimiento 24/7  
🌍 **Distribución Global** - Mapa mundial de oyentes en tiempo real  
🔧 **Configuración Simplificada** - Panel intuitivo para SHOUTcast e Icecast  
💾 **Gestión de Base de Datos** - Administración completa de MySQL  
👥 **Sistema Multiusuario** - Control de acceso y permisos granulares  
🛒 **Tienda Integrada** - Planes de hosting y servicios adicionales  
📧 **Gestión de Email** - Sistema de notificaciones automáticas  
🆓 **100% Open Source** - Código libre y modificable  

---

## 🚀 Instalación Rápida con Script Automático

### Requisitos del Sistema
- **OS**: Ubuntu 22.04 LTS (recomendado instalación limpia)
- **RAM**: Mínimo 2GB, recomendado 4GB
- **Disco**: Al menos 20GB libres
- **Acceso**: Usuario con permisos sudo
- **Red**: IP pública (para acceso externo)

### Instalación en Un Solo Comando

```bash
curl -sSL https://raw.githubusercontent.com/kambire/sonicpanelopensource/main/install.sh | sudo bash
```

O descarga y ejecuta manualmente:

```bash
# Descargar el script
wget https://raw.githubusercontent.com/kambire/sonicpanelopensource/main/install.sh

# Hacer ejecutable
chmod +x install.sh

# Ejecutar con permisos de administrador
sudo ./install.sh
```

### 📋 ¿Qué Incluye la Instalación Automática?

- ✅ **Servidor Web** (Apache + PHP 8.1)
- ✅ **Base de Datos** (MySQL 8.0 + configuración optimizada)
- ✅ **SHOUTcast Server** (Última versión + configuración automática)
- ✅ **Icecast Server** (Configuración lista para usar)
- ✅ **Panel Web** (Sonic Panel completo)
- ✅ **Node.js** (Para el frontend React)
- ✅ **Firewall** (Configuración de seguridad automática)
- ✅ **Servicios Systemd** (Inicio automático al reiniciar)

---

## 🔧 Instalación Manual

Si prefieres instalar paso a paso:

### 1. Preparar el Servidor
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl wget git unzip -y
```

### 2. Instalar Dependencias
```bash
sudo apt install apache2 mysql-server php php-cli php-fpm php-mysql php-mbstring php-xml php-curl -y
```

### 3. Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 4. Clonar el Repositorio
```bash
cd /var/www
sudo git clone https://github.com/kambire/sonicpanelopensource.git
cd sonicpanelopensource
```

### 5. Instalar y Construir
```bash
npm install
npm run build
sudo chown -R www-data:www-data /var/www/sonicpanelopensource
sudo chmod -R 755 /var/www/sonicpanelopensource
```

---

## 🌐 Acceso Post-Instalación

Después de la instalación exitosa:

**🔗 URL del Panel**: `http://tu-servidor-ip` o `http://tu-dominio.com`

**🔑 Credenciales por Defecto**:
- **Usuario**: `admin@geeksstreaming.com`
- **Contraseña**: `admin123`

**📡 Servidores de Streaming**:
- **SHOUTcast**: `http://tu-servidor-ip:8000/admin.cgi`
- **Icecast**: `http://tu-servidor-ip:8080/admin/`

> ⚠️ **IMPORTANTE**: Cambia las credenciales inmediatamente después del primer acceso

---

## 📊 Panel de Control

### Dashboard Principal
- 📈 Estadísticas en tiempo real
- 🗺️ Mapa mundial de oyentes
- 📻 Estado de servidores
- 🎵 Reproducción actual

### Gestión de Estaciones
- ➕ Crear múltiples estaciones
- ⚙️ Configuración individual
- 📡 Administración de streams
- 🔄 AutoDJ personalizable

### Monitoreo Avanzado
- 👥 Oyentes por país
- 📊 Gráficos de audiencia
- 📈 Estadísticas históricas
- 📱 Informes exportables

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3** con TypeScript
- **Tailwind CSS** para estilos
- **Shadcn/UI** componentes
- **Recharts** para gráficos
- **React Simple Maps** para mapas

### Backend & Servicios
- **SHOUTcast DNAS** servidor de streaming
- **Icecast** servidor alternativo
- **MySQL 8.0** base de datos
- **Apache** servidor web
- **Node.js** runtime del frontend

---

## 🔧 Configuración Avanzada

### Puertos Utilizados
- `80/443` - Panel web (HTTP/HTTPS)
- `8000` - SHOUTcast streams
- `8080` - Icecast streams
- `3306` - MySQL (solo local)

### Archivos de Configuración
```
/opt/shoutcast/sc_serv.conf           # SHOUTcast
/etc/icecast2/icecast.xml             # Icecast
/etc/apache2/sites-available/         # Apache
/var/www/sonicpanelopensource/        # Panel Web
/opt/geeks-streaming-config.txt       # Configuración del sistema
```

---

## 🚨 Solución de Problemas

### Problemas Comunes

**🔴 Error de conexión MySQL**
```bash
sudo systemctl restart mysql
sudo mysql_secure_installation
```

**🔴 SHOUTcast no inicia**
```bash
sudo systemctl status shoutcast
sudo journalctl -u shoutcast -f
```

**🔴 Permisos de archivos**
```bash
sudo chown -R www-data:www-data /var/www/sonicpanelopensource
sudo chmod -R 755 /var/www/sonicpanelopensource
```

**🔴 Ver configuración del sistema**
```bash
cat /opt/geeks-streaming-config.txt
```

---

## 🔒 Seguridad

### Credenciales por Defecto a Cambiar
- **Panel Admin**: `admin@geeksstreaming.com` / `admin123`
- **SHOUTcast Admin**: `admin_geeks_2024`
- **SHOUTcast Source**: `source_geeks_2024`
- **Icecast Admin**: `admin` / `geeks_admin_2024`
- **Icecast Source**: `geeks_source_2024`
- **MySQL**: `geeks_user` / `GeeksStreaming2024!`

### Comando de Seguridad Rápida
```bash
# Configuración de firewall (ya incluida en el script)
sudo ufw status
```

---

## 🚀 Desarrollo

### Ejecutar en Modo Desarrollo
```bash
git clone https://github.com/kambire/sonicpanelopensource.git
cd sonicpanelopensource
npm install
npm run dev
```

### Estructura del Proyecto
```
src/
├── components/          # Componentes React
├── pages/              # Páginas principales
├── lib/                # Utilidades y configuración
├── hooks/              # React hooks personalizados
└── types/              # Definiciones de TypeScript
```

---

## 📞 Soporte y Comunidad

### 🆘 Obtener Ayuda
- 📖 **Documentación**: [Wiki del Proyecto](https://github.com/kambire/sonicpanelopensource/wiki)
- 🐛 **Issues**: [Reportar Problemas](https://github.com/kambire/sonicpanelopensource/issues)
- 📧 **Email**: soporte@sonicpanel.com

### 🤝 Contribuir
¿Quieres contribuir? ¡Genial! 
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Créditos

Desarrollado con ❤️ por la comunidad **Open Source**

**Tecnologías Open Source utilizadas:**
- [SHOUTcast](https://www.shoutcast.com/) - Servidor de streaming
- [Icecast](https://icecast.org/) - Servidor de streaming alternativo
- [React](https://reactjs.org/) - Biblioteca de UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [MySQL](https://www.mysql.com/) - Base de datos

---

<div align="center">

### 🌟 ¡Dale una estrella si te gusta el proyecto! ⭐

[![GitHub stars](https://img.shields.io/github/stars/kambire/sonicpanelopensource?style=social)](https://github.com/kambire/sonicpanelopensource/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kambire/sonicpanelopensource?style=social)](https://github.com/kambire/sonicpanelopensource/network)

**© 2024 Sonic Panel Open Source. Código libre bajo licencia MIT.**

</div>
