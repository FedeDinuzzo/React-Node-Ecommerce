# Establecer la imagen base
FROM node:19.4.0

# Variables de entorno (no recomendado)
ENV DB_URI = mongodbatlas

# Crear y establecer el directorio de mi contenedor
WORKDIR /proyecto-backend-frontend

# Agrego argumentos para el .env, por defecto de desarrollo
ARG ENV_FILE = .env.dev

# Copio todos los archivos de src al directorio de trabajo
COPY src ./src
COPY package*.json .
# Copiar el env
# COPY .env ./ 
COPY $ENV_FILE ./

# instalar dependencias
RUN npm install

# Puerto de app
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/index.js"]
# cd src
# docker build -t index.js .
# docker run -p 8080:8080 index.js