import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User{

@Field(() => ID)
id?:number

@Field(() => String)
firstName?:string

@Field(() => String)
lastName?:string

@Field(() => String)
email?:string

@Field(() => String)
birthDate?:string

@Field(() => String)
token:string

// @Field(() =>[HobbiesEntity])
// hobbies:string

@Field(() => String)
gender?:string
}