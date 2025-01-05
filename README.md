# Gestión de Tareas

Este es un proyecto de gestión de tareas creado con React. Permite agregar, eliminar y visualizar tareas en una lista dinámica. Además, incluye un formulario para agregar nuevas tareas y una interfaz interactiva con notificaciones de error.

## Características

- Agregar tareas con un título y descripción.
- Eliminar tareas.
- Notificaciones de error al intentar agregar o eliminar tareas.

## Instalación

### 1. Clonar el repositorio

Clona el repositorio y entra a la carpeta `task-manager`:

```bash
git clone <url-del-repositorio>
cd task-manager

### 1. Instalar las dependencias
yarn install

### 1. Iniciar el proyecto
yarn dev

Testing
A continuación, se describen los pasos para ejecutar las pruebas de este proyecto.

1. Instalación de dependencias para el testing
Asegúrate de tener Node.js y Yarn (o npm) instalados. Luego, ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias:

Con Yarn:
bash
Copiar código
yarn install
Con npm:
bash
Copiar código
npm install
2. Configuración de Jest
Este proyecto utiliza Jest para las pruebas unitarias. Asegúrate de que la configuración de Jest esté correctamente configurada para manejar archivos CSS, imágenes y otros recursos estáticos.

En el archivo jest.config.js, agrega lo siguiente para mapear archivos CSS:

js
Copiar código
moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
}
Si usas otros recursos, asegúrate de configurarlos en jest.config.js o en package.json según corresponda.

3. Ejecutar pruebas
Para ejecutar las pruebas de un paquete específico o del proyecto en general, puedes usar los siguientes comandos:

Con Yarn:
bash
Copiar código
yarn test
Con npm:
bash
Copiar código
npm test
Este comando ejecutará todas las pruebas unitarias definidas en el proyecto. Si deseas ejecutar las pruebas de un paquete específico dentro del monorepositorio, asegúrate de estar en el directorio correspondiente y luego ejecuta el mismo comando.

4. Ejecutar todas las pruebas en el monorepositorio
Si estás trabajando en un monorepositorio y deseas ejecutar todas las pruebas de todos los paquetes, usa el siguiente comando:

Con Yarn:
bash
Copiar código
yarn workspaces run test
Este comando ejecutará las pruebas de todos los paquetes dentro del monorepositorio.

Errores comunes
Si encuentras algún error durante la ejecución de las pruebas, revisa lo siguiente:

Error con archivos CSS: Si ves el siguiente error al ejecutar las pruebas:

sql
Copiar código
Could not locate module ./styles.css mapped as:
identity-obj-proxy
Asegúrate de haber instalado identity-obj-proxy correctamente:

bash
Copiar código
yarn add --dev identity-obj-proxy
O si usas npm:

bash
Copiar código
npm install --save-dev identity-obj-proxy
Problemas con Jest: Si las pruebas no se ejecutan correctamente, asegúrate de que Jest esté configurado correctamente en el archivo jest.config.js.

Contribuir
Si deseas contribuir o mejorar el proyecto, puedes abrir un Issue o enviar un Pull Request. Asegúrate de seguir las convenciones de estilo y agregar pruebas si es necesario.


### Cambios realizados:

1. **Estructuración y formato**: Mejoré la estructura para que sea más clara y profesional.
2. **Corrección de instrucciones**: Mejoré los pasos de instalación, ejecución de la aplicación y pruebas.
3. **Corrección en la instalación de dependencias**: Aclaré que se debe instalar primero las dependencias con Yarn o npm.
4. **Mejoras en las instrucciones de testing**: Agregué más claridad sobre cómo ejecutar pruebas y configurarlas correctamente.





