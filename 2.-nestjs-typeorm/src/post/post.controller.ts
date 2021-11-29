import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';
import { Auth } from 'src/common/decorators';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { User as UserEntity } from 'src/user/entities';
import { AppResource } from 'src/app.roles';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.postService.getMany();
    return {
      message: 'Peticion correcta',
      data,
    };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.getOne(id);
    return { data };
  }

  @Auth() // Ruta privada
  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return this.postService.createOne(dto);
  }

  @Auth() // Ruta privada
  @Put('/:id')
  editOne(@Param('id') id: number, @Body() dto: EditPostDto) {
    return this.postService.editOne(id, dto);
  }

  @Auth() // Ruta privada
  @Delete('/:id')
  deleteOne(@Param('id') id: number) {
    return this.postService.deleteOne(id);
  }
}
