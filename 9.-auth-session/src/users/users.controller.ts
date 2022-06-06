import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserNotFoundException } from './exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { SerializedUser } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor) // permite excluir algunos datos ejm password
  @Get('/username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter) // convierte el exception de json a string
  @Get('/id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else {
      throw new UserNotFoundException();
    }
  }

  @Post('/create')
  @UsePipes(ValidationPipe) // validacion
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
