FROM node:24 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm config set only-built-dependencies false

RUN pnpm install --frozen-lockfile --ignore-scripts=false
COPY . .

RUN pnpm run build --configuration production

FROM nginx:1.29

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]