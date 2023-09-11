import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    /* Se debe de llamar para qe las variables de entorno esten listas
    cuando se cargue el jwtModule */
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SEED,
      /* Expira cada 6 horas */
      signOptions: {expiresIn: '6h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
