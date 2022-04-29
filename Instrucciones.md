# 2022-1 / IIC2173 - E0 | De cómo volvemos a hacer grupos de amigos con contactos estrechos

## Objetivo

La entrega tiene por objetivo ser una introducción al trabajo con servicios en la nube.
Para ésto, deberán configurar un servidor básico en la nube y “hacer deploy” de una pequeña aplicación (pasar a producción).

## Enunciado 

Después de años (literalmente años) de encierro prolongado para buena parte de la población, la creación de nuevas amistades y relaciones se ha dificultado muchísimo. Muchas personas han perdido habilidades de interacción y muchos grupos de intereses comunes se disolvieron dejando a las personas solas o solamente con las relaciones más fuertes, perdiendo sus relaciones más periféricas. 

En vista de este gran problema, la empresa LegitBusiness de la que son parte vió una gran oportunidad. Les dieron control de una empresa spinoff cuya primera tarea es crear una plataforma que en base a los lugares donde estuvo un usuario y sus intereses, se le pueda ofrecer una lista de otros usuarios que estuvieron cerca para que puedan conocerse y formar grupos de interés. Como referencia considere la aplicación Happn, que es para coordinar citas entre personas que se gustan.

Para iniciar, va a crear una prueba de concepto (A.K.A MVP) de la plataforma que pueda registrar donde estuvo un usuario, y poder consultar por los lugares donde estuvo otra persona registrada en la plataforma para que el el primer usuario pueda comparar y ver puntos geográficos donde coinciden. Con esto, podrá enviarle un "ping" (solicitud), para que la otra persona reciba sus datos para poder conversar. Para esta prueba, se asumirá que su plataforma abarca un solo tópico de interés.

## Ejemplo

A Jane le interesa la difusión de la religión del crossfit. Se inscribe en la plataforma que está dedicada a esto, y registra que estuvo en la cafeteria de su universidad, en la sala de estudio y en el gimnasio. Revisa la lista de usuarios que han registrado sus posiciones y ve si coinciden algunas (puede ser un mapa único con las posiciones solapadas o un mapa por usuario). En caso de que le interese un usuario en particular, puede enviarle un "ping", para que esa persona sepa que es de interés para ella.

## Especificaciones

Para esta tarea personal, “Entrega 0”, la idea es que todos aprendan la base de una aplicación montada en la web, por lo que deberán crear y configurar un servicio web que implemente un pequeño servicio de rastreo de usuarios. Los usuarios deben poder crear una cuenta y registrarse con las mismas credenciales.

El servicio de rastreo pueden desarrollarlo con el framework que deseen de esta lista

* Go
* Rust
* Haskell
* Ruby
    * Rails (recomendado)
* Python
    * FastAPI (recomendado)
    * Django (recomendado)
    * Flask
* C/C++
* ASP.NET
* Javascript
    * Koa (recomendado)
    * Express
    * Hapi
    * Restify
    * Meteor
* Java
    * Springboot
* Kotlin
* Prolog
* Brainfuck
* Malbolge

Los frameworks recomendados fueron marcados por su facilidad de uso, características accesibles, son robustos y posiblemente los vieron en otros cursos. Además, sus ayudantes podrán resolver dudas en esos frameworks/lenguajes

Prohibido
* PHP y sus variantes

Cada servidor tendrá que tener un dominio asignado. Los dominios TK, ML o GA son gratuitos, y pueden conseguirlos fácilmente en Freenom o en el github student pack. Finalmente, en el servidor deberán configurar un servicio proxy inverso con NGINX que esté escuchando en el puerto 443, asegurado con SSL.

Para esto, podrán usar Let's Encrypt, un servicio gratuito de implementación de HTTPS

Finalmente, solo pueden usar los siguientes proveedores en la nube, y sus servicios IaaS

* AWS (recomendado)
* GCP
* Azure
* Digital ocean

Los ayudantes podrán responder sus dudas en AWS. Además, las ayudantías se referirán a AWS. Las siguientes herramientas / plataformas están prohibidas y no se corregirá nada que ocupe sus servicios:

* Heroku
* AWS
    * LightSail
    * Elastic Beanstalk
    * Cognito (para esta entrega)
* Netlify
* Firebase (excepto para notificaciones móviles)

Y cualquier BaaS que implemente funcionalidad fuera de su código. 


### Recomendaciones

* Lo más importante no es que la aplicación esté funcionando al 100%, sino que el servidor exista y se pueda acceder a la aplicación correctamente. 
* Les sugerimos fuertemente invertir el mínimo de tiempo en la interfaz visual. Al menos para esta entrega basta con que se pueda llevar a cabo las funcionalidades solicitadas. 

## Puntaje

Esta entrega consiste en dos partes, la parte mínima (que todos deben lograr) que vale 50% de la nota final y una parte variable que también vale 50%. Sobre la parte variable, tendrán 3 opciones para trabajar, de las que deberán escoger 2. Cada una de las que escojan para evaluar vale 25% de la nota final, y realizar una tercera parte puede dar hasta 5 décimas.

Los requisitos marcados como ***Esencial*** son obligatorios para que su tarea sea revisada. De no cumplir con estos, su tarea no será revisada.

### Requisitos funcionales (15p)

* **RF1: (5p)** ***Esencial*** Se puede crear cuentas de usuario con mail, datos de contacto, nick y contraseñas. Se puede iniciar sesión con las cuentas creadas.
* **RF2: (3p)** ***Esencial*** Un usuario debe poder registrar sus ubicaciones mediante coordenadas geográficas en la aplicación. Debe poder asignarles un nombre y verlas en una lista. 
* **RF3: (5p)** El usuario debe ser capaz de ver todas sus ubicaciones y las de otro usuario en un mapa desde su aplicación. Para esto pueden usar la API de OpenStreetMap.
* **RF4: (2p)** El usuario debe poder hacer ping a otro usuario y revisar los pings recibidos

### Requisitos no funcionales (15p)

* **RNF1: (3p)** Debe haber un proxy inverso (como Nginx o Traefik) configurado.
* **RNF2: (2p)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc)
* **RNF3: (2p)** ***Esencial*** El servidor debe estar corriendo en EC2.
* **RNF4: (4p)** ***Esencial*** Debe haber una base de datos Postgres o Mongo externa asociada a la aplicación para guardar mensajes y consultarlos. Debe estar hosteada en otro servidor o container. Las posiciones geográficas deben ser guardadas usando PostGIS o geoJSON respectivamente.
* **RNF5: (4p)** ***Esencial*** El servicio debe estar dentro de un container Docker.

### Variables

#### Docker-Compose (25%) (15p)

Componer servicios es esencial para obtener entornos de prueba confiables, especialmente en las máquinas de los desarrolladores. Arriésguense con este fascinante desafío.

* **RNF1: (5p)** Lanzar su app desde docker-compose
* **RNF2: (5p)** Integrar db desde docker-compose
* **RNF3: (5p)** Configurar su proxy inverso desde docker-compose

#### HTTPS (25%) (15p)

La seguridad es esencial para sus usuarios. Perfectamente podrían falsear el contenido del buscacursos y ustedes no se darían cuenta. Deben lograr que sus usuarios se sientan seguros en su aplicación.

* **RNF1: (7p)** El dominio debe estar asegurado por SSL con Let’s Encrypt.
* **RNF2: (3p)** Debe poder redireccionar HTTP a HTTPS.
* **RNF3: (5p)** Se debe ejecutar el chequeo de expiración del certificado SSL de forma automática 2 veces al día (solo se actualiza realmente si está llegando a la fecha de expiración).

#### Confirmación del correo (25%) (15p)

Al momento de crear una sesión por primera vez, deben confirmar que el usuario usó una cuenta de correo válida para evitar repeticiones. 

* **RF1: (9p)** Implementar un envío de correo electrónico hacia la cuenta especificada.
* **RF2: (6p)** Confirmación de la cuenta mediante el acceso al link que le indiquen u otro método que consideren. 
* **RF3: (3p - bonus)** Seguimiento del correo para saber si este fue enviado, leído o finalmente aceptado. 

## Entrega

Se les proporcionará un repositorio de Github Classroom donde pueden subir su código e ir registrando sus commits. 

Deben subir el código de su solución junto al archivo de configuración de Nginx (o Traefik u otro) en el repositorio que se les asignará vía github classroom.
También deben entregar el archivo .pem asociado al servidor EC2 para tener los
respectivos accesos y poder realizar una buena corrección.
Además, para poder facilitar la corrección deben generar un README.md que señale:

* Consideraciones generales
* Nombre del dominio
* Método de acceso al servidor con archivo .pem y ssh (no publicar estas credenciales en el repositorio).
* Puntos logrados o no logrados y comentarios si son necesarios para cada aspecto a evaluar en la Parte mínima y en la Parte variable.
* De realizar un tercer requisito variable también explicitar en el readme.

Pueden sobrescribir este README sin problemas o cambiarle el nombre

**Debe ser entregada a más tardar a las 23:59 del viernes 8 de abril.** Las
condiciones de entrega están explicadas más abajo.

Además, y como algo muy importante: **ESTÁ ABSOLUTAMENTE PROHIBIDO SUBIR SU ARCHIVO .PEM A SU REPOSITORIO DE GITHUB.** Si hacen esto se les calificará con nota 1. Para esto se les habilitará un buzón de canvas para que nos lo compartan.

Esta entrega es estrictamente individual y será revisada para casos de copia.

## Enlaces relevantes

* https://education.github.com/pack
* https://www.tutorialspoint.com/docker/docker_compose.htm
* https://phoenixnap.com/kb/ssh-to-connect-to-remote-server-linux-or-windows
* https://www.digitalocean.com/community/tags/deployment?type=tutorials
* https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart
* https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
* https://www.freenom.com/es/index.html?lang=es
* https://www.youtube.com/watch?v=XvyjIG2F-cs
* https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
* https://docs.aws.amazon.com/ses/latest/dg/Welcome.html
* Documentación de OpenStreetMap: https://wiki.openstreetmap.org/wiki/API_v0.6



## Apoyo

Pueden usar el Slack del curso para dudas más rápidas.
Las ayudantías programadas relevantes para esto por ahora son:

* Ayudantía 1: Cloud básico - Viernes 18 de marzo
* Ayudantía 2: Docker - Viernes 25 de marzo