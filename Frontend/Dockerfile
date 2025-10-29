# --- ETAPA 1: Construcción (Build Stage) ---
# Usamos una imagen de Node.js para compilar el proyecto
FROM node:20-alpine AS build-stage

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente del frontend
COPY . .

# Ejecuta el comando de construcción de Vite para generar los archivos estáticos (la carpeta 'dist')
# Comando: "build": "vite build"
RUN npm run build

# ----------------------------------------------------

# --- ETAPA 2: Producción (Production Stage) ---
# Usamos Nginx para servir los archivos estáticos de la manera más eficiente
FROM nginx:stable-alpine AS production-stage

# Elimina la configuración por defecto de Nginx
# Esto es opcional, pero ayuda a asegurar que Nginx solo sirva nuestros archivos
RUN rm -rf /etc/nginx/conf.d

# Copia la configuración de Nginx (para manejar routing de React-Router-DOM)
# 🚨 DEBES CREAR UN ARCHIVO nginx.conf en la raíz de tu frontend (ver sección abajo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos generados desde la etapa de construcción a la ubicación de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx corre por defecto en el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]