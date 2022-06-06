import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';

export class SessionSeriaizer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('Desarialize user');
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
