# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM image-registry.openshift-image-registry.svc:5000/openshift/nodejs-18:latest AS builder

# Set the working directory
WORKDIR /app

USER root

# Add the source code to app
COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install --force

COPY . .

# Generate the build of the application
RUN npm run build -- --configuration production --output-path=/dist

#RUN chmod -R 755 /opt/app-root/src
#RUN chown -R nginx:nginx /opt/app-root/src

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM image-registry.openshift-image-registry.svc:5000/openshift/nginx:1.29

# TEST
USER root

# Ajustamos permisos de directorios que nginx necesita
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 5047
CMD ["nginx", "-g", "daemon off;"]
