import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /* Para inportar el las variables de entorno, se debe hacer un
    npm i @nestjs/config y asi podemos agregar este modulo  */
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      /* Por defecto se ocupa el test en railway */
      dbName:   process.env.DATABASE_NAME
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
