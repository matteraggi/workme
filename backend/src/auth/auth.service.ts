import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async register(data: RegisterDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) throw new Error('User already exists');

        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
            },
        });

        return { message: 'User created', userId: user.id };
    }

    async login(data: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(data.password, user.passwordHash);
        if (!valid) throw new Error('Invalid credentials');

        const token = this.jwt.sign({ sub: user.id, email: user.email });

        return { token };
    }

}
