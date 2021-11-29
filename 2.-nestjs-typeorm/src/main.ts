import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
// import { setDefaultUser } from './config/default-user';
import generateTypeormConfigFile from './scripts/generate-typeorm-config-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(); // da estilo a la consola

  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  // Creacion de un usuario automatico
  // setDefaultUser(config);

  // Creacion del archivo ormconfig.json
  generateTypeormConfigFile(config);

  // Comando para validar el formulario
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);

  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
