import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

/* Las variables o paramteros que va a tener un usuario */

/* Esta anotacion es para que mongo pueda grabar objetos que lucen asi en la bd y
nos ayudes a obtener los nombre por id o que el correo se toUnicode, etc */
@Schema()
export class User {
    //Mongo lo crea de manera automatica
    _id?:string;
    
    @Prop({unique:true, required:true})
    email:string;
    
    @Prop({required: true})
    name:string;
    
    @Prop({minlength:6,required:true})
    password?:string;
    
    @Prop({default:true})
    isActive:boolean;
    
    /* Tenemos que decirle a mongo que el tipo de como se va a almacenar
    tiene que ser del tipo arreglo de String, es mayuscula para decirle que
    es el tipo String de la bd y por default tendra el rol de user */
    @Prop({type: [String], default:['user']})//['user','admin']
    roles:string[];
}

//Proporciona el schema para que la bd pueda recibirlo
export const UserSchema = SchemaFactory.createForClass(User);