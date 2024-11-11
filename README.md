# Bloomme

Este proyecto es un backend construido con Node.js, Express, TypeScript, y Sequelize.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Ejecución](#ejecución)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Endpoints](#endpoints)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Clona el repositorio y ejecuta los siguientes comandos:

```bash
git clone <URL-del-repositorio>
cd <nombre-del-proyecto>
npm install
```

Si usas yarn:

```bash
yarn install
```

## Configuración

Crea un archivo .env en la raíz del proyecto.

Agrega las variables de entorno necesarias, como la configuración de la base de datos. Ejemplo:

```plaintext
DB_HOST=            # Dirección del servidor de la base de datos (ej. localhost)
DB_PORT=            # Puerto de la base de datos (ej. 5432 para PostgreSQL)
DB_NAME=            # Nombre de la base de datos
DB_USER=            # Usuario de la base de datos
DB_PASSWORD=        # Contraseña de la base de datos
GEMINI_API_KEY=     # Clave API de Gemini para integración externa
JWT_SECRET=         # Clave secreta para firmar tokens JWT
PORT_INDEX=         # Puerto en el que se ejecutará el servidor (ej. 3000)
```

## Ejecución

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

En caso de usar yarn:

```bash
yarn dev
```

Para construir y ejecutar en producción:

```bash
npm run build
npm start
```

## Estructura del Proyecto


```plaintext
├── src
│   ├── config        # Configuración (Base de datos, etc.)
│   ├── controllers   # Controladores de las rutas
│   ├── models        # Modelos de Sequelize
│   ├── routes        # Rutas de Express
│   ├── services      # Lógica de negocio
│   └── index.ts      # Archivo principal
├── .env.example      # Ejemplo de archivo .env
└── README.md         # Documentación del proyecto
```

## Endpoints

    - GET /api/users - Obtener todos los usuarios.
    - POST /api/users - Crear un usuario.
    - GET /api/users/:id - Obtener un usuario por ID.

## Tecnologías Utilizadas

    Node.js - Entorno de ejecución para JavaScript
    Express - Framework web para Node.js
    TypeScript - Superset de JavaScript con tipado estático
    Sequelize - ORM para trabajar con bases de datos SQL
