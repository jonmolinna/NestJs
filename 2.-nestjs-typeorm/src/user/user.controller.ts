import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dtos';
import { UserService } from './user.service';
import { Auth, User } from 'src/common/decorators';
// import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';
// @ApiTags('Users routes') => Documentacion
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();
    return { data };
  }

  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });
    return { message: 'User registered', data };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);
    return { data };
  }

  // @UseGuards(ACGuard)
  // @UseRoles({
  //   possession: 'any',
  //   action: 'create',
  //   resource: AppResource.USER,
  // })
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);
    return { message: 'User created', data };
  }

  // @Auth()
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // Esto es un admin
      data = await this.userService.editOne(id, dto);
    } else {
      // Esto es un author
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
    }

    return { message: 'User edited', data };
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // esto es un admin
      data = await this.userService.deleteOne(id);
    } else {
      // esto es un author
      data = await this.userService.deleteOne(id, user);
    }
    return { message: 'User deleted', data };
  }
}
