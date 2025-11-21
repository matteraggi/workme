import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  // Percorso delle migrazioni
  migrations: {
    path: "prisma/migrations",
  },

  // Connessione usata da prisma migrate
  datasource: {
    url: env("DATABASE_URL"),
  },

});
