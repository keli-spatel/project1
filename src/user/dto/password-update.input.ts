import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdatePasswordInput {
    @Field()
    userId:number

    @Field()
    currentPassword:string

    @Field()
    newPassword:string
}