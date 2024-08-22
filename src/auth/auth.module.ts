import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { jwtStrategy } from './strategy/jwtToken.strategy.ts';
import { jwtTokenGuard } from './guard/JwtToken.guard';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({}),
    ConfigModule
  ],
  providers: [JwtService,AuthResolver, AuthService,jwtStrategy,jwtTokenGuard,UserService],
  exports:[AuthService]
})
export class AuthModule {}
