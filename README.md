
# Sistema de Gestión de Animales en Corrales

Este es un aplicativo web desarrollado con arquitectura orientada a servicios y/o microservicios, diseñado para gestionar la asociación de animales en corrales en una granja.

## Funcionalidades

1. **Crear Corrales**  
   Permite crear corrales con una capacidad límite definida.

2. **Crear Animales**  
   Permite registrar animales en el sistema.

3. **Crear Restricciones de Asociación**  
   Define restricciones sobre los animales por corral

4. **Visualización de Animales en Corrales**  
   Ofrece una interfaz para visualizar los animales que se encuentran en un corral. 

. **Promedio de Edad de Animales**  
   Calcula el promedio de edad de los animales en un corral dado a través de un endpoint en la API.

## Instalación y Ejecución

### Requisitos Previos

- Node.js y npm instalados en tu máquina.
- Git para clonar el repositorio.

### Clonar el Repositorio

```bash
git clone https://github.com/FelipeForero21/Junior_developer_technical_test_2024
cd Junior_developer_technical_test_2024
>

Configuración del Backend
1.	Navega a la carpeta del backend:

cd backend
2.	Instala las dependencias:

npm install

3.	Configura las variables de entorno necesarias 

        POSTGRES_USER=default
        POSTGRES_PASSWORD=zrYiPas5nA8l
        POSTGRES_HOST=ep-little-violet-a493mf4j-pooler.us-east-1.aws.neon.tech
        POSTGRES_DATABASE=verceldb
        POSTGRES_PORT=5432


4.	Inicia el servidor del backend:

npm start

Configuración del Frontend

1.	Navega a la carpeta del frontend:

cd frontend

2.	Instala las dependencias:

npm install

3.	Inicia el servidor del frontend:

npm start

o en el directorio principal ejecutar:

npm install
npm run start

4.	Abre tu navegador y accede a http://localhost:4072 para ver la aplicación en funcionamiento.

1.	Crear Corrales y Animales: Utiliza las interfaces proporcionadas para agregar nuevos corrales y animales.
2.	Definir Restricciones: Configura las restricciones de asociación para los animales.
3.	Visualizar Animales: Selecciona un corral desde el combo para ver los animales asociados en la tabla.
4.	Generar Resumen: Accede al endpoint correspondiente para obtener el resumen de animales y verificar aquellos de alta peligrosidad.
5.	Calcular Promedio de Edad: Utiliza el endpoint adecuado para obtener el promedio de edad de los animales en un corral.

![Tablero de jira](https://drive.google.com/file/d/16tIpFd68E0VkBEmI0yFibjlHKrHiTxOY/view?usp=sharing)