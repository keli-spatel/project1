import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/dto/user.output';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        // private readonly userService:UserService,
        private readonly jwtService: JwtService,
        private readonly cofigService: ConfigService,
    ) { }

    async generateTokens(userId: number, email: string): Promise<string> {
        const payload = { id: userId, email: email };
    
        const refreshToken = this.jwtService.sign(payload, {
          expiresIn: '7d',
          secret: this.cofigService.getOrThrow<string>('RT_SECRET'),
        });
    
        console.log(refreshToken, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return refreshToken;
      }
}