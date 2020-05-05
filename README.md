# DelilahResto
Proyecto 3 de Acámica del curso de Desarrollo Web Full Stack.

El trabajo consiste en generar el backend de una web de pedidos de comidas.

## Instalación e inicialización del proyecto
**0.**  Contar con Node.js, Postman y MySql

**1.**  Descargar repositorio desde el siguiente [`link`](https://github.com/carolinapapes/DelilahRestoAcamica.git)

**2.**  Instalar dependencias con `npm install`

**3.**  En el archivo configuration.json cambiar ruta, el password y el puerto al correspondiente a la conexión de `mySql` local

**4.** Inicializar la base de datos desde el directorio principal del proyecto con `npm run start`

**5.**  Iniciar el servidor con `npm run dev`


## Documentacion y testeo
**1.**  Descargar Coleccion de [`POSTMAN`](https://www.getpostman.com/collections/7a0f3b357e901b42d377)

**2.**  Documentación API `delilahResto.yaml` compatible con [`Swagger`](https://editor.swagger.io/)

## Sobre la base de datos
**1.**  Al inicializar la base de datos de la manera indica se generaran automáticamente: 10 filas de usuarios, pedidos y productos

**2.**  Todos los usuarios precargados tienen como password su nombre de usuario. Los password son guardados con hash en la base de datos

**3.**  Un usuario con permisos de administrador cuyas credenciales son: `username: admin` / `password: admin`

**4.**  Se agrega un endpoint para generar nuevos usuarios con roles de administrador que requiere como autenticacion un token de un usuario con permisos de administrador. 

**5.**  El resto de los datos de los inserts en de las tablas se pueden ver en Postman (donde hay generados ejemplos de las respuestas a cada endpoint), en Swagger o en `./start/start.js`


