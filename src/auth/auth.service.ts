import { BadRequestException, Injectable, InternalServerErrorException,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto,RegisterUserDto,LoginDto } from './dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(User.name) 
    private userModel:Model<User>,
    private jwtService:JwtService
    ){}
  
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    
    try {
      //Se desestructura en dos variables, una para pass y la otro para lo demas
      const {password, ...userData} = createUserDto;
      
      const newUser = new this.userModel({
        //1.Encriptar la contraseña
        password: bcryptjs.hashSync(password,10),
        ...userData
      });

      //2.Guardar el usuario
      //Si no se pone el await puede que el error se ejecuta fuera del servicio
      await newUser.save();

      /* desestructuramos el usuario para poder eliminar la contraseña y
      que se guarde en bd pero no se retorne en el objeto 
      --Se debe de poner la password como ? en la entity
      */
      const {password:_, ...user} = newUser.toJSON();
      
      return user;
      
    } 
    //3.Manejar los errroes o excepciones
    catch (error) {
      if(error.code==11000){
        throw new BadRequestException(
          `${createUserDto.email} ya existe y no puede estar duplicado!`)
      }
      throw new InternalServerErrorException('Algo terrible sucedio :`( ');
    }

  }

  async register(registerDto: RegisterUserDto):Promise<LoginResponse>{
    const user = await this.create({
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password
    });

    return {
      user: user,
      token: this.getJwtToken({id:user._id})
    }
  }


  /* Debe retornar el usuario completo y el JWT */
  async login(loginDto:LoginDto): Promise<LoginResponse>{
    const {email, password} = loginDto;
    /* Compara que el email del userModel sea igual al email que se recibe
    en el servicio */
    const user = await this.userModel.findOne({email: email});

    if(!user){
       throw new UnauthorizedException(`Credenciales no validas - email`);
      }
      /* Compara que el password de la bd sea igual al que viene en el body */
      if(!bcryptjs.compareSync(password, user.password)){
       throw new UnauthorizedException(`Credenciales no validas - password`);
    }

    /* Desestructuramos el usuario para poder enviar el token y quitar la contraseña */
    const {password:_, ...rest} = user.toJSON();
    return {
      user: rest,
      token : this.getJwtToken({id:user.id})
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id:string){
    const user = await this.userModel.findById(id);
    /* El toJson() es para asegurar que no mande funciones que
    vienen dentro del metodo */
    const {password:_, ...rest} = user.toJSON();

    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload:JwtPayload){
    const token = this.jwtService.sign(payload);

    return token;
  }
}
