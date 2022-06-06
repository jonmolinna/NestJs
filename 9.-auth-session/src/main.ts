import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'DALLASE_NESTJS_SESSION_ID',
      secret: 'ASINDSNDKNEJANE_TANASE',
      resave: false,
      saveUninitialized: false, // cuando inicie sesion guarda el cookie
      cookie: {
        maxAge: 60000, // 6 minutes
      },
    }),
  );

  // passport
  app.use(passport.initialize());
  app.use(passport.session());

  // app.setGlobalPrefix('api');

  await app.listen(9000);
}
bootstrap();
