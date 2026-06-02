# ==========================
# BUILD
# ==========================
FROM node:24 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN npm install -g pnpm@11.1.3

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# ==========================
# NGINX
# ==========================
FROM nginx:1.29

COPY --from=builder /app/dist/gui-web-placa/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]