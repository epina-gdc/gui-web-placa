FROM node:24 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN npm install -g pnpm@11.1.3

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build