FROM oven/bun:1.1-alpine AS base
WORKDIR /app

COPY package.json ./
COPY src/ ./src/
COPY index.html style.css search.js README.md ./
COPY assets/ ./assets/
COPY paginas/ ./paginas/

EXPOSE 8086

ENV PORT=8086
ENV NODE_ENV=production

CMD ["bun", "src/server.ts"]
