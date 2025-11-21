import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

describe('JwtStrategy', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
          load: [],
        }),
      ],
      providers: [JwtStrategy],
    }).compile();

    const strategy = module.get(JwtStrategy);
    expect(strategy).toBeDefined();
  });
});
