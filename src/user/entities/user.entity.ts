import { IsNotEmpty } from 'class-validator';
import { Gender } from 'src/common/common';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { hash } from 'bcrypt';
// import { HobbiesEntity } from './hobbies.entity';

@Entity()
export class UserEntity extends AbstractEntity<UserEntity>{

  @Column({ type: 'varchar', length: 30 })
  firstName:string

  @Column({ type: 'varchar', length: 30 })
  lastName:string

  @Column({unique:true})
  email:string

  @Column({ type: 'varchar', length: 70 })
  password: string;

  @Column({ type: 'date' })
  dateOfBirth:Date

  @Column({type:"enum" ,enum : Gender})
  gender:Gender

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password,10)
  }

  // @OneToMany(() => HobbiesEntity,(hobbies) => hobbies.user,{cascade:true})
  // hobbies:HobbiesEntity[]
}

