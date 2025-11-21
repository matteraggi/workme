// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <--- CONSIGLIO: Aggiungi questo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <--- FONDAMENTALE: Se manca questo, gli altri moduli non possono usarlo
})
export class PrismaModule { }