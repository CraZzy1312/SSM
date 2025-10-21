# Usamos una imagen Node LTS optimizada
FROM node:24-slim

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
# Considera usar 'npm install --production' si tienes muchas devDependencies
RUN npm install

# Copiamos todo el código de la aplicación
COPY . .

# Expone el puerto que usa tu API
EXPOSE 3000

# Comando para iniciar la aplicación en modo de producción
# Reemplaza 'npm start' con el comando de inicio que sea estable para producción
CMD [ "npm", "start" ]
