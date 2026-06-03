FROM node:24 AS build

WORKDIR /app

COPY package*.json ./

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN npm install -g pnpm@11.1.3

RUN pnpm install --frozen-lockfile
COPY . .

# Ajusta el nombre exactamente del proyecto según angular.json
RUN pnpm run build
# o si tu proyecto requiere especificar la app:
# RUN npm run build gui-web-firma-electronica --configuration production


FROM nginx:1.25

# Ajusta la ruta según la salida real
COPY --from=build /app/dist/gui-web-placa/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5047
CMD ["nginx", "-g", "daemon off;"]