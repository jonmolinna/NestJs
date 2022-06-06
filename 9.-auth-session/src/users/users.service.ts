import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
// import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [];

  getUsers() {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
