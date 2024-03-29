# isw-711 Desarrollando API REST

Aplicación que permite a los usuarios registrados agregar, editar, eliminar y ver videos de YouTube. También incluye funcionalidades para gestionar usuarios restringidos y autenticación de usuarios.

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Uso](#uso)
6. [Estructura de Archivos](#estructura-de-archivos)
7. [Contribución](#contribución)
8. [Créditos](#créditos)
9. [Licencia](#licencia)

## Introducción

Esta aplicación diseñada para permitir a los usuarios gestionar su biblioteca personal de videos de YouTube de manera sencilla y eficiente. Permite el registro de usuarios, la autenticación mediante tokens JWT y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en videos y usuarios restringidos.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- JWT para autenticación
- Express-validator para validación de datos
- youtube-api-v3-search para búsqueda de videos en YouTube

## Instalación

1. Clona este repositorio en tu máquina local.
   git clone https://github.com/YeustinLR/servidor.git
2. Accede al directorio del proyecto e instala las dependencias utilizando npm:
  cd videomanager
  npm install

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno necesarias en un archivo `.env`. Las variables que debes incluir son:

- `PORT`: Puerto en el que se ejecutará el servidor.
- `URI_MONGO`: URL de conexión a la base de datos MongoDB.
- `JWT_SECRET`: Clave secreta para generar tokens JWT.
- `YOUTUBE_API_KEY`: Clave de API de YouTube para realizar búsquedas.

Crea un archivo `.env` en la raíz del proyecto y define estas variables.

## Uso

Una vez que la aplicación esté instalada y configurada correctamente, puedes ejecutarla utilizando el siguiente comando:
  npm start

Luego, puedes acceder a la API a través de las rutas definidas en la documentación de la API para registrar usuarios, iniciar sesión, agregar/editar/eliminar videos, etc.

## Estructura de Archivos
.
├── controllers/ # Controladores de la aplicación
├── database/ # Configuración de conexión a la base de datos
├── middlewares/ # Middlewares utilizados en la aplicación
├── models/ # Modelos de datos (esquemas)
├── routes/ # Rutas de la API
├── .env # Archivo de variables de entorno
├── server.js # Archivo principal de la aplicación
└── README.md # Documentación del proyecto


## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza commits (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push de tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea una nueva Pull Request desde tu rama a la rama principal del repositorio original.

## Créditos

- Desarrollador: DesingLR
- Email: #################

## Licencia

Este proyecto está bajo la Licencia MIT. 

