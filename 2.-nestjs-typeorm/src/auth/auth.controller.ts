import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Peticion correcta',
      user,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}

/*
@Post('login')
  login(@Req() req: any) {
    return req.user;
  }
*/
