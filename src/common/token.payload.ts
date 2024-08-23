import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field(() => String)
  token: string;
}

export interface TokenPayload {
  userid: number;
  firstName: string;
  email: string;
}
