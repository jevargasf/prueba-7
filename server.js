import express from 'express'
import cors from 'cors'
import database from './config/db.js'
import * as dotenv from 'dotenv'
import router from './routes/routes.js'
import Paises from './models/Paises.js'
import PaisesPib from './models/Paises_pib.js'
import PaisesDataWeb from './models/Paises_data_web.js'
import defineAssociations from './models/associations.js'
dotenv.config()

//declara el puerto, lo busca como variable de entorno o asigna el puerto p ej, 'process.env.PORT || 3000'
const PORT = process.env.PORT || 8000
const app = express()

// Definir relaciones entre modelos
defineAssociations(Paises, PaisesPib, PaisesDataWeb)

// Conexión a la BD y sincronización de modelos con BD

try {
    await database.authenticate()
    console.log('Conexión establecida correctamente a la BBDD '+process.env.BD_NAME)
    await database.sync({ alter: true })
    console.log('Modelos sincronizados con éxito con la base de datos.')
} catch (err) {
    console.log('Error al establecer la conexión', err)
}


// middlewares

// uso de cors
app.use(cors())

// habilitar requests en formato content-type  - application/json (entender los datos de los formularios)
app.use(express.json());
app.use(express.urlencoded());


// rutas
app.use(router)

// escuchar puerto
app.listen(PORT, function() {
    console.log(`Servidor escucuando en el puerto ${PORT}`)
})