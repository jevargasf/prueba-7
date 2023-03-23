# prueba-7
 
PIB Países del Mundo

Aplicación web que almacena los datos del PIB per cápita de países del mundo. La página permite su visualización, agregar nuevos registros y eliminar registros existentes. 

Base de datos:

    - Los registros son almacenados en una base de datos PostgreSQL. Las consultas son administradas desde el servidor con el ORM Sequelize.
    - La estructura de la base de datos no elimina ningún registro al momento de realizar una solicitud DELETE. Para manejar los datos que el usuario no quiere ver en la plataforma se creó una tabla que identifica los datos que deben servirse en el front end donde "accion=1" indica que el dato debe enviarse al cliente y "accion=0" que el dato se marca como "eliminado".

Servidor web:

Servidor web implementado con el paquete Express de Node.js.
El servidor premite realizar 3 solicitudes HTTP:
    - Listar todos los países con el continente al que pertenecen, población año 2020, PIB per cápita año 2019 y 2020. Se implementó una paginación con Sequelize que envía 5 datos por página.
    - Agregar un nuevo registro ingresando el nombre del país, continente, población, PIB 2019 y 2020. El servidor identifica si el registro existe en la base de datos o no. Si existe, se inicializa una transacción para almacenar los datos en las 3 tablas de la base. Si el país ya existe en la base de datos, se actualiza el campo "accion=1" para volver a servir el dato en el front end y evitar datos duplicados.
    - Borrar un país ingresando su nombre. El servidor identifica si el registro existe en la base de datos o no. Si existe, se actualiza el campo "accion=0" para dejar de servir el registro en el front end. Si el país no existe, se envía un mensaje al cliente avisando que el país ingresado no se encontró en la base de datos.

Front end:
Plataforma web escrita con HTML, Javascript y Bootstrap.
    - Despliega 3 botones, cada uno asociado a una de las solicitudes HTTP anteriormente descritas. Los datos y los formularios son desplegados de forma dinámica.
    - Se utilizó Axios como Cliente HTTP para realizar las solicitudes al servidor.