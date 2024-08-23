import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "src/user/dto/create-user.input";

@Resolver()
export class AuthResolver{
  constructor(private readonly authService:AuthService){}

  @Mutation(() => String)
  async signUp(@Args('createUserInput')createUserInput:CreateUserInput){
    return this.authService.signUp(createUserInput)
  }
}
