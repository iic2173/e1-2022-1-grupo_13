# IIC2173 - E1 - Servicios de interés conjunto

## Objetivo

La entrega está intencionada para que creen un diseño sólido de una aplicación de pareo de personas en base a intereses comunes. Deberán construir una aplicación en base a lo que hicieron en la E0 y añadirle ciertas funciones específicas.

## Enunciado

LegitBusiness, la empresa que los contrató para crear el prototipo, les pide que avancen hacia un MVP de su solución.

Para extender la funcionalidad, esta vez se les pide que extiendan la comparacion entre mapas a varios usuarios. Esta vez, en una peticion ustedes mostrarán los mapas de hasta 5 usuarios más. Con esto, podrán empezar a comparar con grupos de personas. Como spoiler, posteriormente se les pedirá un servicio para ver los usuarios cercanos, pero por ahora, con los 5 usuarios será suficiente, puesto que su foco estará en reforzar sus capacidades de despliegue y mantenimiento.

Se les pide fortalecer sus capacidades de desarrollo y delivery, así como prepararse para futuras interacciones con servicios. 


## Especificaciones

Se les pide que realicen una plataforma que cumpla con las especificaciones de la E0, con los RF listados como extensión de lo que ya estaba. La plataforma debe contar con un nombre a discreción de ustedes.

**Para esta entrega existe un requisito de Documentación, que al no cumplirse no se les corregirá su entrega.**

De no cumplir requisitos marcados como ***esenciales***, su nota puede ser como máximo un 4.0.

### Requisitos funcionales (2 ptos)

* **RF1 *(0.8 pto) (Esencial)*:** Deben poder mostrar comparaciones hasta con 5 usuarios distintos con sus posiciones. Deben ofrecer 5 campos en una página donde puedan ingresar *ids* de usuarios o *nickames* (según un selector básico), y despues de hacer click en algun botón, deben aparecer tantos mapas como IDs entregados.
* **RF2 *(0.3 ptos)*:** Deben dejar disponible una lista de usuarios paginada, donde se puedan ver los usuarios y sus nicks.
* **RF3 *(0.3 ptos)*:** Deben escoger una API externa que proporcione información sobre algún tema que consideren relevante para el contexto de su aplicación y mostrar de una forma amigable estos datos. Por ejemplo puede ser el clima en un día para una posición específica, el tráfico típico, etc. 
* **RF4 *(0.6 ptos)*:** Deben poder solicitarle a cada usuario mínimo 3 fotos de perfil (similar a la aplicación de tinder) y dar la opción de verlas dentro de la aplicación.


### Requisitos no funcionales (3 ptos)

* **RNF1 *(0.6 ptos) (Esencial)*:** Deben usar un formato de Backend-Frontend separado: una API con respuestas JSON, usando REST o GraphQL y un frontend. Esto es muy importante puesto que es crítico para las siguientes entregas. Usen un combo como Koa-React, Express-Flutter, FastAPI-Vue o cualquier otra combinación que les acomode.
* **RNF2 *(0.3 ptos) (Esencial)*:** Su aplicación/aplicaciones backend deben estar en un container docker, cada una.
* **RNF3 *(0.3 ptos) (Esencial)*:** Deben usar una API Gateway para recibir y rutear los requests. No es necesario que describan todos los endpoints en el Gateway, pero si que pasen por ahí. Tampoco es necesario ahora que la API registre el uso de Tokens, pero a futuro si.
* **RNF4 *(0.3 ptos)*:** Deben tener configuradas *Budget alerts*, para no alejarse del Free tier de AWS.
* **RNF5 *(0.8 ptos)*:** Deben implementar un pipeline de CI/CD. Como proveedores aceptados están CircleCI, Github Actions y e implementaciones locales de Jenkins. Recomendamos los dos primeros porque los ayudantes tienen experiencia en estos dos. Por otro lado, para la implementación de CD les recomendamos usar AWS CodeDeploy.
* **RNF6 *(0.2 ptos)*:** La conexión con la API externa referenciada en el RF3 debe ser realizada desde el backend. De no hacerse así, el RF3 tiene 0 puntos.
* **RNF7 *(0.5 ptos)*:** Todos los assets de su aplicación Web, tales como imágenes, iconos, videos y archivos dinámicos (incluyendo los del RF4) deben estar en un bucket en AWS S3 standard.

### Documentación (1 ptos)

* **RDOC1 *(0.4 ptos)*:** Deben crear un diagrama UML de componentes de la entrega, con **explicaciones y detalle** sobre el sistema. Esto deben tenerlo para la fecha final de entrega y lo deben dejar dentro de su repositorio de Github en una carpeta `/docs`.
* **RDOC2 *(0.4 ptos)*:** Deben documentar los pasos necesarios para replicar el pipe CI/CD que usaron en su aplicación.
* **RDOC3 *(0.2 ptos)*:** Deben documentar alguna forma de correr su aplicación en un ambiente local para propósitos de testeo.

## Recomendaciones

* Comiencen la entrega lo antes posible, puesto que es mas sencillo ir trabajando de a partes y seguro tendrán dudas.
* Planifiquen con antelación: pregunten dudas o ambigüedades a sus ayudantes.
* Ojo con los deploys a última hora, la maldición de la demo es muy real.
* Ocupen el Free Tier de AWS, que tiene capacidad para todas estos requerimientos. Deberían usar los siguientes servicios:
	* **EC2**: AWS les proporciona una instancia t2.micro gratuita al mes.
	* **S3**: Tienen 5 GB de almacenamiento y 20000 solicitudes GET.
	* **RDS** (Opcional, Recomendado): Tienen 20GB y una instancia básica al mes.
	* **API Gateway**: 1 MM de llamadas al mes
	* **Lambda (Opcional)**: Tienen 400K GB/s y 1 MM de solicitudes.
	* **EBS**: 30 GB al mes para almacenamiento de discos de sistema.
	* **Cloudfront**: 50 GB al mes de transferencia.
	* **Amazon SES**: 62000 mensajes salientes / mes.
* Usen una cuenta nueva o de alguien que no tenga otras cargas en AWS, para evitar cargos por ahora, además de usar una tearjeta prepago y los budget alerts de AWS.
* **USEN LEAFLET** para los mapas, o la API de google maps que tiene un free tier bastante generoso.

Eventualmente, lograremos un convenio con AWS para obtener créditos y labs más avanzados, pero para requerimientos de esta entrega el free tier bastará. De preferencia, hagan funcionar la app localmente y luego la van subiendo a AWS.

### Consideraciones

No se considerarán entregas:
* Con componentes que corran en sus computadores o servidores que no sean los básicos de Azure/AWS/GCP/Cloudfront. Algunos ejemplos, los servicios de AWS serían:
    * EC2
    * VPC
    * IAM
    * S3
    * Lambda
* Montadas en Heroku/Firebase/Elastic beanstalk/Lightsail/Netlify o similares.
* Que no estén documentadas.

# Puntaje

### Atraso

Para esta entrega se les descontará 1 punto en la nota máxima por horas fibonacci. 

Es decir, con una hora de atraso su nota máxima es 6, con dos horas su nota máxima pasa a ser 5, con 4 horas de atraso su nota llega a ser máximo un 4, luego con 7, con 12, y así en adelante.

### Grupal

La nota se calcula como:

**E<sub>1 grupal</sub> = 1 + E<sub>1 RF</sub> + E<sub>1 RNF</sub> + E<sub>1 RDOC</sub>**

Siendo **E<sub>1 RF</sub>** el puntaje ponderado de los requisitos funcionales, y **E<sub>1 RNF</sub>** el correspondiente a los requisitos no funcionales y **E<sub>1 RDOC</sub>** de la documentación.

### Individual

Segun el programa del curso, esto se evalua como:

**E<sub>1</sub> = 1 + ((E<sub>1 grupal</sub> - 1) * F<sub>g</sub>)**			

Donde F<sub>g</sub> es un factor de coevaluación asignado por el grupo que va de 0 a 1.2. Para esto se enviará un form de coevaluación donde cada integrante deberá evaluar a sus compañeros de grupo con una puntuación entre 1 y 5. 

**No podrán asignarle 5 puntos a más de un compañero, y sí lo hacen, se considerará que se entregó un máximo de 4 puntos a cada compañero**.

De no realizar la coevaluación, asumiremos que se le entregó el mismo puntaje de coevaluación a cada integrante, es decir 4 puntos.

## Apoyo

Cada grupo tendrá un ayudante asignado. Este ayudante está encargado de hacerles seguimiento y orientar sus dudas para responderlas ellos mismos y el equipo de ayudantes. Dado que cada ayudante puede tener pequeñas diferencias en sus correcciones, queda a criterio de este hacer relajos o hacer mas estrictos ciertas particularidades. Intenten tener un flujo de comunicación directo con sus ayudantes para aclarar posibles diferencias o desiciones de diseño.

Pueden usar el Slack del curso para dudas más rápidas. Usen el canal #e1 para sus dudas.

Las ayudantías programadas relevantes para esto por ahora son:

* Docker repaso / API Gateway / S3 / VPC
* Flutter básico 
* CI/CD

Se les avisará con antelación cuándo son y si habrá más.
