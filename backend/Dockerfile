# ---- Build Stage ----
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Copy all files
COPY . .

RUN npm run build

# ---- Runtime Stage ----
FROM node:20
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --only=production
RUN npx prisma generate

# Copy compiled output
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/main.js"]
