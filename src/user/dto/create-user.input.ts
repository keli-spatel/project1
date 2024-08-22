import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Gender } from 'src/common/common';

@InputType()
export class CreateUserInput {
  
  @Field()
  firstName:string

  @Field()
  lastName:string

  @Field()
  email:string

  @Field()
  password:string

  @Field()
  birthDate:string

  @IsNotEmpty()
  @Field(()=>Gender)
  gender:Gender
}
