# ---- Build Stage ----
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy all files, including prisma.config.ts e prisma/
COPY . .

RUN npm run build

# ---- Runtime Stage ----
FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Copy Prisma schema, migrations, AND prisma.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

CMD ["node", "dist/src/main.js"]
