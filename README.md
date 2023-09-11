## BACKEND en NEST

Esta es el backend que se creara para el proyecto final que sera creada
en nest

## PARA PODER LEVANTAR LA BD Y QUE SE VEA EN MONGODB
```bash
$ docker compose up -d
```

## PARA COLOCAR LA DIRECCION QUE TENDRAS EN MONGODB Y SE PUEDA CONECTAR A LA BD
Copiar el ```.env.template``` y renombrarlo a ```.env```
Y asignar a la variable el valor de la url, algo como:
```mongodb://localhost:27017``` 


## PARA CONECTARNOS EN MONGODB COMPASS
Solo agregamos el puerto que especificamos en el archivo docker-compose.yml
Algo como: 
  ```mongodb://localhost:27017```

## PARA CORRER LA APP Y PODAMOS EJECUTAR LOS GET,POST,PUT,DELETE

```bash
$ npm run start:dev
```

## Para importar las variables de entorno y asi poder agregar esl modulo de ConfigModule.forRoot() en el app.module.ts se debe hacer un:
```bash
$ npm i @nestjs/config 
```
Al terminar de ejecutar el comando para las variables de entorno es necesario bajar el proceso de nest y subirlo nuevamente para que reconozca las variables de entorno