import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Hacemos que las validaciones sean en global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo acepte campos de la tabla y no otros campos
      transform: true, // Interceptores
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
