import { Controller, Post, UseGuards, Get, Session, Req } from '@nestjs/common';
import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/LocalGuard';

@Controller('auth')
export class AuthController {
  // @UseGuards(AuthGuard('local')) // une con LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login() {}

  @Get('/')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  // @UseGuards(LocalAuthGuard) // protegiendo la ruta
  @UseGuards(AuthenticatedGuard) // protege las rutas
  @Get('/status')
  async getAuthStatus(@Req() req: Request) {
    return req.user; // viene de session => Session Serialize
  }
}
