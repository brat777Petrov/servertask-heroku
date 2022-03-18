import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async registration(user: User): Promise<void> {

    if (await this.findOne(user.email)) {
      throw new HttpException('This email is already present in the database', 401);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hash;
    await this.usersRepository.insert(user); 
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email: email });
    return user;
  }

  async update(data: User): Promise<void> {
    const user = await this.findOne(data.email);
    if (!user) {
      throw new HttpException('User not found.', 404);
    }
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.birthDate = data.birthDate;
    user.avatar = data.avatar;
    await this.usersRepository.update(user.user_id,data);
  }

} 
