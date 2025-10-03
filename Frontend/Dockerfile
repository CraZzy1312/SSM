# Usamos Node LTS como base
FROM node:20-alpine

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código del frontend
COPY . .

# Exponemos el puerto en el que Vite corre
EXPOSE 5173

# Comando para correr en modo desarrollo con hot reload
CMD ["npm", "run", "dev", "--", "--host"]
