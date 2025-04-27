
import React from 'react';

const InstallInstructions = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Pasos de Instalación para Geeks Streaming Panel</h3>
        <ol className="mt-2 space-y-2 pl-6 list-decimal">
          <li>Conéctate a tu servidor Ubuntu 22.04 mediante SSH</li>
          <li>Abre una terminal y actualiza el sistema:
            <code className="bg-muted px-1 py-0.5 rounded ml-2">sudo apt update && sudo apt upgrade -y</code>
          </li>
          <li>Crea un nuevo archivo llamado <code className="bg-muted px-1 py-0.5 rounded">install.sh</code></li>
          <li>Abre el archivo con un editor de texto:
            <code className="bg-muted px-1 py-0.5 rounded ml-2">nano install.sh</code>
          </li>
          <li>Copia y pega el script de instalación en este archivo</li>
          <li>Guarda el archivo y sal del editor (en nano: Ctrl+X, luego Y, luego Enter)</li>
          <li>Haz el script ejecutable:
            <code className="bg-muted px-1 py-0.5 rounded ml-2">chmod +x install.sh</code>
          </li>
          <li>Ejecuta el script con permisos de administrador:
            <code className="bg-muted px-1 py-0.5 rounded ml-2">sudo ./install.sh</code>
          </li>
          <li>Sigue las instrucciones en pantalla</li>
        </ol>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Requisitos del Sistema</h3>
        <ul className="mt-2 space-y-2 pl-6 list-disc">
          <li>Ubuntu 22.04 LTS (se recomienda una instalación limpia)</li>
          <li>Memoria RAM mínima: 2GB</li>
          <li>Espacio en disco: Al menos 20GB libres</li>
          <li>Acceso root o sudo</li>
          <li>Dirección IP pública (para instalaciones accesibles desde internet)</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Después de la Instalación</h3>
        <ul className="mt-2 space-y-2 pl-6 list-disc">
          <li>Cambia la contraseña de administrador predeterminada inmediatamente</li>
          <li>Configura el DNS de tu dominio si vas a usar un nombre de dominio</li>
          <li>Instala certificados SSL para conexiones seguras</li>
          <li>Revisa y actualiza la configuración del firewall según tus necesidades</li>
          <li>Configura copias de seguridad automáticas para tu base de datos</li>
        </ul>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
        <p className="text-yellow-700">
          <strong>Nota Importante:</strong> Este script está diseñado para Ubuntu 22.04 LTS. 
          Asegúrate de tener una instalación limpia y actualizada de Ubuntu antes de continuar.
        </p>
      </div>
    </div>
  );
};

export default InstallInstructions;
