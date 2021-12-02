import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LibroSchema } from './libros/schemas/libro.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/task_crud_nest'),
    MongooseModule.forFeature([{ name: 'Libro', schema: LibroSchema }]),
  ],
  controllers: [AppController, LibrosController],
  providers: [AppService, LibrosService],
})
export class AppModule {}
