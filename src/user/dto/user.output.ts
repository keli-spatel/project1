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

@Field(() => Date)
dateOfBirth?:Date

// @Field(() =>[HobbiesEntity])
// hobbies:string

@Field(() => String)
gender?:string
}