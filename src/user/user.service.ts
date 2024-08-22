import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './dto/user.output';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {

    const user = await this.userRepository.findBy({
      email: createUserInput.email
    })

    if (!user) {
      throw new ForbiddenException("User email Is already Exist")
    }
    const newUser = this.userRepository.create(createUserInput);
  const token = this.AuthService.generateTokens(newUser.id,newUser.email)
    console.log(token,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
    // Creates an instance of UserEntity
    return await this.userRepository.save(newUser); // Saves the new user in the database
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { id } })

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

    //existing user entity sathe the new data Merge
    const updatedUser = Object.assign(user, updateUserInput);

    // updated user ne databse ma save mate
    return await this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


