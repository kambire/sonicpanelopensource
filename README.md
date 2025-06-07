
<div align="center">
  
# 🎧 Geeks Streaming Panel

### Panel de Control Profesional para Radio Streaming

*La solución completa para administrar tus estaciones de radio online*

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04%20LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://ubuntu.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

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
curl -sSL https://raw.githubusercontent.com/tu-usuario/geeks-streaming-panel/main/install.sh | sudo bash
```

O descarga y ejecuta manualmente:

```bash
# Descargar el script
wget https://raw.githubusercontent.com/tu-usuario/geeks-streaming-panel/main/install.sh

# Hacer ejecutable
chmod +x install.sh

# Ejecutar con permisos de administrador
sudo ./install.sh
```

### 📋 ¿Qué Incluye la Instalación Automática?

- ✅ **Servidor Web** (Apache/Nginx + PHP 8.1)
- ✅ **Base de Datos** (MySQL 8.0 + configuración optimizada)
- ✅ **SHOUTcast Server** (Última versión + configuración automática)
- ✅ **Icecast Server** (Configuración lista para usar)
- ✅ **Panel Web** (Geeks Streaming Panel completo)
- ✅ **SSL/TLS** (Certificados Let's Encrypt opcionales)
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

### 3. Clonar el Repositorio
```bash
cd /var/www
sudo git clone https://github.com/tu-usuario/geeks-streaming-panel.git
cd geeks-streaming-panel
```

### 4. Configurar Permisos
```bash
sudo chown -R www-data:www-data /var/www/geeks-streaming-panel
sudo chmod -R 755 /var/www/geeks-streaming-panel
```

---

## 🌐 Acceso Post-Instalación

Después de la instalación exitosa:

**🔗 URL del Panel**: `http://tu-servidor-ip` o `http://tu-dominio.com`

**🔑 Credenciales por Defecto**:
- **Usuario**: `admin@geeksstreaming.com`
- **Contraseña**: `admin123`

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
- **Apache/Nginx** servidor web
- **PHP 8.1** backend logic

---

## 🔧 Configuración Avanzada

### Puertos Utilizados
- `80/443` - Panel web (HTTP/HTTPS)
- `8000/8001` - SHOUTcast streams
- `8080/8081` - Icecast streams
- `3306` - MySQL (solo local)

### Archivos de Configuración
```
/opt/shoutcast/sc_serv.conf         # SHOUTcast
/etc/icecast2/icecast.xml           # Icecast
/etc/apache2/sites-available/       # Apache
/var/www/geeks-streaming-panel/     # Panel Web
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
sudo chown -R www-data:www-data /var/www/geeks-streaming-panel
sudo chmod -R 755 /var/www/geeks-streaming-panel
```

---

## 🔒 Seguridad

### Recomendaciones de Seguridad
- 🔐 Cambiar credenciales por defecto
- 🛡️ Configurar firewall UFW
- 🔒 Instalar certificados SSL
- 🔄 Actualizaciones regulares del sistema
- 📝 Logs de auditoría habilitados

### Comando de Seguridad Rápida
```bash
# Aplicar configuración de seguridad básica
sudo ufw enable
sudo ufw allow 80,443,8000,8001/tcp
sudo fail2ban-client start
```

---

## 📞 Soporte y Comunidad

### 🆘 Obtener Ayuda
- 📖 **Documentación**: [Wiki del Proyecto](https://github.com/tu-usuario/geeks-streaming-panel/wiki)
- 💬 **Discord**: [Comunidad Geeks Streaming](https://discord.gg/tu-servidor)
- 🐛 **Issues**: [Reportar Problemas](https://github.com/tu-usuario/geeks-streaming-panel/issues)
- 📧 **Email**: soporte@geeksstreaming.com

### 🤝 Contribuir
¿Quieres contribuir? ¡Genial! 
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Créditos

Desarrollado con ❤️ por el equipo de **Geeks Streaming**

**Tecnologías Open Source utilizadas:**
- [SHOUTcast](https://www.shoutcast.com/) - Servidor de streaming
- [Icecast](https://icecast.org/) - Servidor de streaming alternativo
- [React](https://reactjs.org/) - Biblioteca de UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [MySQL](https://www.mysql.com/) - Base de datos

---

<div align="center">

### 🌟 ¡Dale una estrella si te gusta el proyecto! ⭐

[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/geeks-streaming-panel?style=social)](https://github.com/tu-usuario/geeks-streaming-panel/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tu-usuario/geeks-streaming-panel?style=social)](https://github.com/tu-usuario/geeks-streaming-panel/network)

**© 2024 Geeks Streaming Panel. Todos los derechos reservados.**

</div>
