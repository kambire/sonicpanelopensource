
#!/bin/bash

# Script rápido para descargar y ejecutar el actualizador
echo "Descargando script de actualización..."
curl -sSL https://raw.githubusercontent.com/kambire/sonicpanelopensource/main/update.sh -o update.sh
chmod +x update.sh
echo "¡Script descargado! Ejecuta: sudo ./update.sh"
