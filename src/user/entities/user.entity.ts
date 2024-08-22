import { IsNotEmpty } from 'class-validator';
import { Gender } from 'src/common/common';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
// import { HobbiesEntity } from './hobbies.entity';

@Entity()
export class UserEntity extends AbstractEntity<UserEntity>{

  @IsNotEmpty()
  @Column()
  firstName:string

  @Column()
  lastName:string

  @Column({unique:true,nullable:false})
  email:string

  @Column({})
  password:string

  @Column()
  birthDate:string

  @Column()
  token:string

  // @OneToMany(() => HobbiesEntity,(hobbies) => hobbies.user,{cascade:true})
  // hobbies:HobbiesEntity[]

  @Column({type:"enum" ,enum : Gender})
  gender:Gender

}

