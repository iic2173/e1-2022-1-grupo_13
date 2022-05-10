# Pasos para replicar el CI

Para propositos de la integración continua, se ocupó una configuración de un template de CircleCI, la cual presenta las siguientes etapas.

En la sección de jobs se configura el ambiente y se instalan las dependencias para poder ejecutar el proyecto a nivel de backend.

Primero, se llama a un docker que contiene las imágenes necesarias para simular los contenedores de nuestro proyecto. En este caso, hay una imagen con una versión similar de node, de la que está en el proyecto (en el config.yml de CI usamos node 12 y en el proyecto node 12.22.11). También hay una imagen de postgres con unas variables de entorno propias de las credenciales para acceder a la base de datos; y finalmente, una imágen de nginx.

 Luego de tener configurado el ambiente, se ejecutan los pasos para saber si se aprueba el CI o no, donde primero se hace un checkout, y luego se instalan las dependencias necesarias para probar el backend.

Finalmente, en la sección de workflow se indica que es lo que se debe probar, en este caso, el job de build-and-test que contiene los pasos antes mencionados.


# Pasos para correr la aplicación de forma local


1. Es necesario tener docker corriendo
2. Luego, hay que hacer git clone del back-end y git clone del front-end, ambos en repositorios distintos.
3. Hacer docker-compose build y docker-compose up en ambos
4. Probar localhost:80/api para las requests hacia el backend y localhost:8080 para probar las funcionalidades implementadas en el frontend
