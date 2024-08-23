import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/common/token.payload';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cofigService: ConfigService,
  ) { }

  async getToken(tokenPayload: TokenPayload) {
    return this.jwtService.signAsync(
      {
        tokenPayload,
      },
      {
        secret: this.cofigService.get<string>('JWT_SECRET'),
        expiresIn: '1800s',
      },
    );
  }

  async signUp(createUserInput: CreateUserInput){
   try { this.userService.createUser(createUserInput);

    const token =await this.getToken({
      userid:createUserInput.id,
      email:createUserInput.email,
      firstName:createUserInput.firstName
    })
    return token;
  } catch (e) {
    throw new ForbiddenException("Email Is already Exist")
  }
  }

}