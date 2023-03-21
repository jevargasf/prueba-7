import { DataTypes } from 'sequelize'
import database from '../config/db.js'


const Paises = database.define('paises', {
    // estructura de la tabla
    nombre: {
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false
    },
    continente: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    poblacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

export default Paises