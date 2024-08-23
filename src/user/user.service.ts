import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './dto/user.output';
import { AuthService } from 'src/auth/auth.service';
import { UpdatePasswordInput } from './dto/password-update.input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {


  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.findBy({
      email: createUserInput.email
    })

    if (user) {
      throw new ForbiddenException("User email Is already Exist")
    }
    const newUser = await this.userRepository.create({
      ...createUserInput,
    });

    return await this.userRepository.save(newUser); 
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


  async  findOne(id: number): Promise<UserEntity> {
    const user =await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async update(id: number, updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserInput);    //existing user entity sathe the new data Merge
  
    return await this.userRepository.save(updatedUser);   // updated user ne databse ma save mate
  }


  async UpdatePassword(data:UpdatePasswordInput){

    const user = await this.findOne(data.userId)

    if(!user) {
      throw new NotFoundException("User Not Exist")

    const isValidPassword = await bcrypt.compare(data.currentPassword , user.password)

    if(!isValidPassword){
      throw new ForbiddenException("Password is Invalid")

    const newHashedPassword = await bcrypt.hash(data.newPassword , 10)
      user.password = newHashedPassword

      await this.userRepository.save(user)

      return true;
    }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


