# RESTAPI Salón San Marcos de Tarrazú

## Tabla de contenidos

- [Introducción](#introducción)
- [Tecnología y Prerrequisitos](#tecnología-y-prerrequisitos)
- [Instalación y Configuración global](#instalación-y-configuración-local)
  - [Clonar el Repositorio](#clonar-el-repositorio)
  - [Instalación de Dependencias](#instalación-de-dependencias)
  - [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
  - [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Endpoints](#endpoints)

## Introducción

Esta aplicación tiene como fin realizar ciertas acciones en la parte del servidor dependiendo de las llamadas que se hagan. Su principal objetivo es proporcionar los endpoints para gestionar a los usuarios, administradores y reservas de este salón. En un inicio esta aplicación se usará para el Frontend de la aplicación, sin embargo, en caso de ser necesario dividir esta aplicación, se puede realizar con el fin de obtener los datos en otro tipo de aplicaciones.

## Tecnología y Prerrequisitos

La aplicación necesita pasar por ciertos requisitos para poder ejecutarse. En un primer lugar, se deben tener las siguientes aplicaciones:
* **[Node.js](https://nodejs.org/es)**: Entorno de ejecución de JavaScript de código abierto y multiplataforma, utilizado con el fin de que los desarrolladores puedan usar este lenguaje para construir aplicaciones del lado del servidor.
* **[MongoDB](https://www.mongodb.com/)**: Base de datos No SQL de código abierto, orientada a documentos almacenando los datos en formato BSON (formato binario de JSON) en lugar de tablas y filas. Es necesaria ya que para que la aplicación funcione, esta debe tener una base de datos para almacenar los mismos. La elegida fue MongoDB Atlas.
* **[npm](https://www.npmjs.com/)**: Es el gestor de paquetes por defecto para Node.js. Su función principal es ayudar a los desarrolladores de JavaScript a instalar, publicar y gestionar "paquetes"que son librerías de código creadas por otros, evitando escribir código desde cero. Otras alternativas a npm pueden ser yarn o pnpm.

Los módulos que son necesarios para la aplicación son los siguientes:

* **express**: Un módulo que tiene como función simplificar la creación de aplicaciones de servidor web. 
* **mongoose**: Librería que sirve para modelar y organizar los datos en una base de datos MongoDB, permitiendo definir esquemas, validar la estructura de los documentos, realizar consultas complejas y simplificar la interacción con la base de datos de manera eficiente y estrucutrada.
* **dotenv**: Librería que tiene como función poder acceder a las variables de entorno. 
* **bcryptjs**: Librería que tiene como función encriptar los datos para que estos no se guarden de manera directa a la base de datos, sino que tengan que ser desencriptadas.
* **jsonwebtoken**: Librería que permite la autenticación y autorización de manera segura, permitiendo que el servidor verifique la identidad de un usuario sin necesidad de almacenar sesiones.
* **nodemon** (desarrollo): LIbrería que no es necesaria utilizarla en producción. Esta permite ejecutar el comando *npm run dev*, lo que permite iniciar la aplicación de manera local permitiendo registrar los cambios en tiempo real sin necesidad de volver a ejecutar el mismo comando.

## Instalación y Configuración Local

### Clonar el Repositorio

En esta sección se especifica cómo ejecutar la aplicación en un entorno local. En primer lugar, para clonar el repositorio, ejecute el comando en su consola:

```bash
# En caso de que se use https:
git clone https://github.com/CraZzy1312/SSM.git

# En caso de que se use SSH:
git@github.com:CraZzy1312/SSM.git

# En caso de que se use el GitHub Cli:
gh repo clone CraZzy1312/SSM
```

### Instalación de Dependencias

Para ejecutar la aplicación primero se necesitan ejecutar el siguiente comando:

```bash
npm install
```

Esto permite a la aplicación instalar los módulos que en un inicio no estarían en el repositorio. 

### Configuración de Variables de Entorno

De igual manera, es recomendable para fines de desarrollo utilizar variables de entorno con el archivo `.env` en la raíz de la aplicación. Las variables son las siguientes:
* **MONGODB_URI**: Este es necesario para conectarse a la aplicación.
* **JWT_SECRET**: Este es necesario para autenticar de manera segura a los usuarios.
* **PORT** (opcional): Este por defecto es 9000, pero puede cambiarse a otro puerto en el que se quiera iniciar la aplicación.

### Ejecución de la Aplicación

Para ejecutar la aplicación se debe utilizar el siguiente comando:

```bash
npm run dev
```

## Endpoints
