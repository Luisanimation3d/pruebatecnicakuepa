# Prueba Desarrollador Fullstack JS Kuepa (Backend)

## Descripción

Este es el backend para la prueba de desarrollador Fullstack JS de Kuepa. Esta aplicación incluye la configuración de un servidor Express con soporte para WebSockets (Socket.IO), autenticación JWT, conexión a una base de datos MongoDB y más.

## Requisitos

- Node.js v14 o superior
- MongoDB

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Luisanimation3d/pruebatecnicakuepa
    
    cd pruebatecnicakuepa/back
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración (puedes basarte en el archivo `.env.example`):

    ```plaintext
    PORT=3000
    DB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1d
    ```

## Uso

### Desarrollo

Para iniciar el servidor en modo desarrollo con soporte para recarga automática:

```bash
npm run dev
```

# Prueba Desarrollador Fullstack JS Kuepa (Frontend)

## Descripción

Este es el frontend para la prueba de desarrollador Fullstack JS de Kuepa. Esta aplicación utiliza React para la interfaz de usuario y se conecta a un backend Express mediante WebSockets (Socket.IO) y HTTP para la comunicación en tiempo real y la gestión de datos.

## Requisitos

- Node.js v14 o superior

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Luisanimation3d/pruebatecnicakuepa

    cd pruebatecnicakuepa/front
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```



## Uso

### Desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm start
