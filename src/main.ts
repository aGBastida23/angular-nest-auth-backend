import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  /* Hace que el backend se vuelva muy estricto, dice que la informacion
  debe de mandarla como se espera, sino no se acepta y la rechaza */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
    /* Este es el puerto que asigna el servicio 
    - process.env.PORT: Este es el puerto del servicio que ofrece la nube
    - 3000: puerto local*/
  await app.listen( process.env.PORT || 3000);
}
bootstrap();
