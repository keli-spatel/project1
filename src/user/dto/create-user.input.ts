import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length, Matches, MinLength } from 'class-validator';
import { Gender } from 'src/common/common';

@InputType()
export class CreateUserInput {
  
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String)
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  firstName: string;

  @Field(() => String)
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  lastName: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is reuired' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @Field(() => String)
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please enter valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => Gender)
  // @IsEnum(StudentGenderEnum, { message: 'Enter valid gender' })
  // @IsNotEmpty({ message: 'Gender is required' })
  gender: Gender;

  @Field(() => Date)
  @IsDate({ message: 'Enter valid date' })
  @IsNotEmpty({ message: 'Joining date is required' })
  dateOfBirth: Date;

}