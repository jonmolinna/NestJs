import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('MyBlog API')
    .setDescription(
      'Esta es una API creada con NestJS con un CRUD básico para un Blog.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
